import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

import styles from './Card.css'
const cx = classnames.bind(styles)

class Card extends React.PureComponent {
  render () {
    const {
      children,
      className,
      noSidePadding,
      noPadding,
      large
    } = this.props
    return (
      <div
        className={cx('card', {
          noSidePadding: noSidePadding,
          noPadding: noPadding,
          large: large,
          [className]: className
        })}
      >
        {children}
      </div>
    )
  }
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  noSidePadding: PropTypes.bool,
  noPadding: PropTypes.bool,
  large: PropTypes.bool
}

Card.defaultProps = {
  noSidePadding: false
}

export default Card
