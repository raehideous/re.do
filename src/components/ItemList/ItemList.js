import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class ItemList extends Component {
  constructor() {
    super();

  }

  removeTask(task) {

  }

  modifyTask(task) {

  }

  toggleComplete(task) {

  }

//{(item.todos_count ? <Badge pill>item.todos_count)</Badge> : null)}

  render() {
		return (
      <ListGroup>
  			{this.props.listItems.map( item => {
          return <ListGroupItem>{item.name} </ListGroupItem>
        })}
      </ListGroup>
		);
  }
}




export default ItemList;