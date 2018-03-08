import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EditableListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newContent: ""
    }


  }

  handleCancelEdit = () => {
    this.setState({
      newContent: ""
    });

    this.props.onEdited(null);
  }


  render () {
    const { id, name, checked, textStriked, badge, editing, onEdited, onRemove, toggleCheck } = this.props;
    const { newContent } = this.state;

    const checkbox = toggleCheck ? (
      <input type="checkbox"
        checked={checked}
        className="checkbox-dark mr-2"
        onChange={(e) => toggleCheck(e.target.checked, id)} />
    ) : null;

    const editableContent = (
      <input type="text" className="text-input-dark-simple"
          autoFocus
           value={newContent || name }
           onChange={ (e) => this.setState({ newContent: e.target.value })}
           onBlur={ (e) => onEdited() }
           />
    );

    const contentStyled = textStriked ? (<s>{name}</s>) : name;
    const content = editing ? editableContent : contentStyled;

    return (
      <li className="row list-item-dark" >

        <div className="col text-muted my-auto">
            {checkbox}
            {content}
        </div>


        <div className="my-auto">
          <span className="badge app-badge badge-pill box">{badge}</span>

          <button className="icon-button-sm box"
            type="button"
            onClick={ (e) => onEdited(id, newContent) }>
            <i className={editing ? "fa fa-check" : "fa fa-pencil"} />
          </button>

          <button className="icon-button-sm box"
            type="button"
            onClick={ (e) => onRemove(id) }>
            <i className="fa fa-trash" />
          </button>
        </div>

      </li>
    )
  }

}

EditableListItem.propTypes = {
  id: PropTypes.number,
  checkable: PropTypes.bool,
  content: PropTypes.string,
  badge: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,

}

export default EditableListItem
