import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import * as Strings from '../../constants/strings';

class CreateForm extends Component {
  constructor() {
    super();

    this.state = {
      inputText: "",
    }
  }

  handleChange = prop => evt => {
    this.setState( { inputText: evt.target.value } );
  }

  handleOnCreate = () => {
    this.props.onCreate(this.state.inputText);
    this.setState( { inputText: "" } );
  }

  catchReturn = (evt) => {
    if ( evt.key === 'Enter' ) {
      this.handleOnCreate();
      evt.preventDefault();
    }
  }


  render() {
    return (
        <div className="row">
          <div className="col-sm-10">
            <input
              type="text"
              className="text-input-dark"
              placeholder={this.props.placeholder}
              value={ this.state.inputText }
              onChange={ this.handleChange( 'inputText') }
              onKeyPress={ this.catchReturn }/>
          </div>

          <div className="col-sm-2">
            <button className="ghost-button-thick-border col"
              onClick={this.handleOnCreate}>
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

export default connect( mapStateToProps, mapDispatchToProps )( CreateForm );
