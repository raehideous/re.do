import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EditableListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: null
    }


  }


  render () {
    const { id, name, checked, textStriked, badge, editable, onEdit, onRemove } = this.props;
    const { editing } = this.state;

    const checkbox = checked ? (
      <input type="checkbox"
        checked={checked}
        className="checkbox-dark mr-2"
        onChange={(e) => onEdit(e.target.checked)}
        onFocusLost={ (e) => console.log("FOCUS LOST!")}/>
    ) : null;



    const editableContent = (
      <input type="text"
          className="text-input-dark-simple"

          />
    )

    const contentStyled = textStriked ? (<s>{name}</s>) : name;

    const content = editing ? editableContent : contentStyled;

    return (
      <li className="row list-item-dark"
        onClick={ (e) => { } } >

        <div className="col text-muted my-auto">
            {checkbox}
            {content}
        </div>


        <div className="my-auto">
          <span className="badge app-badge badge-pill box">{badge}</span>

          <button className="icon-button-sm box"
            type="button"
            onClick={ (e) => onEdit(id) }>
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
