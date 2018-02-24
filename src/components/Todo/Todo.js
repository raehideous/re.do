import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import ItemsList from '../ItemsList';
import * as Strings from '../../constants/strings';
import { Button } from 'reactstrap';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerText: '',
      listItems: [],
      backButton: null
    }
  }

  loadNewListWithHeader(props) {
    let chosenList = props.chosenList;

    let headerText = Strings.AVAILABLE_LISTS;
    let listItems = props.taskLists;
    let backButton = null; //Null value will cause render method to render nothing

    if (chosenList) {
      headerText = Strings.TASKS_FOR_LIST + chosenList.name
      listItems = props.tasks.filter( task => task.todo_list === chosenList.id);
      backButton = (
        <Button outline color="danger"
          className="ml-2"
          onClick={ () => {props.chooseTaskList(null)} }>
          {Strings.BACK}
        </Button>
      )
    }

    this.setState({
      headerText: headerText,
      listItems: listItems,
      backButton: backButton
    });
  }

  onListItemClick = item => {
    if(!this.props.chosenList) {
      this.props.chooseTaskList(item);
    }
  }

  componentDidMount() {
    this.loadNewListWithHeader(this.props);
  }

  componentWillReceiveProps(nextProps, prevProps) {
    this.loadNewListWithHeader(nextProps);
  }


  render() {
    return (
      <div className="mt-3">
        <div className="row ml-3 mb-2">
          <h2 className="text-muted">{this.state.headerText}</h2>
          {this.state.backButton}
        </div>
        <ItemsList listItems={this.state.listItems} onListItemClick={this.onListItemClick} className="mt-3" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    taskLists: state.taskLists
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Todo);
