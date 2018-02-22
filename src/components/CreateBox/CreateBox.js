import React, { Component } from 'react';
import { Button, InputGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import * as Strings from '../../constants/strings';

class CreateBox extends Component {
  constructor() {
    super();
    console.log(Strings.CREATE_LIST)
    this.state = {
      inputText: "",
      placeholder: Strings.CREATE_LIST
    }
  }


  handleChange = prop => evt => {
    this.setState( { [prop]: evt.target.value } );
  }

  handleClickCreate = () => {
    if(this.state.inputText) {
      this.props.createTask( this.state.inputText );
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

  componentWillReceiveProps(nextProps, prevProps) {
    let placeholder;
    nextProps.chosenListId ? placeholder = Strings.CREATE_TASK : placeholder = Strings.CREATE_LIST;

    this.setState({
      placeholder: placeholder
    })
  }

  render() {
    console.log(this.state);
    return (
        <InputGroup>
          <Input
            placeholder={this.state.placeholder}
            value={ this.state.inputText }
            onChange={ this.handleChange( 'inputText') }
            onKeyPress={ this.catchReturn }/>
          <Button outline color="success" onClick={ this.handleClickCreate }>Create</Button>
        </InputGroup>
    )
  }

}

const mapStatetoProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect( null, mapDispatchToProps )( CreateBox );
