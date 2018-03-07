import React from 'react';
import './styles.css';

const ListItem = ( {key, id, name, checked, badge, onEdit, onRemove, onCheck}) => {
  const checkbox = onCheck ? <input type="checkbox" checked={checked} className="checkbox-dark" onChange={(e) => onCheck(e, id)}/> : null;

  return (
    <li className="row list-item-dark"
      key={key}
      onClick={ (e) => { } } >

      <div className="col my-auto">
        <div className="text-muted" >
          {checkbox}
          {name}
        </div>
      </div>


      <div className="my-auto">
        <span className="badge app-badge badge-pill box">{badge}</span>

        <button className="icon-button-sm box"
          onClick={ (e) => onEdit(id) }>
          <i className="fa fa-pencil" />
        </button>

        <button className="icon-button-sm box"
          onClick={ (e) => onRemove(id) }>
          <i className="fa fa-trash" />
        </button>
      </div>

    </li>
  )
}

export default ListItem;