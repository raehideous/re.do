import React, { Component } from 'react';
import { Button, ButtonGroup, Input, InputGroup } from 'reactstrap';

class Footer extends Component {

  render() {
    return (
      <InputGroup  className="mt-3">

       <Input
         placeholder="Search..."
         className="input-dark"
       />

       <ButtonGroup >
        <Button outline color="danger">All</Button>{' '}
        <Button outline color="danger">Complete</Button>{' '}
        <Button outline color="danger">Incomplete</Button>
      </ButtonGroup>

      </InputGroup>
    )
  }
}

export default Footer;