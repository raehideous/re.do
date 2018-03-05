import React, { Component } from 'react';
import './ItemsList.css';

class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currModifiedItemId: null
    };
  }

  handleRemove(evt, item) {
    evt.stopPropagation();
    this.props.onItemRemove(item);
  }

  handleModify(evt, item) {
    evt.stopPropagation();
    console.log("modifying: " + item.id);

    this.setState({
      currModifiedItemId: item.id
    });
  }

  toggleComplete(item) {
    this.props.onToggleComplete(item);
  }

  toggleEdit(task) {

  }


  render() {
		return (
      <div className="mt-3">
        <ul className="container list-dark">
          {listItems.map( item => {
            return (
              <li className="row list-item-dark"
                key={list.id}
                onClick={ (e) => { } } >

                <div className="col my-auto">
                  <div className="text-muted" >
                    {list.name}

                  </div>
                </div>


                <div className="my-auto">
                  <span className="badge app-badge badge-pill box">{list.todos_count}</span>

                  <button className="icon-button-sm box"
                    onClick={ (e) => this.handle(list) }>
                    <i className="fa fa-edit" />
                  </button>

                  <button className="icon-button-sm box"
                    onClick={ (e) => this.handleListRemove(list) }>
                    <i className="fa fa-trash" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
		);
  }
}

/*





*/

export default ItemList;