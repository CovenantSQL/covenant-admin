import * as React from 'react'
import { connect } from 'react-redux'

import { Modal, Table, Button, Progress } from 'antd'
import HashTip from '~/components/HashTip'

import { getAccountBalance, createDB } from '~/store/covenant'

import styles from './DB.css'

const confirm = Modal.confirm
class DB extends React.Component {
  state = {
    status: 'active',
    percent: 8,
  }

  onCreateDB = () => {
    const { address } = this.props.account

    const inter = setInterval(() => {
      this.setState({
        percent: this.state.percent > 90
          ? this.state.percent
          : this.state.percent + Math.random() * 1000 % 5
      })
    }, 1000)

    this.props.createDB({ account: address }).then(() => {
      this.setState({ percent: 100 })
      clearInterval(inter)
    }).catch(e => {
      this.setState({ status: 'exception' })
      clearInterval(inter)
    })
  }

  getColumns = () => {
    const columns = [{
      title: 'DB ID',
      dataIndex: 'db',
      key: 'db',
      render: text => <HashTip hash={text} />
    },
    {
      title: '创建交易哈希',
      dataIndex: 'tx_create',
      key: 'tx_create',
      render: text => <a href={'http://scan.covenantsql.io/#/tx/' + text} target='_blank'><HashTip hash={text} /></a>
    },
    {
      title: '权限更新哈希',
      dataIndex: 'tx_update_permission',
      key: 'tx_update_permission',
      render: text => <a href={'http://scan.covenantsql.io/#/tx/' + text} target='_blank'><HashTip hash={text} /></a>
    },
    {
      title: '管理',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => {}}>Adminer 管理数据库</a>
        </span>
      )
    }]

    return columns
  }

  confirmMakePrivate = (dbid) => {
    confirm({
      title: '你确定私有化此数据库么?',
      content: '私有化数据库后您将无法使用公网 Adminer 访问您的数据库，需要自行搭建数据库 Adminer',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk () {
        console.log('OK')
      },
      onCancel () {
        console.log('Cancel')
      },
    })
  }

  render () {
    const { db, loading } = this.props

    return (
      <div>
        <Table
          rowKey="db"
          expandedRowRender={record => (
            <span>
              <span style={{color: 'orange', paddingRight: '5px'}}>⚠️ 警告: 私有化数据库后您将无法使用公网 Adminer 访问您的数据库</span>
              <Button onClick={() => this.confirmMakePrivate(record.db)} type='dashed' size='small'>
                私有化
              </Button>
            </span>
          )}
          columns={this.getColumns()}
          dataSource={db}
        />
        <div className={styles.action}>
          {
            loading.createDB && (
              <div className={styles.bar}>
                <Progress
                  percent={this.state.percent}
                  status={this.state.status}
                  showInfo={false}
                  size="small"
                />
              </div>
            )
          }
          <Button
            onClick={this.onCreateDB}
            className={styles.applyBtn}
            disabled={loading.createDB}
          >
            🚀创建数据库
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  account: state.cql.account,
  db: state.cql.db,
  loading: state.loading,
})
const mapDispatchToProps = {
  getAccountBalance,
  createDB,
}
export default connect(mapStateToProps, mapDispatchToProps)(DB)
