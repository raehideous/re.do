import React from 'react';
import './styles.css';

export const RoundButton = ({ icon, disabled, onClick }) => {
  return (
    <button className="circle-ghost-button"
      onClick={onClick}
      disabled={disabled}
      type="button">
        <i className={"fa fa-" + icon} />
    </button>

  )
};

export default RoundButton;