import React, { Component } from 'react';
import TasksList from './TasksList';

class SearchBar extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("Mounted!!!!!");
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.textInput}>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  tasks: state.tasksReducer.tasks
});




export default SearchBar;