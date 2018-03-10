import React from 'react'
import PropTypes from 'prop-types'

const TextInput = ( {placeholder, value, onChange, onEnterPress}) => {

  let textVal = value;

  const handleOnChange = evt => {
    textVal = evt.target.value;
    onChange(textVal);
  }

  const catchReturn = (evt) => {
    if ( evt.key === 'Enter' ) {
      onEnterPress();
      evt.preventDefault();
    }
  }

  return (
    <input
      type="text"
      className="text-input-dark"
      placeholder={placeholder}
      value={ this.textVal }
      onChange={ this.handleOnChange }
      onKeyPress={ this.catchReturn }/>
  )
}

export default TextInput;
