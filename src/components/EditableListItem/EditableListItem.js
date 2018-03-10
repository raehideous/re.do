import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Strings from '../../constants/strings';
import { Row, Col } from 'reactstrap';

class EditableListItem extends Component {
    state = {
      modifiedText: this.props.text,
      isEditing: false
    }


  handleIsEditingTransition = prevEditingState => {
    const { modifiedText } = this.state;
    const { text, id, onSave } = this.props;
    // nextEditingState will be !prevEditingState
    //If edit mode has just been turned on then no action perfomed
    if(!prevEditingState) {
      return;
    }
    //If modified text is the same then there is no 'onSave' invoked.
    if(modifiedText === text) {
      return;
    }
    //If edit mode goes off, then persist modified text
    onSave(id, modifiedText);
  }


  toggleIsEditing = () => {
    const { isEditing } = this.state;
    //If a moment ago was edit mode on
    this.handleIsEditingTransition(isEditing)
    this.setState({isEditing: !isEditing});
  }

  setEditingModeOff = () => {
    this.setState({
      isEditing: false,
      modifiedText: this.props.text
    });
  }

  moveCaretAtEnd = e => {
    let val = e.target.value;
    e.target.value = '';
    e.target.value = val;
  }


  render() {
    const { children, id, text, checked, textStriked, badge, onRemove, toggleCheck } = this.props;
    const { modifiedText, isEditing } = this.state;

    const checkbox = toggleCheck ? (
      />
    ) : null;

    const editableContent = (
      <span>
        <input type="text" className="text-input-dark-simple"
          autoFocus={true}
          value={modifiedText}
          onChange={ (e) => this.setState({ modifiedText: e.target.value })}
          onFocus={this.moveCaretAtEnd}
          onBlur={this.setEditingModeOff}
          placeholder={Strings.TASK_NAME}
        />
      </span>
    )

    const contentStyled = textStriked ? (<s>{text}</s>) : text;
    const content = isEditing ? editableContent : contentStyled;

    return (
      null;
    )
  }

}

EditableListItem.propTypes = {
  id: PropTypes.number,
  checkable: PropTypes.bool,
  text: PropTypes.string,
  badge: PropTypes.string,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,

}

export default EditableListItem
