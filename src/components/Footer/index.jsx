import React from 'react'
import classnames from 'classnames/bind'

import ArrowDownIcon from '~/assets/icons/arrowDown.svg'
import CovenantSQLIcon from '~/assets/icons/covenantsql.svg'

import styles from './Footer.css'

const cx = classnames.bind(styles)
class Footer extends React.Component {
  state = {
    disclaimerCollapsed: true
  }

  toggleDisclaimer = () => {
    this.setState({ disclaimerCollapsed: !this.state.disclaimerCollapsed })
  }

  render () {
    return (
      <section className={styles.footer}>
        <div>
          <div className={styles.row}>
            <p>© 2018 CovenantLabs</p>
            <a
              onClick={this.toggleDisclaimer}
              className={cx('toggler', {show: !this.state.disclaimerCollapsed})}
            >
              Credit
              <ArrowDownIcon />
            </a>
          </div>
          <p className={cx('disclaimer', {show: !this.state.disclaimerCollapsed})}>
            Faucet Icon made by <a href='https://www.flaticon.com/authors/freepik'>Freepik</a> from www.flaticon.com
          </p>
        </div>
        <div className={styles.credit}>
          Proudly Powered by <a href='https://github.com/CovenantSQL/CovenantSQL'><CovenantSQLIcon /></a>
        </div>
      </section>
    )
  }
}

export default Footer
