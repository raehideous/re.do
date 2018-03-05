import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/list.css';
import * as Strings from '../../constants/strings';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { getTaskListById } from '../../actions/taskLists-actions'

import Search from '../../components/Search';
import Filters from '../../components/Filters';

import CreateForm from '../../components/CreateForm';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchPattern: '',
      activeFilter: items => items,
      listName: ""
    };
  }

  onNewSearchPattern = evt => {
    this.setState({searchPattern: evt.target.value.toLowerCase()})
  }

  handleOnBack = () => {
    this.props.history.push("/");
  }

  handleTaskRemove(task) {
    this.props.deleteTask(task);
  }

  handleOnCreate = taskName => {
    this.props.createTask(taskName);
  }

  handleTaskModify(taskId) {
    this.setState({
      currModifiedItemId: taskId
    });
  }

  toggleComplete(list) {
    //
  }

  handleNewFilter = newFilter => {
    this.setState({
      activeFilter: newFilter
    });
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
      listName: e.target.value
    })
  }

//<h3 className="text-muted">{this.props.taskList.name}</h3>
  render() {
    const data = this.props.tasks.data || [];
    const filteredTasks = this.state.activeFilter(data.filter( task => task.name.toLowerCase().search(this.state.searchPattern) > -1 ));
    const taskListName = this.props.taskList ? this.props.taskList.name : "";

		return (
      <div className="mt-2">
        <div className="container">

          <div className="row">
            <div className="col-sm-1 my-auto">
              <button className="circle-ghost-button"
                onClick={this.handleOnBack}>
                <i className="fa fa-chevron-left" />
              </button>
            </div>

            <div className="col-sm-10">

                <input type="text" className="text-input-dark"
                   value={this.state.listName || taskListName}
                   onClick={this.onListNameChangeClick}
                   onChange={this.onListNameChange} defaultValue={taskListName}
                   placeholder={"List name"}/>

            </div>

            <div className="col-sm-1 my-auto">
              <button className="circle-ghost-button"
                disabled={this.state.listName === taskListName}
                onClick={ () => console.log("CLKEICKEN") } >
                <i className="fa fa-check" />
              </button>
            </div>

          </div>

          <div className="mt-3">
            <CreateForm
              placeholder={Strings.CREATE_TASK}
              onCreate={this.handleOnCreate}/>
            <hr />

            <div className="row" >
                <div className="col-sm-8">
                  <Search onTextChange={this.onNewSearchPattern} />
                </div>
                <Filters className="col" onFilterChange={this.handleNewFilter} />
            </div>
          </div>



          <ul className="container list-dark">
            {filteredTasks.map( task => {
              return (
                <li className="row list-item-dark"
                  key={task.id} >

                  <div className="col my-auto">
                    <div className={task.is_complete ? "text-muted text-strike" : "text-muted"} >
                      {task.name}
                    </div>
                  </div>


                  <div className="my-auto">
                    <button className="icon-button-sm box"
                      onClick={ (e) => this.handleTaskModify(task.id) }>
                      <i className="fa fa-pencil" />
                    </button>

                    <button className="icon-button-sm box"
                      onClick={ (e) => this.handleTaskRemove(task) }>
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

        </div>
      </div>
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