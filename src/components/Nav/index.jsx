import * as React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Modal, Button } from 'antd'
import { Link } from 'react-router-dom'

import LocaleToggler from '~/components/LocaleToggler'
import CreateWalletModal from '~/components/Modals/CreateWallet'
import LogoIcon from '~/assets/icons/logo.svg'

import { getAccountBalance } from '~/store/covenant'

import styles from './Menu.css'

class Nav extends React.Component {
  state = {
    createAccountModalVisible: true
  }
  componentDidMount () {
    const { account } = this.props
    if (account.address) {
      this.props.getAccountBalance({ account: account.address })
    }
  }
  setVisible = (key) => {
    this.setState({ [key]: true })
  }
  hideModal = () => {
    this.setState({ visible: false })
  }
  _renderAccountMenu = () => (
    <Menu>
      <Menu.Item>
        <a onClick={() => this.setVisible('createAccountModalVisible')}>
          Create Wallet
        </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Already Has Wallet?
        </a>
      </Menu.Item>
    </Menu>
  )
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
            <Dropdown overlay={this._renderAccountMenu()} placement="bottomRight">
              <div className={styles.profile}>
                <Button shape="circle" theme="twoTone" icon="smile" />
              </div>
            </Dropdown>
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
          create / upload
        </Modal>
        {
          this.state.createAccountModalVisible && <CreateWalletModal show={true} />
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
