import * as React from 'react'
import { connect } from 'react-redux'

import { Button, Progress } from 'antd'

import { getAccountBalance, createDB } from '~/store/covenant'

import styles from './DB.css'

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

  render () {
    const { db, loading } = this.props

    return (
      <div>
        <pre>
          {JSON.stringify(db, null, 2)}
        </pre>
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
