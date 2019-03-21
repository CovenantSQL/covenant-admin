import * as React from 'react'
import t from '~/utils/locales'

import BugIcon from '~/assets/icons/bug.svg'
import styles from './QnA.css'

const QnA = () => {
  return (
    <div className={styles.qaSection}>
      <div className={styles.right}>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/CovenantSQL/CovenantSQL/issues'
          className={styles.issue}
        >
          遇到 Bug？给我们一个 Github Issue 吧 <BugIcon />
        </a>
      </div>
      <div className={styles.qa}>
        <p className={styles.q}>{t('q1')}</p>
        <p className={styles.a}>{t('a1')}</p>
      </div>
      <div className={styles.qa}>
        <p className={styles.q}>{t('q4')}</p>
        <p className={styles.a}>{t('a4')}</p>
      </div>
      <div className={styles.qa}>
        <p className={styles.q}>{t('q5')}</p>
        <p className={styles.a}>{t('a5')}</p>
      </div>
    </div>
  )
}

export default QnA
