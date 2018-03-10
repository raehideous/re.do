import React from 'react';
import './styles.css';
import { ListGroupItem } from 'reactstrap';

const ListItem = ( {id, children}) => {
  return (
    <ListGroupItem className="list-item-dark"
      key={id} >
      {children}
    </ListGroupItem>
  )
}

export default ListItem;