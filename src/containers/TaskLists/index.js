import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../css/list.css';
import * as Strings from '../../constants/strings';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import Search from '../../components/Search';
import CreateForm from '../../components/CreateForm';

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

  handleOpenList(list) {
    this.props.history.push("/list/" + list.id);
  }

  handleOnCreate = listName => {
    this.props.createTaskList(listName);
  }

  handleListRemove(list) {
    this.props.deleteTaskList(list.id);
  }

  handleListModify(list) {
    this.setState({
      currModifiedItemId: list.id
    });
  }

  toggleEdit(task) {

  }

  componentDidMount() {
    this.props.fetchTaskLists();
  }


  render() {
    const data = this.props.taskLists.data || [];
    console.log(this.props.taskLists)
    const filteredTaskLists = data.filter( list => list.name.toLowerCase().search(this.state.searchPattern) > -1 );


		return (
      <div className="mt-2">
        <div className="container">

          <div className="row">
            <div className="ml-3">
              <h3 className="text-muted">{Strings.AVAILABLE_LISTS}</h3>
            </div>
          </div>

          <CreateForm
            placeholder={Strings.CREATE_LIST}
            onCreate={this.handleOnCreate}/>
          <hr />
          <Search onTextChange={this.onNewSearchPattern}/>

          <ul className="container list-dark">
            {filteredTaskLists.map( list => {
              return (
                <li className="row list-item-dark"
                  key={list.id}
                   >

                  <div className="col my-auto">
                    <div className="text-muted" >
                      {list.name}

                    </div>
                  </div>


                  <div className="my-auto">
                    <span className="badge app-badge badge-pill box">{list.todos_count}</span>

                    <button className="icon-button-sm box"
                      onClick={ (e) => this.handleOpenList(list) }>
                      <i className="fa fa-edit" />
                    </button>

                    <button className="icon-button-sm box"
                      onClick={ (e) => this.handleListRemove(list) }>
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

const mapStatetoProps = state => ({
  taskLists: state.taskLists
});


const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStatetoProps, mapDispatchToProps)(TaskLists);