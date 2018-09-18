import * as React from 'react'
// import classnames from 'classnames/bind'

import { connect } from 'react-redux'
import { Timeline, Divider, Icon, notification } from 'antd'

import * as UserAction from '~/actions/User'

import t from '~/utils/locales'
import Page from '~/components/Page'
import TextInput from '~/components/TextInput'
import LocaleToggler from '~/components/LocaleToggler'
import Button from '~/components/Button'
import Footer from '~/components/Footer'

import Logo from '~/assets/icons/faucet.svg'

import styles from './Home.css'
import '~/styles/global/global.css'

// const cx = classnames.bind(styles)
class Home extends React.Component {
  state = {
    addr: '',
    url: '',
    addrErr: false
  }
  componentDidMount () {
    // this.props.getUser('foreseaz')
  }

  onCopyClick = () => {
    const { addr, addrErr } = this.state
    if (!addr || addrErr) {
      notification.error({
        message: 'CovenantSQL Address Not Valid',
        description: 'Please make sure your CovenantSQL Address is valid.'
      })
    } else {

    }
  }
  constructCopyText = () => {
    const { addr } = this.state
    const text = `CovenantSQL TestNet address: ${addr} is request Particle #PTC, see more details of CovenantSQL on https://covenantsql.io`
    return text
  }
  onAddrInput = addr => { this.setState({ addr }) }
  onURLInput = url => { this.setState({ url }) }

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
                placeholder="4..."
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
                  Step 2. Share to your preferred social media
                  <div className={styles.placeholder} />
                </Timeline.Item>
                <Timeline.Item
                  dot={<Icon type="check-circle" theme="outlined" style={{ fontSize: '16px' }} />}
                >
                  Step 3. Input the media URL contains above content
                  <TextInput
                    value={this.state.url}
                    onInput={this.onURLInput}
                    className={styles.urlInput}
                    placeholder="Input your social media URL"
                  />
                </Timeline.Item>
              </Timeline>
              <div className={styles.apply}>
                <Button className={styles.applyBtn}>
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
                  <p>1. Twitter above auto-generating content</p>
                  <p>2. Copy the tweet URL <span className={styles.highlight}>https://twitter.com/uesr_name/status/status_id</span> into above box and click Apply button.</p>
                </li>
                <li>
                  <p className={styles.sns}><Icon type="facebook" theme="outlined" /> Facebook</p>
                  <p>1. Push a public facebook post with above content</p>
                  <p>2. Copy the public post URL <span className={styles.highlight}>https://www.facebook.com/user_name/posts/post_id</span> into above box and click Apply button.</p>
                </li>
                <li>
                  <p className={styles.sns}><Icon type="weibo" theme="outlined" /> Weibo</p>
                  <p>1. Push a public weibo with above content</p>
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
  user: state.user
})
const mapDispatchToProps = {
  ...UserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
