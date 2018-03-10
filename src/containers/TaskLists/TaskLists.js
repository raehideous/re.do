import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Strings from '../../constants/strings';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { Row, Col, Badge, CheckBox, Button } from 'reactstrap';
import Search from '../../components/Search';
import CreateForm from '../../components/CreateForm';
import ListItem from '../../components/ListItem';
import List from '../../components/List';


class TaskLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchPattern: ''
    };
  }

  onNewSearchPattern = evt => {
    this.setState({searchPattern: evt.target.value.toLowerCase()})
  }

  handleListOpen = listId => {
    this.props.history.push("/list/" + listId);
  }

  handleOnCreate = listName => {
    this.props.createTaskList(listName);
  }

  handleListRemove = listId => {
    this.props.deleteTaskList(listId);
  }

  componentDidMount() {
    this.props.fetchTaskLists();
  }

  render() {
    const data = this.props.taskLists.data || [];
    const filteredTaskLists = data.filter( list => list.name.toLowerCase().search(this.state.searchPattern) > -1 );


		return (
      <List
        header={
          <div className="mt-3">
              <h2 className="text-muted">{Strings.AVAILABLE_LISTS}</h2>
              <Row className="mt-3">
                <CreateForm
                  placeholder={Strings.CREATE_LIST}
                  onCreate={this.handleOnCreate}/>
              </Row>
              <hr />
              <Search  onTextChange={this.onNewSearchPattern}/>
          </div>
        }

        datasource={filteredTaskLists}
        renderRow={ taskList => (
          <ListItem
            key={taskList.id}>
            <Row>
              <Col className="text-muted my-auto">
                  <span>
                    {taskList.name}
                  </span>
              </Col>


              <div className="my-auto">
                <Badge className="badge-dark box">
                  {taskList.todos_count}
                </Badge>

                <button className="icon-button-sm box"
                  type="button"
                  onClick={ (e) => this.handleListOpen(taskList.id) }>
                  <i className={"fa fa-edit"} />
                </button>

                <button className="icon-button-sm box"
                  type="button"
                  onClick={ (e) => this.handleListRemove(taskList.id) }>
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

const mapStatetoProps = state => ({
  taskLists: state.taskLists
});


const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStatetoProps, mapDispatchToProps)(TaskLists);