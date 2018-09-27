import * as React from 'react'
import ReactMarkdown from 'react-markdown'

import styles from './Wiki.css'

class Wiki extends React.Component {
  state = {
    raw: ''
  }

  componentDidMount () {
    fetch('https://raw.githubusercontent.com/wiki/CovenantSQL/CovenantSQL/Testnet-Quickstart.md', {mode: 'cors'})
      .then(data => data.text())
      .then(data => {
        const parser = new DOMParser()
        const dataEl = parser.parseFromString(data, 'text/html')
        const raw = dataEl.querySelector('body').innerHTML
        this.setState({ raw })
      })
  }

  render () {
    return (
      <div className={styles.markdown}>
        <a href='/'>Back to Faucet</a>
        {
          this.state.raw &&
          <ReactMarkdown source={this.state.raw} />
        }
      </div>
    )
  }
}

export default Wiki
