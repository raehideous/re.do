import React, { Component } from 'react';
import * as Strings from '../../constants/strings';
import { Row, Col } from 'reactstrap';

const FILTERS = {
  ALL: items => { return items },
  COMPLETED: items => items.filter( item => item.is_complete ),
  INCOMPLETED: items => items.filter( item => !item.is_complete ),
}

class Filters extends Component {
  state = {
    activeFilter: FILTERS.ALL
  }

  handleOnFilterClick = chosenFilter => {
    this.setState({
      activeFilter: chosenFilter
    });

    this.props.onFilterChange(chosenFilter);
  }

  render() {
    const { activeFilter } = this.state;
    const { ALL, COMPLETED, INCOMPLETED } = FILTERS;
    const btnClassName ="col ghost-button-thick-border ";

    return (
        <Row role="group">
          <Col sm="4">
            <button
              className={btnClassName + (activeFilter === ALL ? " active" : "")}
              type="button"
              onClick={ () => this.handleOnFilterClick(ALL) } >
              {Strings.ALL}
            </button>
          </Col>

          <Col>
            <button
              type="button"
              className={btnClassName + (activeFilter === COMPLETED ? " active" : "")}
              onClick={ () => this.handleOnFilterClick(COMPLETED) } >
              {Strings.COMPLETED}
            </button>
          </Col>

          <Col>
            <button
              type="button"
              className={btnClassName + (activeFilter === INCOMPLETED ? "active" : "")}
              onClick={ () => this.handleOnFilterClick(INCOMPLETED) } >
              {Strings.INCOMPLETED}
            </button>
          </Col>
       </Row>
    )
  }
}

export default Filters;