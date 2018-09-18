import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

import styles from './TextInput.css'
const cx = classnames.bind(styles)

class TextInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      focused: false,
      value: props.value
    }
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.value !== this.props.value && nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
    return true
  }

  onChange = (e) => {
    const value = e.target.value
    if (this.props.numberOnly && isNaN(value)) {
    } else {
      this.setState({ value })
    }
  }

  onBlur = () => {
    this.setState({ focused: false })
    this.props.onBlur && this.props.onBlur(this.state.value)
  }

  onFocus = () => {
    this.setState({ focused: true })
    this.props.onFocus && this.props.onFocus(this.state.value)
  }

  onInput = (e) => {
    const { onInput } = this.props
    onInput && onInput(e.target.value)
  }

  onKeyDown = (e) => {
    const { onEnter } = this.props
    if (e.keyCode === 13) {
      e.preventDefault()
      this.inputDom.blur()
      onEnter && onEnter(this.state.value)
    }
  }

  // onTouchStart = () => {
  //   this.setState({ focused: true })
  // }

  render () {
    const { value, focused } = this.state
    // const { withCommas, placeholder, disabled, maxLength, type, className } = this.props
    const { placeholder, disabled, maxLength, type, className } = this.props

    const inputClass = cx({
      textInput: true,
      focused: focused,
      [className]: className
    })

    return (
      <input
        ref={el => { this.inputDom = el }}
        // type={focused && withCommas ? 'number' : type}
        type={type}
        className={inputClass}
        placeholder={placeholder}
        // value={!focused && withCommas ? numberWithCommas(value) : value}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        // onTouchStart={this.onTouchStart}
        onChange={this.onChange}
        onInput={this.onInput}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyDown={e => this.onKeyDown(e)}
        autoComplete='off'
      />
    )
  }
}

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  // withCommas: PropTypes.bool,
  onInput: PropTypes.func,
  onFocus: PropTypes.func,
  onEnter: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  alignCenter: PropTypes.bool,
  type: PropTypes.string,
  numberOnly: PropTypes.bool
}
TextInput.defaultProps = {
  type: 'text'
}

export default TextInput
