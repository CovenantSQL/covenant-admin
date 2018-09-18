import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

import styles from './Button.css'
const cx = classnames.bind(styles)

/**
 * global <a> button component with link or onClick function
 */
const Button = ({
  children,
  className,
  theme,
  variant,
  isDisabled,
  isFullwidth,
  link,
  onClick
}) => {
  let Tag = link ? 'a' : 'button'
  const classNames = cx('button', {
    [className]: className,
    [theme]: theme,
    [variant]: variant,
    fullwidth: isFullwidth
  })
  return (
    <Tag
      href={link}
      className={classNames}
      onClick={(e) => { onClick && onClick(e) }}
      disabled={isDisabled}
    >
      {children}
    </Tag>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.string, // basic|primary
  variant: PropTypes.string, // lg|sm
  isDisabled: PropTypes.bool,
  isFullwidth: PropTypes.bool,
  onClick: PropTypes.func,
  link: PropTypes.string
}

Button.defaultProps = {
  theme: 'basic',
  isDisabled: false,
  isFullwidth: false
}

export default Button
