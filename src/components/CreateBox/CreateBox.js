import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import * as Strings from '../../constants/strings';

class CreateBox extends Component {
  constructor() {
    super();

    this.state = {
      inputText: "",
      placeholder: ""
    }
  }

  handleChange = prop => evt => {
    this.setState( { [prop]: evt.target.value } );
  }

  createNewTaskWithName(taskName) {
    const destinationList = this.props.taskLists.find( el => el.id === this.props.chosenList.id);
    const newTask = {
      "id": destinationList.todos_count,
      "name": taskName,
      "is_complete": false,
      "todo_list": destinationList.id
    };
    this.props.addTask(newTask);
    this.props.incTaskCountForListWithId(this.props.chosenList.id);
  }

  createNewListWithName(listName) {
    const newList = {
      "id": this.props.taskLists.length,
      "name": listName,
      "todos_count": 0
    };
    this.props.addTaskList(newList);
  }

  handleClickCreate = () => {
    if(this.state.inputText) {
      if(this.props.chosenList) {
        this.createNewTaskWithName(this.state.inputText);
      } else {
        this.createNewListWithName(this.state.inputText);
      }
      this.setState( {
        inputText: ''
      } );
    }
  }

  catchReturn = (evt) => {
    if ( evt.key === 'Enter' ) {
      this.handleClickCreate();
      evt.preventDefault();
    }
  }

  loadPlaceholder(chosenList) {
    let placeholder = '';
    chosenList || chosenList === 0 ? placeholder = Strings.CREATE_TASK : placeholder = Strings.CREATE_LIST;

    this.setState({
      placeholder: placeholder
    });
  }


  componentDidMount() {
    this.loadPlaceholder(this.props.chosenList);
  }

  componentWillReceiveProps(nextProps, prevProps) {
    this.loadPlaceholder(nextProps.chosenList);
  }


  render() {
    return (
        <div className="row">
          <div className="col-md-10">
            <input
              type="text"
              className="text-input-dark"
              placeholder={this.state.placeholder}
              value={ this.state.inputText }
              onChange={ this.handleChange( 'inputText') }
              onKeyPress={ this.catchReturn }/>
          </div>

          <div className="col-md-2">
            <button className="ghost-button-thick-border col"
              onClick={ this.handleClickCreate }>
              {Strings.CREATE}
            </button>
          </div>
        </div>
    )
  }

}


const mapStateToProps = state => {
  return {
    taskLists: state.taskLists
  };
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps )( CreateBox );
