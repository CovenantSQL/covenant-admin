import * as React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import LocaleToggler from '~/components/LocaleToggler'
import LogoIcon from '~/assets/icons/logo.svg'

import { getAccountBalance } from '~/actions/Faucet'

import styles from './Menu.css'

class Menu extends React.Component {
  componentDidMount () {
    const { account } = this.props
    if (account.address) {
      this.props.getAccountBalance({ account: account.address })
    }
  }
  render () {
    const { account } = this.props

    return (
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <Link to='/'>
            <div className={styles.headerLeft}>
              <LogoIcon />
            </div>
          </Link>
          <div className={styles.headerRight}>
            {/*
            <div>
              <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
            </div>
            */}
            <div className={styles.profile}>
              <Button shape="circle" theme="twoTone" icon="smile" />
            </div>
            <div className={styles.balance}>
              {account.balance} PTC
            </div>
            <LocaleToggler />
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  account: state.faucet.account
})
const mapDispatchToProps = {
  getAccountBalance
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
