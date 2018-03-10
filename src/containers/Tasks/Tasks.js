import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Strings from '../../constants/strings';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { getTaskListById } from '../../actions/taskLists-actions'
import './styles.css'
import { Container, Row, Col, Button } from 'reactstrap';
import { List, ListItem, RoundButton, Search, Filters} from '../../components';


import CreateForm from '../../components/CreateForm';

class Tasks extends Component {
  state = {
    searchPattern: '',
    activeFilter: items => items,
    changedListName: this.props.taskList.name,
    taskToEditId: null,
    editedTaskName: null
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

  handleUpdateTaskName = (taskId, newTaskName)  => {
    console.log(taskId, newTaskName)

    let taskToEditId = taskId;

    if(newTaskName) {
      this.props.updateTask({
        ...this.props.tasks.data.find( task => task.id === taskId),
        name: newTaskName
      });

      taskToEditId = null;
    }

    this.setState({
      taskToEditId: taskToEditId
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

  handleTaskCheck = (checkVal, taskId) => {
    const updatedTask = {
      ...this.props.tasks.data.find( task => task.id === taskId),
      'is_complete': checkVal
    };

    this.props.updateTask(updatedTask);
  }

  componentDidMount() {
    const chosenListID = this.props.match.params.id;
    if (!this.props.taskList) {
      this.props.fetchTaskLists();
    }
    this.props.fetchTasks(chosenListID);

    this.setState({changedListName: this.props.taskList.name})
  }

  onListNameChange = e => {
    this.setState({
      changedListName: e.target.value
    })
  }

  getEditOrText = task => {
    if(this.state.taskToEditId === task.id) {
        const moveCaretAtEnd = e => {
          const val = e.target.value;
          e.target.value = '';
          e.target.value = val;
        }

        return (
          <span>
            <input type="text" className="text-input-dark-simple"
              autoFocus={true}
              value={this.state.editedTaskName}
              onChange={ (e) => this.setState({ editedTaskName: e.target.value })}
              onFocus={moveCaretAtEnd}
              placeholder={Strings.TASK_NAME}
            />
          </span>
        )
    }

    //Return text:
    return (
      <span className={ task.is_complete ? "text-striked" : ""}>
        {task.name}
      </span>
    )
  }

  handleEditOrSave = task => {
      if(this.state.taskToEditId === task.id) {
        //save
        this.handleUpdateTaskName(task.id, this.state.editedTaskName);
        this.setState({
          taskToEditId: null,
          editedTaskName: null
        });
        return;
      }

      this.setState({
        taskToEditId: task.id,
        editedTaskName: task.name
      });
  }

  render() {
    const { tasks, taskList } = this.props;
    const data = tasks.data || [];

    const filteredTasks = this.state.activeFilter(data.filter( task => task.name.toLowerCase().search(this.state.searchPattern) > -1 ));
    const listName = taskList ? taskList.name : "";

    const { changedListName } = this.state;

    const header = (
      <div >

        <Row>
          <Col sm="2">
              <RoundButton icon="chevron-left" onClick={this.handleOnBack} />
          </Col>
          <Col>
            <input type="text" className="text-input-dark col"
                 value={changedListName}
                 onChange={this.onListNameChange}
                 placeholder={Strings.LIST_NAME}
            />
          </Col>
          <Col sm="2" className="text-right">
            <RoundButton
              icon="check"
              disabled={!changedListName || changedListName === listName}
              onClick={this.handleUpdateListName} />
          </Col>
        </Row>

        <Row className="mt-3">
          <CreateForm
            placeholder={Strings.CREATE_TASK}
            onCreate={this.handleOnCreate}/>
        </Row>
        <hr />
        <Row>
          <Col sm="6">
            <Search className="col" onTextChange={this.onNewSearchPattern}/>
          </Col>

          <Col className="col">
            <Filters onFilterChange={this.handleNewFilter} />
          </Col>
        </Row>
      </div>
    )

    return (
      <List
        header={header}
        datasource={filteredTasks}
        renderRow={ task => (
          <ListItem
              key={task.id} >

            <Row>

              <Col className="col text-muted my-auto">
                <input type="checkbox"
                  checked={task.is_complete}
                  className="checkbox-dark mr-2"
                  onChange={(e) => this.handleTaskCheck(e.target.checked, task.id)} />

                {this.getEditOrText(task)}
              </Col>



              <div className="my-auto">
                <button className="icon-button-sm box"
                  type="button"
                  onClick={ (e) => this.handleEditOrSave(task) }>
                  <i className={this.state.taskToEditId === task.id ? "fa fa-check" : "fa fa-pencil"} />
                </button>

                <button className="icon-button-sm box"
                  type="button"
                  onClick={ (e) => this.handleTaskRemove(task.id) }>
                  <i className="fa fa-trash" />
                </button>
              </div>

            </Row>
        </ListItem>
        ) }
      />
		);

  }
}

const mapStatetoProps = (state, props) => ({
  tasks: state.tasks,
  taskList: getTaskListById(state)(props.match.params.id) || {}
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStatetoProps, mapDispatchToProps)(Tasks);