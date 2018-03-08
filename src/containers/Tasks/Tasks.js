import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/list.css';
import * as Strings from '../../constants/strings';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { getTaskListById } from '../../actions/taskLists-actions'

import List from '../../components/List';
import EditableListItem from '../../components/EditableListItem';
import RoundButton from '../../components/RoundButton';
import Search from '../../components/Search';
import Filters from '../../components/Filters';

import CreateForm from '../../components/CreateForm';

class Tasks extends Component {

    state = {
      searchPattern: '',
      activeFilter: items => items,
      changedListName: '',
      currEditId: null
    };


  onNewSearchPattern = evt => {
    this.setState({searchPattern: evt.target.value.toLowerCase()})
  }

  handleOnBack = () => {
    this.props.history.push("/");
  }

  handleTaskRemove = taskId => {
    this.props.deleteTask(taskId);
  }

  handleOnCreate = taskName => {
    const newTask = {
      "name": taskName,
      "is_complete": false,
      "todo_list": this.props.match.params.id
    }
    this.props.createTask(newTask);
  }

  handleTaskModify = taskId => {
    this.setState({
      currEditId: taskId
    });
  }

  handleUpdateListName = () => {
    this.props.updateTaskList({
      ...this.props.taskList,
      name: this.state.changedListName
    });
  }

  handleNewFilter = newFilter => {
    this.setState({
      activeFilter: newFilter
    });
  }

  handleTaskCheck = (evt, taskId) => {
    const updatedTask = {
      ...this.props.tasks.data.find( task => task.id === taskId),
      'is_complete': evt.target.checked
    };

    this.props.updateTask(updatedTask);
  }

  componentDidMount() {
    const chosenListID = this.props.match.params.id;
    if (!this.props.taskList) {
      this.props.fetchTaskLists();
    }
    this.props.fetchTasks(chosenListID);
  }

  onListNameChange = e => {
    this.setState({
      changedListName: e.target.value
    })
  }

//<h3 className="text-muted">{this.props.taskList.name}</h3>
  render() {
    const { tasks, taskList } = this.props;
    const data = tasks.data || [];

    const filteredTasks = this.state.activeFilter(data.filter( task => task.name.toLowerCase().search(this.state.searchPattern) > -1 ));
    const listName = taskList ? taskList.name : "";

    const { changedListName } = this.state;

    return (
      <List
        header={
          <div className="mt-3">

            <div className="row">
                  <div className="col-sm-2">
                      <RoundButton icon="chevron-left" onClick={this.handleOnBack} />
                  </div>

                  <div className="col">
                    <input type="text" className="text-input-dark col"
                         value={changedListName || listName }
                         onChange={this.onListNameChange}
                         placeholder={Strings.LIST_NAME}
                         />
                  </div>

                  <div className="col-sm-2 text-right">
                    <RoundButton
                       icon="check"
                      disabled={!changedListName || changedListName === listName}
                      onClick={this.handleUpdateListName} />
                  </div>
            </div>

            <div className="row mt-3">
              <CreateForm
                placeholder={Strings.CREATE_TASK}
                onCreate={this.handleOnCreate}/>
            </div>
            <hr />


            <div className="row mt-3">
              <div className="col-sm-6">
                <Search className="col" onTextChange={this.onNewSearchPattern}/>
              </div>

              <div className="col">
                <Filters onFilterChange={this.handleNewFilter} />
              </div>
            </div>
          </div>
        }
        datasource={filteredTasks}
        renderRow={ task => (
          <EditableListItem
              key={task.id}
              id={task.id}
              name={task.name}
              checked={task.is_complete}
              textStriked={task.is_complete}
              editable={task.id === this.state.currEditId}
              onEdit={this.handleTaskModify}
              onRemove={this.handleTaskRemove}
          />
        ) }
      />
		);

  }
}

const mapStatetoProps = (state, props) => ({
  tasks: state.tasks,
  taskList: getTaskListById(state)(props.match.params.id)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStatetoProps, mapDispatchToProps)(Tasks);