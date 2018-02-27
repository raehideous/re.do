import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import ItemsList from '../ItemsList';
import * as Strings from '../../constants/strings';
import Filters from '../Filters';
import CreateBox from '../CreateBox';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerText: '',
      listItems: [],
      filteredListitems: [],
      filterText: '',
      activeFilter: items => items
    }
  }

  loadNewListWithHeader(props) {
    let chosenList = props.chosenList;

    let headerText = Strings.AVAILABLE_LISTS;
    let listItems = props.taskLists;

    if (chosenList) {
      headerText = chosenList.name
      listItems = props.tasks.filter( task => task.todo_list === chosenList.id);
    }

    this.setState({
      headerText: headerText,
      listItems: listItems
    });
  }

  onListItemClick = item => {
    if(!this.props.chosenList) {
      this.props.chooseTaskList(item);
    } else {
      console.log("Now task should be set as completed!");
    }
  }

  componentDidMount() {
    this.loadNewListWithHeader(this.props);
  }

  componentWillReceiveProps(nextProps, prevProps) {
    this.loadNewListWithHeader(nextProps);
  }

  onBackClick = () => {
    this.props.chooseTaskList(null);
  }

  updateFilterText = newFilterText => {
    this.setState({
      filterText: newFilterText
    });
  }

  updateActiveFilter = newFilter => {
    this.setState({
      activeFilter: newFilter
    });
  }


  render() {
    //Filter by pattern
    let filteredListitems = this.state.listItems.filter( item => item.name.toLowerCase().search(this.state.filterText) !== -1 );
    //Filter by active button;
    filteredListitems = this.props.chosenList ? this.state.activeFilter(filteredListitems) : filteredListitems;

    return (
      <div className="mt-2">
        <div className="row">

          <div className="col-md-1">
            <button className="circle-ghost-button"
              disabled={!this.props.chosenList}
              onClick={this.onBackClick}>
              <i className="fa fa-chevron-left" />
            </button>
          </div>

          <div className="col-md-11">
            <h2 className="text-muted">{this.state.headerText}</h2>
          </div>
        </div>


        <CreateBox chosenList={this.props.chosenList}/>
        <hr />
        <Filters
          updateFilterText={this.updateFilterText}
          updateActiveFilter={this.updateActiveFilter}
          disabled={!this.props.chosenList}
        />

        <ItemsList listItems={filteredListitems} onListItemClick={this.onListItemClick} />
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
