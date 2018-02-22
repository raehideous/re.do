import React, { Component } from 'react';
import { Button, ButtonGroup, Input, InputGroup } from 'reactstrap';

class Footer extends Component {

  render() {
    return (
      <InputGroup  className="mt-3">

        <ButtonGroup>
         <Button outline color="success">All</Button>{' '}
         <Button outline color="success">Complete</Button>{' '}
         <Button outline color="success">Incomplete</Button>
       </ButtonGroup>

       <Input
         placeholder="Search..."
       />
      </InputGroup>
    )
  }
}

export default Footer;