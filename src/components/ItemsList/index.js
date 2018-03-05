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
      <ul>
        {this.props.items.map( task => {
          return (
            <li className="row mt-3 list-list-dark"
              key={task.todo_list + "_" + task.id} >

              <div className="col my-auto">
                <div className={task.is_complete ? "text-muted text-strike" : "text-muted"} >
                  {task.name}
                </div>
              </div>


              <div className="pr-3">
                <button className="btn mr-1" type="button"
                  onClick={ (e) => this.handleModify(e, task) }>
                  <i className="fa fa-edit" />
                </button>

                <button className="btn" type="button"
                  onClick={ (e) => this.handleRemove(e, task) }>
                  <i className="fa fa-trash" />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}


export default ItemList;