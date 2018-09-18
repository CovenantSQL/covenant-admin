import React from 'react'
import { Menu, Dropdown, Icon } from 'antd'

import { getLanguage, setLanguage } from '~/utils'

const locales = ['en', 'zh-hk', 'zh-cn']
class LocaleToggler extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      locale: getLanguage()
    }
  }

  onLocaleChange = ({ key }) => {
    const locale = locales[key]
    setLanguage(locale)
  }

  render () {
    const { locale } = this.state
    const menu = (
      <Menu onClick={this.onLocaleChange}>
        {
          locales.map((locale, idx) => (
            <Menu.Item key={idx}>
              {locales[idx]}
            </Menu.Item>
          ))
        }
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <button>
          {locale} <Icon type="down" />
        </button>
      </Dropdown>
    )
  }
}

export default LocaleToggler
