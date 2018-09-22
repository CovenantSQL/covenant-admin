import * as React from 'react'
import copy from 'copy-to-clipboard'
import _get from 'lodash/get'

import { connect } from 'react-redux'
import {
  Timeline,
  Divider,
  Icon,
  Progress,
  message,
  notification,
} from 'antd'

import { postFaucet, getFaucet } from '~/actions/Faucet'

import t from '~/utils/locales'
import Page from '~/components/Page'
import TextInput from '~/components/TextInput'
import LocaleToggler from '~/components/LocaleToggler'
import Button from '~/components/Button'
import Footer from '~/components/Footer'

import { isValidCovenantAddress, isValidURL } from '~/utils'

import Logo from '~/assets/icons/faucet.svg'

import styles from './Home.css'
import '~/styles/global/global.css'

// const cx = classnames.bind(styles)
class Home extends React.Component {
  state = {
    addr: '',
    url: '',
    applied: false,
    state: null,
    percent: 0,
    status: 'active'
  }

  onCopyClick = () => {
    const { addr } = this.state
    if (!isValidCovenantAddress(addr)) {
      message.error(t('msg_address_err'))
    } else {
      copy(this.constructCopyText())
      message.success(t('msg_copy_success'))
    }
  }
  constructCopyText = () => {
    const { addr } = this.state
    const text = t('share_text', addr)
    return text
  }
  checkAddresssValid = () => {
    const { addr } = this.state
    isValidCovenantAddress(addr)
      ? message.success(t('msg_address_valid'))
      : message.error(t('msg_address_not_valid'))
  }
  checkURLValid = () => {
    const { url } = this.state
    isValidURL(url)
      ? message.success(t('msg_url_valid'))
      : message.error(t('msg_url_not_valid'))
  }
  onAddrErrClose = () => this.setState({ addrErr: false })
  onAddrInput = addr => { this.setState({ addr }) }
  onURLInput = url => { this.setState({ url }) }

  onApplyClick = () => {
    const { addr, url } = this.state
    if (isValidCovenantAddress(addr) && isValidURL(url)) {
      this.props.postFaucet({
        address: addr,
        media_url: url
      }).then(this.faucetGetPolling)
      this.setState({ applied: true })
    } else {
      message.error(t('msg_both_valid'))
    }
  }
  faucetGetPolling = () => {
    const { addr } = this.state
    const { postRes } = this.props
    const id = _get(postRes, ['data', 'id'], 'BACKEND_NO_ID')

    console.log('getFaucet: ', id)
    if (id !== 'BACKEND_NO_ID') {
      this.polling = setInterval(() => {
        this.props.getFaucet({ id, address: addr }).then(this.updateProgress)
      }, 1000)
    } else {
      this.setState({ applied: false })
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
          description: t('progress2_d'),
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
  componentWillUnmount () {
    clearInterval(this.polling)
  }

  render () {
    const { addr } = this.state
    return (
      <div>
        <Page className={styles.container}>
          <Page.Row>
            <div>
              <header className={styles.title}>
                <Logo className={styles.logo} />
                <span>{t('title')}</span>
              </header>
            </div>
            <div className={styles.toggler}>
              <LocaleToggler />
            </div>
          </Page.Row>

          <Page.Row className={styles.mainProcess}>
            <div className={styles.addr}>
              <label>
                {t('address')}: (<a href='https://github.com/CovenantSQL/CovenantSQL/tree/develop/cmd/idminer' >{t('generate_addr')}</a>)
              </label>
              <TextInput
                value={addr}
                onInput={this.onAddrInput}
                onBlur={this.checkAddresssValid}
                placeholder={t('addressPh')}
              />
            </div>
            <div className={styles.share}>
              <Timeline>
                <Timeline.Item>
                  {t('step1')}
                  <div>
                    <button
                      onClick={this.onCopyClick}
                      className={styles.promo}
                    >
                      {this.constructCopyText()}
                    </button>
                  </div>
                </Timeline.Item>
                <Timeline.Item
                  dot={<Icon type="share-alt" style={{ fontSize: '16px' }} />}
                >
                  {t('step2')} <a target='_blank' rel='noopener noreferrer' href='https://twitter.com'>Twitter</a>, <a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com'>Facebook</a>, <a target='_blank' rel='noopener noreferrer' href='http://weibo.com'>Weibo</a>
                  <div className={styles.placeholder} />
                </Timeline.Item>
                <Timeline.Item
                  dot={<Icon type="check-circle" theme="outlined" style={{ fontSize: '16px' }} />}
                >
                  {t('step3')}
                  <TextInput
                    value={this.state.url}
                    onInput={this.onURLInput}
                    onBlur={this.checkURLValid}
                    className={styles.urlInput}
                    placeholder={t('urlPh')}
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
          </Page.Row>
          <Divider />
          <Page.Row className={styles.qaSection}>
            <p>Q&A:</p>
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
          </Page.Row>
        </Page>
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
  postFaucet,
  getFaucet
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
