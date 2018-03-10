import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Strings from '../../constants/strings';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { getTaskList } from '../../actions/taskLists-actions'
import './styles.css'
import { Row, Col } from 'reactstrap';
import { List, ListItem, RoundButton, Search, Filters} from '../../components';


import CreateForm from '../../components/CreateForm';

class Tasks extends Component {
  state = {
    searchPattern: '',
    activeFilter: items => items,
    editedListName: '',
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

  handleTaskCreate = taskName => {
    const newTask = {
      "name": taskName,
      "is_complete": false,
      "todo_list": this.props.match.params.id
    }
    this.props.createTask(newTask);
  }

  handleUpdateTaskName = (taskId, newTaskName)  => {
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
      name: this.state.editedListName
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
    if (!this.props.taskLists) {
      this.props.fetchTaskLists();
    }
    if(this.props.taskList){
      this.setState({
        editedListName: this.props.taskList.name
      });
    }
    this.props.fetchTasks(chosenListID);
  }

  componentWillReceiveProps = nextProps => {
    if(nextProps.taskList && !this.props.taskList) {
      this.setState({
        editedListName: nextProps.taskList.name
      });
    }
  }

  onListNameChange = e => {
    this.setState({
      editedListName: e.target.value
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
    const { editedListName } = this.state;
    const data = tasks.data || [];
    const filteredTasks = this.state.activeFilter(data.filter( task => task.name.toLowerCase().search(this.state.searchPattern) > -1 ));

    const header = (
      <div >
        <Row>
          <Col sm="2">
              <RoundButton icon="chevron-left" onClick={this.handleOnBack} />
          </Col>

          <Col>
            <input type="text" className="text-input-dark col"
                 value={editedListName}
                 onChange={this.onListNameChange}
                 placeholder={Strings.LIST_NAME}
            />
          </Col>

          <Col sm="2" className="text-right">
            <RoundButton
              icon="check"
              disabled={!editedListName || editedListName === taskList.name}
              onClick={this.handleUpdateListName} />
          </Col>
        </Row>

        <Row className="mt-3">
          <CreateForm
            placeholder={Strings.CREATE_TASK}
            onCreate={this.handleTaskCreate}/>
        </Row>
        <hr />

        <Row>
          <Col sm="6">
            <Search onTextChange={this.onNewSearchPattern}/>
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

const mapStateToProps = (state, props) => ({
  tasks: state.tasks,
  taskList: getTaskList(state)(props.match.params.id)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);