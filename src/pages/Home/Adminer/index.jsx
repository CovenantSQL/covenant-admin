import * as React from 'react'
import Iframe from 'react-iframe'

import { connect } from 'react-redux'
import { setAdminerDBID } from '~/store/covenant'

import styles from './Adminer.css'

class Adminer extends React.Component {
  componentDidMount () {
    const { dbs, adminer: { selected } } = this.props
    if (selected === '' && dbs.length !== 0) {
      this.props.setAdminerDBID({ dbid: dbs[0].db })
    }
  }
  render () {
    const { dbs, adminer: { selected } } = this.props
    return (
      <div className={styles.container}>
        {
          dbs.length !== 0
            ? (
              <Iframe url={`http://192.168.2.100:11149/?covenantsql=cql_adminer_adapter&username=&db=${selected}`}
                width="100%"
                height="auto"
                id="adminer"
                className="adminer"
                display="initial"
                position="relative"
                allowFullScreen
              />
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
