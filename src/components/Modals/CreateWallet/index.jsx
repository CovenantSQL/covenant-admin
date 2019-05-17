import React from 'react'
import { connect } from 'react-redux'
import { createWallet } from '~/store/admin'

import { Input, Tag, Button, Modal } from 'antd'

import styles from './CreateWallet.css'

class CreateWalletModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      password: '',
      loading: false,
      show: props.show,
      account: '',
      key: ''
    }
  }
  inputPassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  createWallet = async () => {
    const { password } = this.state
    this.setState({ loading: true })
    if (password) {
      try {
        const { account, key } = await this.props.createWallet({ password })
        this.setState({
          account,
          key,
          loading: false
        })
      } catch (e) {
        this.setState({ loading: false })
      }
    }
  }
  render () {
    return (
      <Modal
        title='生成 CovenantSQL 钱包'
        okText='私钥已存妥'
        okType='danger'
        cancelText='取消'
        visible={this.state.show}
        onOk={this.hideModal}
        onCancel={this.hideModal}
      >
        <p className={styles.label}>
          私钥加密密码:
        </p>
        <div className={styles.action}>
          <Input.Password
            placeholder="input password"
            value={this.state.password}
            onInput={this.inputPassword}
          />
          <Button
            className={styles.createBtn}
            loading={this.state.loading}
            onClick={this.createWallet}
            type="primary"
          >
            创建
          </Button>
        </div>
        {
          this.state.account &&
          <div className={styles.walletNkey}>
            <div>Account: <Tag color="green">{this.state.account}</Tag></div>
            <div>Private Key: <Tag color="volcano">{this.state.key}</Tag></div>
          </div>
        }
      </Modal>
    )
  }
}
CreateWalletModal.defaultProps = {
  show: false
}
const mapStateToProps = () => {}
const mapDispatchToProps = {
  createWallet
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateWalletModal)
