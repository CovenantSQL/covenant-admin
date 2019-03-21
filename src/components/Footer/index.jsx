import React from 'react'
import { Link } from 'react-router-dom'

import LogoIcon from '~/assets/icons/logoicon.svg'
import CovenantSQLIcon from '~/assets/icons/horizontal_logo.svg'

import styles from './Footer.css'

class Footer extends React.Component {
  render () {
    return (
      <footer className={styles.navFooter} id="footer">
        <section className={styles.sitemap}>
          <span className={styles.navHome}>
            <Link to="/">
              <LogoIcon />
            </Link>
          </span>
          <div>
            <h3>Docs</h3>
            <a href="https://developers.covenantsql.io/docs/intro">Getting Started</a>
            <a href="https://developers.covenantsql.io/docs/api-json-rpc">API Reference</a>
          </div>
          <div>
            <h3>Community</h3>
            <a
              href="https://stackoverflow.com/search?q=covenantsql"
              target="_blank"
              rel="noreferrer noopener"
            >Stack Overflow</a>
            <a href="https://gitter.im/CovenantSQL/CovenantSQL">Gitter Chat</a>
            <a href="https://twitter.com/CovenantLabs" target="_blank" rel="noreferrer noopener">Twitter</a>
          </div>
          <div>
            <h3>More</h3>
            <a href="https://medium.com/@covenant_labs">Blog</a>
            <a
              className={styles.githubButton}
              href="https://github.com/CovenantSQL/CovenantSQL"
              data-icon="octicon-star"
              data-count-href="/CovenantSQL/CovenantSQL/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub"
            >Star</a>
          </div>
        </section>

        <a
          href="https://covenantsql.io"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.covenantIcon}
        >
          <CovenantSQLIcon />
        </a>
        <section className={styles.copyright}>{ `Copyright © ${new Date().getFullYear()} Covenant Labs` }</section>
      </footer>
    )
  }
}

export default Footer
