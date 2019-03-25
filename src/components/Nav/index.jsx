import * as React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd'
import { Link } from 'react-router-dom'

import LocaleToggler from '~/components/LocaleToggler'
import LogoIcon from '~/assets/icons/logo.svg'

import { getAccountBalance } from '~/store/covenant'

import styles from './Menu.css'

class Menu extends React.Component {
  state = {
    visible: false
  }
  componentDidMount () {
    const { account } = this.props
    if (account.address) {
      this.props.getAccountBalance({ account: account.address })
    }
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  hideModal = () => {
    this.setState({ visible: false })
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
              <Button onClick={this.showModal} shape="circle" theme="twoTone" icon="smile" />
            </div>
            <div className={styles.balance}>
              {account.balance} PTC
            </div>
            <LocaleToggler />
          </div>
        </div>
        <Modal
          title='生成 CovenantSQL 钱包地址'
          okText='是'
          okType='danger'
          cancelText='否'
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
        >
          <p>{'Web 环境生成钱包地址正在开发中，请先使用 cql 工具在终端中生成公私钥对，具体请参考'}</p>
          <a href='https://developers.covenantsql.io/docs/quickstart' target='_blank' rel='noopener noreferrer'>Quick Start</a>
        </Modal>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  account: state.cql.account
})
const mapDispatchToProps = {
  getAccountBalance
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)
