import * as React from 'react'
import Iframe from 'react-iframe'

import { Spin } from 'antd'
import { connect } from 'react-redux'
import { setAdminerDBID } from '~/store/covenant'

import styles from './Adminer.css'

class Adminer extends React.Component {
  state = {
    loading: true
  }

  componentDidMount () {
    const { dbs, adminer: { selected } } = this.props
    if (selected === '' && dbs.length !== 0) {
      this.props.setAdminerDBID({ dbid: dbs[0].db })
    }
  }

  onFrameLoaded = () => {
    this.setState({ loading: false })

    const iframe = document.getElementById('adminer')
    if (iframe) {
      console.log(iframe)
    }
  }

  render () {
    const { dbs, adminer: { selected } } = this.props
    return (
      <div className={styles.container}>
        {
          dbs.length !== 0
            ? (
              <div className={styles.wrapper}>
                { this.state.loading && <span className={styles.spinner}><Spin /></span> }
                <Iframe
                  url={`http://web.testnet.covenantsql.io/?covenantsql=cql_adminer_adapter&username=&db=${selected}`}
                  width='100%'
                  height='400px'
                  id='adminer'
                  className='adminer'
                  display='initial'
                  position='relative'
                  onLoad={this.onFrameLoaded}
                  allowFullScreen
                />
              </div>
            )
            : (
              <div className={styles.empty}>
                暂无数据库
              </div>
            )
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dbs: state.cql.dbs,
  adminer: state.cql.adminer
})
const mapDispatchToProps = {
  setAdminerDBID
}
export default connect(mapStateToProps, mapDispatchToProps)(Adminer)
