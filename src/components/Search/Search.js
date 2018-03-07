import React from 'react';
import PropTypes from 'prop-types';
import * as Strings from '../../constants/strings';

export const Search = ({ onTextChange }) => {
  return (
    <div>
        <input type="text" className="text-input-dark" placeholder={Strings.SEARCH} onChange={ onTextChange } />
    </div>
  )
}

Search.propTypes = {
  onTextChange: PropTypes.func.isRequired
};

export default Search;