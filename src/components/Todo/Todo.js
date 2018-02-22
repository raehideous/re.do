import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemList from '../ItemList';

class Todo extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
  }

  getListItems(taskListId) {
    if(taskListId) {
      console.log(this.props.tasksLists)
      return this.props.tasks.filter( task => task.todo_list == taskListId);
    }
    //If list is not chosen, render all lists
    return this.props.tasksLists;
  }


  render() {
    const listItems = this.getListItems(this.props.chosenTaskList);
    return (
      <div>
        <h2>Here is todo List</h2>
        <ItemList listItems={listItems} />
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    tasks: state.tasks,
    tasksLists: state.tasksLists
  }
}


export default connect( mapStatetoProps, null)( Todo );
