import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import './ItemsList.css'

class ItemList extends Component {

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
      <div className="myCont">
  			{this.props.listItems.map( item => {
          const badge = item.todos_count ? (<Badge pill color="dark">{item.todos_count}</Badge>) : null;
          return (
            <ListGroupItem
              className="mt-1 list-item"
              onClick={ () => this.props.onListItemClick(item)}
            >
            {item.name}
            {badge}
           </ListGroupItem>
         )
        })}
        </div>
      </ListGroup>
		);
  }
}



export default ItemList;