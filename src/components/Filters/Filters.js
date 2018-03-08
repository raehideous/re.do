import React, { Component } from 'react';
import * as Strings from '../../constants/strings';

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
    const { onFilterChange } = this.props;
    const { activeFilter } = this.state;
    const { ALL, COMPLETED, INCOMPLETED } = FILTERS;
    const btnClassName ="col ghost-button-thick-border ";

    return (
        <div className="row" role="group">
          <div className="col-sm-4">
            <button
              className={btnClassName + (activeFilter === ALL ? " active" : "")}
              type="button"
              onClick={ () => this.handleOnFilterClick(ALL) } >
              {Strings.ALL}
            </button>
          </div>

          <div className="col">
            <button
              type="button"
              className={btnClassName + (activeFilter === COMPLETED ? " active" : "")}
              onClick={ () => this.handleOnFilterClick(COMPLETED) } >
              {Strings.COMPLETED}
            </button>
          </div>

          <div className="col">
            <button
              type="button"
              className={btnClassName + (activeFilter === INCOMPLETED ? "active" : "")}
              onClick={ () => this.handleOnFilterClick(INCOMPLETED) } >
              {Strings.INCOMPLETED}
            </button>
          </div>
       </div>
    )
  }
}

export default Filters;