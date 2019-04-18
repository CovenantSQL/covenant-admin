import * as React from 'react'
// import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { Button } from 'antd'

import { auth } from '~/App'
import Footer from '~/components/Footer'
import Nav from '~/components/Nav'
import Card from '~/components/Card'

import styles from './Login.css'
import '~/styles/global/global.css'

class Login extends React.Component {
  state = {}

  render () {
    return (
      <div>
        <Nav />
        <div className={styles.container}>
          <Card>
            <Button onClick={auth.login}>
              Login With Github
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
