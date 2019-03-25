import React from 'react'

import { Tooltip } from 'antd'
import styles from './HashTip.css'

export default class HashTip extends React.Component {
  static defaultProps = {
    cutLength: 20
  }

  render () {
    const { cutLength, hash } = this.props

    return (
      <Tooltip title={hash}>
        <span className={styles.hash}>{hash.slice(0, cutLength)}</span>
      </Tooltip>
    )
  }
}
