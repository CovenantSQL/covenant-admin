import * as React from 'react'
import _get from 'lodash/get'
// import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import {
  Timeline,
  Tabs,
  Icon,
  Progress,
  message,
  notification,
} from 'antd'

import { applyToken, getAccountBalance, createDB } from '~/store/covenant'

import t from '~/utils/locales'
import TextInput from '~/components/TextInput'
import Button from '~/components/Button'
import Footer from '~/components/Footer'
import Nav from '~/components/Nav'
import Card from '~/components/Card'

import QnA from './QnA'
import DB from './DB'

import styles from './Home.css'
import '~/styles/global/global.css'

const TabPane = Tabs.TabPane

class Home extends React.Component {
  state = {
    addr: this.props.account.address,
    email: this.props.account.email,
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
        <Nav />
        <div className={styles.container}>
          <Card>
            <Tabs defaultActiveKey="2">
              <TabPane tab={<span><Icon type="dollar" /> 申请 PTC </span>} key="1">
                <div className={styles.mainProcess}>
                  <Timeline>
                    <Timeline.Item>
                      <label>
                        CovenantSQL 钱包地址:
                      </label>
                      <div className={styles.inputWrapper}>
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
                      <label>
                        Email 地址:
                      </label>
                      <div className={styles.inputWrapper}>
                        <TextInput
                          value={this.state.email}
                          type={'email'}
                          onInput={this.onEmailInput}
                          placeholder={t('emailPh')}
                          className={styles.input}
                        />
                      </div>
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
              </TabPane>

              <TabPane tab={<span><Icon type="database" />数据库管理</span>} key="2">
                <DB />
              </TabPane>

              <TabPane tab={<span><Icon type="question-circle" />常见问题</span>} key="3">
                <QnA />
              </TabPane>

            </Tabs>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  account: state.cql.account,
})
const mapDispatchToProps = {
  applyToken,
  getAccountBalance,
  createDB,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
