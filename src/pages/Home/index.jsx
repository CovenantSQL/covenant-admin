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
  componentDidMount () {
  }

  onCopyClick = () => {
    const { addr } = this.state
    if (!isValidCovenantAddress(addr)) {
      message.error('Please make sure your CovenantSQL Address is valid')
    } else {
      copy(this.constructCopyText())
      message.success('Successfully copied to your clipboard')
    }
  }
  constructCopyText = () => {
    const { addr } = this.state
    const text = `CovenantSQL TestNet address: ${addr} is request Particle #PTC, see more details of CovenantSQL on https://covenantsql.io`
    return text
  }
  checkAddresssValid = () => {
    const { addr } = this.state
    if (!isValidCovenantAddress(addr)) {
      message.error('CovenantSQL Address not Valid')
    }
  }
  checkURLValid = () => {
    const { url } = this.state
    if (!isValidURL(url)) {
      message.error('URL pattern not Valid')
    }
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
      message.error('Please make sure your CovenantSQL Address and SNS URL are valid')
    }
  }
  faucetGetPolling = () => {
    const { addr } = this.state
    const { postRes } = this.props
    const id = _get(postRes, ['data', 'id'], 'BACKEND_NO_ID')

    this.polling = setInterval(() => {
      this.props.getFaucet({ id, address: addr }).then(this.updateProgress)
    }, 1000)
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
              message: 'Request Sent',
              description: 'We are checking your SNS content...'
            })
          }
          return { state, percent: 33 }
        })
        break
      case 1:
        this.setState(prevState => {
          if (prevState.state !== state) {
            notification.info({
              message: 'SNS Content Verified',
              description: 'Your SNS content is verified and we are sending PTC to your address.'
            })
          }
          return { state, percent: 66 }
        })
        break
      case 2:
        this.setState({ percent: 100, applied: false })
        notification.success({
          message: 'PTC is Sent Successfully',
          description: 'Congrats, PTC is sent to your address, check it out now!',
          duration: 0
        })
        clearInterval(this.polling)
        break
      case 3:
        this.setState({ percent: 66, status: 'exception', applied: false })
        notification.error({
          message: 'Error',
          description: _get(getRes, ['data', 'reason']),
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
                {t('title')}
              </header>
            </div>
            <div className={styles.toggler}>
              <LocaleToggler />
            </div>
          </Page.Row>

          <Page.Row className={styles.mainProcess}>
            <div className={styles.addr}>
              <label>
                {t('address')}:
              </label>
              <TextInput
                value={addr}
                onInput={this.onAddrInput}
                onBlur={this.checkAddresssValid}
                placeholder="Input your ConvenantSQL address"
              />
            </div>
            <div className={styles.share}>
              <Timeline>
                <Timeline.Item>
                  Step 1. Copy below text
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
                  Step 2. Share to your preferred social media: <a target='_blank' rel='noopener noreferrer' href='https://twitter.com'>Twitter</a>, <a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com'>Facebook</a>, <a target='_blank' rel='noopener noreferrer' href='http://weibo.com'>Weibo</a>
                  <div className={styles.placeholder} />
                </Timeline.Item>
                <Timeline.Item
                  dot={<Icon type="check-circle" theme="outlined" style={{ fontSize: '16px' }} />}
                >
                  Step 3. Input the media URL contains above content
                  <TextInput
                    value={this.state.url}
                    onInput={this.onURLInput}
                    onBlur={this.checkURLValid}
                    className={styles.urlInput}
                    placeholder="Input your social media URL"
                  />
                </Timeline.Item>
              </Timeline>
              <div className={styles.apply}>
                {
                  this.state.applied &&
                    <Progress percent={this.state.percent} status={this.state.status} />
                }
                <Button
                  onClick={this.onApplyClick}
                  className={styles.applyBtn}
                  disabled={this.state.applied}
                >
                  🚀Apply PTC
                </Button>
              </div>
            </div>
          </Page.Row>
          <Divider />
          <Page.Row className={styles.qaSection}>
            <p>Q&A:</p>
            <div className={styles.qa}>
              <p className={styles.q}>1. What is Particle?</p>
              <p className={styles.a}>Particle is a token used in our system that pegging to USD.</p>
            </div>
            <div className={styles.qa}>
              <p className={styles.q}>2. Why should I provide social media URL?</p>
              <p className={styles.a}>It aims to prevent attackers from exhausting Particle.</p>
            </div>
            <div className={styles.qa}>
              <p className={styles.q}>3. Which social media can I use?</p>
              <ul className={styles.a}>
                <li>
                  <p className={styles.sns}><Icon type="twitter" theme="outlined" /> Twitter</p>
                  <p>1. Publish a public tweet with above content</p>
                  <p>2. Copy the tweet URL <span className={styles.highlight}>https://twitter.com/uesr_name/status/status_id</span> into above box and click Apply button.</p>
                </li>
                <li>
                  <p className={styles.sns}><Icon type="facebook" theme="outlined" /> Facebook</p>
                  <p>1. Publish a public facebook post with above content</p>
                  <p>2. Copy the public post URL <span className={styles.highlight}>https://www.facebook.com/user_name/posts/post_id</span> into above box and click Apply button.</p>
                </li>
                <li>
                  <p className={styles.sns}><Icon type="weibo" theme="outlined" /> Weibo</p>
                  <p>1. Publish a public weibo with above content</p>
                  <p>2. Copy the public post URL <span className={styles.highlight}>https://weibo.com/user_id/post_id</span> into above box and click Apply button.</p>
                </li>
              </ul>
            </div>
            <div className={styles.qa}>
              <p className={styles.q}>4. How frequent does Particle fund?</p>
              <p className={styles.a}>10 PTC/Day.</p>
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
