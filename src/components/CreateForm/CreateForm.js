import React, { Component } from 'react';
import * as Strings from '../../constants/strings';
import { Row, Container, Col } from "reactstrap";
import TextInput from '../TextInput';

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



  render() {
    return (
      <Container >
        <Row>
          <Col sm="9">
            <input
              type="text"
              className="text-input-dark"
              placeholder={this.props.placeholder}
              value={ this.state.inputText }
              onChange={ this.handleChange( 'inputText') }
              onKeyPress={ this.catchReturn }/>
          </Col>

          <Col sm="3">
            <button className="ghost-button-thick-border col"
              onClick={this.handleOnCreate}>
              {Strings.CREATE}
            </button>
          </Col>
        </Row>
      </Container>
    )
  }

}

export default CreateForm;
