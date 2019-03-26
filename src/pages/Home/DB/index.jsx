import * as React from 'react'
import { connect } from 'react-redux'
import LoadCon from 'react-loadcon'

import { Modal, Table, Button, Progress } from 'antd'
import HashTip from '~/components/HashTip'

import {
  getAccountBalance,
  createDB,
  privatizeDB,
  setAdminerDBID
} from '~/store/covenant'

import styles from './DB.css'

class DB extends React.Component {
  state = {
    status: 'normal',
    percentage: 8,
    visibles: {}
  }

  onCreateDB = () => {
    this.setState({ status: 'active' })
    const { address } = this.props.account

    const inter = setInterval(() => {
      this.setState({
        percentage: this.state.percentage > 90
          ? this.state.percentage
          : this.state.percentage + Math.random() * 1000 % 5
      })
    }, 1200)

    this.props.createDB({ account: address }).then(() => {
      this.setState({ status: 'success' })
      setTimeout(() => {
        this.setState({ status: 'normal', percentage: 100 })
      }, 1500)
      clearInterval(inter)
    }).catch(e => {
      this.setState({ status: 'exception' })
      clearInterval(inter)
    })
  }

  selectAdminer = (dbid) => {
    this.props.setAdminerDBID({ dbid })
    this.props.selectTab('3')
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
          <a onClick={() => this.selectAdminer(record.db)}>Adminer 管理数据库</a>
        </span>
      )
    }]

    return columns
  }

  handlePrivatize = (db) => {
    const { address } = this.props.account
    this.props.privatizeDB({ account: address, db }).then(() => {
      this.hidePrivatizeModal(db)
    })
  }

  showPrivatizeModal = (db) => {
    this.setState({ visibles: { [db]: true } })
  }

  hidePrivatizeModal = (db) => {
    this.setState({ visibles: { [db]: false } })
  }

  render () {
    const { dbs, privatization, loading } = this.props

    return (
      <div>
        <LoadCon status={this.state.status} percentage={this.state.percentage} />
        <Table
          rowKey="db"
          expandedRowRender={record => (
            <span>
              <span style={{color: 'orange', paddingRight: '5px'}}>⚠️ 警告: 私有化数据库后您将无法使用公网 Adminer 访问您的数据库</span>
              <Button
                onClick={() => this.showPrivatizeModal(record.db)}
                type='dashed'
                size='small'
              >
                私有化
              </Button>
              {
                !!privatization[record.db] &&
                <p>
                  此数据库已私有化：
                  <a
                    href={'http://scan.covenantsql.io/#/tx/' + privatization[record.db]}
                    target='_blank'
                  >
                    <HashTip hash={privatization[record.db]} />
                  </a>
                </p>
              }
              <Modal
                title='数据库私有化'
                okText='是'
                okType='danger'
                cancelText='否'
                visible={this.state.visibles[record.db]}
                confirmLoading={loading.privatizeDB}
                onOk={() => this.handlePrivatize(record.db)}
                onCancel={() => this.hidePrivatizeModal(record.db)}
              >
                <p>{'私有化数据库后您将无法使用公网 Adminer 访问您的数据库，需要自行搭建数据库 Adminer。你确定私有化此数据库么?'}</p>
                <HashTip hash={record.db} />
              </Modal>
            </span>
          )}
          columns={this.getColumns()}
          dataSource={dbs}
        />
        <div className={styles.action}>
          {
            loading.createDB && (
              <div className={styles.bar}>
                <Progress
                  percent={this.state.percentage}
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
  dbs: state.cql.dbs,
  privatization: state.cql.privatization,
  loading: state.loading,
})
const mapDispatchToProps = {
  getAccountBalance,
  createDB,
  privatizeDB,
  setAdminerDBID,
}
export default connect(mapStateToProps, mapDispatchToProps)(DB)
