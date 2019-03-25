import * as React from 'react'
import Iframe from 'react-iframe'

import styles from './Adminer.css'

class Adminer extends React.Component {
  render () {
    const { dbid } = this.props
    return (
      <div className={styles.container}>
        <Iframe url={`http://192.168.2.100:11149/?covenantsql=cql_adminer_adapter&username=&db=${dbid}`}
          width="100%"
          height="auto"
          id="adminer"
          className="adminer"
          display="initial"
          position="relative"
          allowFullScreen
        />
      </div>
    )
  }
}

export default Adminer
