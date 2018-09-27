import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import { Icon } from 'antd'

import styles from './Wiki.css'

class Wiki extends React.Component {
  state = {
    raw: '',
    fetching: true
  }

  componentDidMount () {
    fetch('https://raw.githubusercontent.com/wiki/CovenantSQL/CovenantSQL/Testnet-Quickstart.md', {mode: 'cors'})
      .then(data => data.text())
      .then(data => {
        const parser = new DOMParser()
        const dataEl = parser.parseFromString(data, 'text/html')
        const raw = dataEl.querySelector('body').innerHTML
        this.setState({ raw, fetching: false })
      })
      .catch(e => {
        console.error(e)
        this.setState({ raw: 'Empty', fetching: false })
      })
  }

  render () {
    return (
      <div className={styles.markdown}>
        <Link to='/'>
          Back to Faucet
        </Link>
        {this.state.fetching && <div className={styles.loading}><Icon type="loading" /></div>}
        {
          this.state.raw &&
          <ReactMarkdown source={this.state.raw} />
        }
      </div>
    )
  }
}

export default Wiki
