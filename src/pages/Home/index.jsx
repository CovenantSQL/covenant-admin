import * as React from 'react'
import classnames from 'classnames/bind'
import _get from 'lodash/get'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import {
  Timeline,
  Divider,
  Icon,
  Progress,
  message,
  notification,
} from 'antd'

import { applyToken, getAccountBalance } from '~/actions/Faucet'

import t from '~/utils/locales'
// import Page from '~/components/Page'
import TextInput from '~/components/TextInput'
import Button from '~/components/Button'
import Footer from '~/components/Footer'
import Menu from '~/components/Menu'

import QuickStartIcon from '~/assets/icons/quickstart.svg'
import BugIcon from '~/assets/icons/bug.svg'
import QuestionIcon from '~/assets/icons/question.svg'
import ArrowDownIcon from '~/assets/icons/arrowDown.svg'

import styles from './Home.css'
import '~/styles/global/global.css'

const cx = classnames.bind(styles)
class Home extends React.Component {
  state = {
    addr: '',
    email: '',
    applied: false,
    state: null,
    percent: 0,
    status: 'active',
    qaCollapsed: true
  }

  onAddrErrClose = () => this.setState({ addrErr: false })
  onAddrInput = addr => { this.setState({ addr }) }
  onEmailInput = email => { this.setState({ email }) }
  passedcheck = () => !!this.state.email && !!this.state.addr

  onApplyClick = () => {
    const { addr, email } = this.state
    if (this.passedcheck()) {
      this.props.applyToken({
        account: addr,
        email
      }).then(() => this.props.getAccountBalance({ account: addr }))
      this.setState({ applied: true })
    } else {
      message.error(t('msg_both_valid'))
    }
  }

  updateProgress = () => {
    const { getRes } = this.props
    const state = _get(getRes, ['data', 'state'], 0)

    switch (state) {
      default:
      case 0:
        this.setState(prevState => {
          if (prevState.state !== state) {
            notification.info({
              message: t('progress0_t'),
              description: t('progress0_d')
            })
          }
          return { state, percent: 33, status: 'active' }
        })
        break
      case 1:
        this.setState(prevState => {
          if (prevState.state !== state) {
            notification.info({
              message: t('progress1_t'),
              description: t('progress1_d'),
              duration: 0
            })
          }
          return { state, percent: 66, status: 'active' }
        })
        break
      case 2:
        this.setState({ percent: 100, applied: false })
        notification.success({
          message: t('progress2_t'),
          description: this.constructGotPTCDesc(),
          duration: 0
        })
        clearInterval(this.polling)
        break
      case 3:
        this.setState({ percent: 66, status: 'exception', applied: false })
        notification.error({
          message: t('progress3_t'),
          description: t(_get(getRes, ['data', 'reason'])),
          duration: 0
        })
        clearInterval(this.polling)
        break
    }
  }
  constructGotPTCDesc = () => (
    <p>
      {t('progress2_d')} <a href='/quickstart'>Quick Start</a>
    </p>
  )
  toggleQA = () => this.setState({ qaCollapsed: !this.state.qaCollapsed })

  componentWillUnmount () {
    clearInterval(this.polling)
  }

  render () {
    const { addr } = this.state
    return (
      <div>
        <Menu />
        <div className={styles.container}>
          <div>
            <div className={styles.control}>
              <Link to='/quickstart'>
                <div className={styles.quickstart}>
                  <QuickStartIcon />
                  <span>CovenantSQL Quick Start (EN)</span>
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.mainProcess}>
            <div className={styles.share}>
              <Timeline>
                <Timeline.Item>
                  {t('step1')}
                  <div className={styles.addr}>
                    <TextInput
                      value={addr}
                      onInput={this.onAddrInput}
                      placeholder={t('addressPh')}
                      className={styles.input}
                    />
                  </div>
                </Timeline.Item>
                <Timeline.Item
                  dot={<Icon type="check-circle" theme="outlined" style={{ fontSize: '16px' }} />}
                >
                  {t('step2')}
                  <TextInput
                    value={this.state.email}
                    type={'email'}
                    onInput={this.onEmailInput}
                    placeholder={t('emailPh')}
                    className={styles.input}
                  />
                </Timeline.Item>
              </Timeline>
              <div className={styles.apply}>
                {
                  this.state.state !== null &&
                    <Progress percent={this.state.percent} status={this.state.status} />
                }
                <Button
                  onClick={this.onApplyClick}
                  className={styles.applyBtn}
                  disabled={this.state.applied}
                >
                  🚀{t('apply')}
                </Button>
              </div>
            </div>
            <a
              onClick={this.toggleQA}
              className={cx('toggler', {show: !this.state.qaCollapsed})}
            >
              <QuestionIcon className={styles.quesitonIcon} />
              Q&A
              <ArrowDownIcon className={styles.toggleIcon} />
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/CovenantSQL/CovenantSQL/issues'
              className={styles.issue}
            >
              <BugIcon />
              <span>{t('submit_issue')}</span>
            </a>
          </div>
          <div className={cx('qaWrapper', {show: !this.state.qaCollapsed})}>
            <Divider />
            <div className={styles.qaSection}>
              <div className={styles.qa}>
                <p className={styles.q}>{t('q1')}</p>
                <p className={styles.a}>{t('a1')}</p>
              </div>
              <div className={styles.qa}>
                <p className={styles.q}>{t('q2')}</p>
                <p className={styles.a}>{t('a2')}</p>
              </div>
              <div className={styles.qa}>
                <p className={styles.q}>{t('q3')}</p>
                <ul className={styles.a}>
                  <li>
                    <p className={styles.sns}><Icon type="twitter" theme="outlined" /> Twitter</p>
                    <p>{t('tweeter_1')}</p>
                    <p>{t('tweeter_2')} <span className={styles.highlight}>https://twitter.com/uesr_name/status/status_id</span> {t('click_apply')}</p>
                  </li>
                  <li>
                    <p className={styles.sns}><Icon type="facebook" theme="outlined" /> Facebook</p>
                    <p></p>
                    <p>{t('facebook_1')}</p>
                    <p>{t('facebook_2')} <span className={styles.highlight}>https://www.facebook.com/user_name/posts/post_id</span> {t('click_apply')}</p>
                  </li>
                  <li>
                    <p className={styles.sns}><Icon type="weibo" theme="outlined" /> Weibo</p>
                    <p>{t('weibo_1')}</p>
                    <p>{t('weibo_2')} <span className={styles.highlight}>https://weibo.com/user_id/post_id</span> {t('click_apply')}</p>
                  </li>
                </ul>
              </div>
              <div className={styles.qa}>
                <p className={styles.q}>{t('q4')}</p>
                <p className={styles.a}>{t('a4')}</p>
              </div>
              <div className={styles.qa}>
                <p className={styles.q}>{t('q5')}</p>
                <p className={styles.a}>{t('a5')}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  postRes: state.faucet.postRes,
  getRes: state.faucet.getRes
})
const mapDispatchToProps = {
  applyToken,
  getAccountBalance
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
