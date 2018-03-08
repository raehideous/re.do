import React from 'react';
import './styles.css';

const ListItem = ( {id, name, checked, textStriked, badge, editable, onEdit, onRemove, onCheck}) => {
  const checkbox = onCheck ? (
    <input type="checkbox"
      checked={checked}
      className="checkbox-dark mr-2"
      onChange={(e) => onCheck(e, id)}/>
  ) : null;

  name = textStriked ? (<s>{name}</s>) : name;

  const editableContent = (
    <input type="text"
        className="text-input-dark-simple"

        />
  )
  const content = editable ? editableContent : name;


/*
const handleEditState = editing => {
  if (editing) {
    console.log("NEED SAVE");
  } else {
    console.log("NEED EDIT!")
    onEdit()
  }
}

*/

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
          <i className={editable ? "fa fa-check" : "fa fa-pencil"} />
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

export default ListItem;