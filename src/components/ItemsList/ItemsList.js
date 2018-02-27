import React, { Component } from 'react';
import './ItemsList.css';

class ItemList extends Component {

  removeTask(task) {

  }

  modifyTask(task) {

  }

  toggleComplete(task) {

  }

  toggleEdit(task) {

  }


  render() {
		return (
      <div className="mt-3">
        <ul className="list-group">
          {this.props.listItems.map( item => {
            let badge;
            if(item.todos_count) {
              badge = (<span className="badge badge-danger badge-pill ml-1">{item.todos_count}</span>);
            }

            return (

                <li className="list-group-item"
                    key={item.id}
                    onClick={ (e) => { this.props.onListItemClick(item) } } >

                    <div className="row">

                      <div>
                        <div className={item.is_complete ? 'text-strike' : "" } >
                          {item.name}
                          {badge}
                        </div>

                      </div>


                      <div className="pull-right">
                        <div className="btn-group pull-right">
                          <button className="btn" type="button"
                            onClick={ (e) => {
                              e.stopPropagation();
                              console.log("clicked edit?!")
                            }}>
                            <i className="fa fa-edit fa-lg" />
                          </button>

                          <button className="btn" type="button"
                            onClick={ (e) => {
                              e.stopPropagation();
                              console.log("clicked edit?!")
                            }}>
                            <i className="fa fa-trash fa-lg" />
                          </button>
                        </div>
                      </div>

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