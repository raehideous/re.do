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

  renderItemData(item) {
    if (this.state.currModifiedItemId === item.id) {
      return (
        <div>
          modify here
        </div>
      )
    } else {
      let badge = item.todos_count ? <span className="badge app-badge badge-pill ml-1">{item.todos_count}</span> : null;
      let className = "text-muted";
      return (
        <div className={item.is_complete ? className + ' text-strike' : className} >
          {item.name}
          {badge}
        </div>
      )
    }
  }

  render() {
		return (
      <div className="mt-3">
        <ul className="container">
          {this.props.listItems.map( item => {
            return (

                <li className="row mt-2 list-item-dark"
                    key={item.id}
                    onClick={ (e) => { this.props.onListItemClick(item) } } >

                      <div className="col my-auto">
                        {this.renderItemData(item)}
                      </div>


                      <div className="pr-3">
                          <button className="btn mr-1" type="button"
                            onClick={ (e) => this.handleModify(e, item) }>
                            <i className="fa fa-edit" />
                          </button>

                          <button className="btn" type="button"
                            onClick={ (e) => this.handleRemove(e, item) }>
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