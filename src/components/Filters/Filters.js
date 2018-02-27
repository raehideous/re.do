import React, { Component } from 'react';
import * as Strings from '../../constants/strings';

const FILTERS = {
  ALL: items => { return items },
  COMPLETED: items => items.filter( item => item.is_complete ),
  INCOMPLETED: items => items.filter( item => !item.is_complete ),
}

class Footer extends Component {
  state = {
    activeBtn: 0
  };

  filterAll(items) {
    return items;
  }

  handleChange = evt => {
    this.props.updateFilterText(evt.target.value.toLowerCase());
  }

  handleClick = (buttonNum, filter) => {
    this.setState({
      activeBtn: buttonNum
    });
    this.props.updateActiveFilter(filter);
  }

  componentWillReceiveProps(nextProps) {
    //User interactions with back button and list chose should result in filters reset.
    if(this.props.disabled !== nextProps.disabled) {
      this.props.updateFilterText("");
      this.props.updateActiveFilter(FILTERS.ALL);
      this.refs.patternInput.value = "";
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col">
        <input type="text" className="text-input-dark" placeholder={Strings.SEARCH} ref="patternInput" onChange={ this.handleChange } />
        </div>

       <div className="btn-group col" role="group">
        <button
          className={"ghost-button-thick-border col mr-2 " + (this.state.activeBtn === 0 ? "active" : "")}
          disabled={this.props.disabled}
          onClick={ () => this.handleClick(0, FILTERS.ALL) } >
          All
        </button>

        <button
          className={"ghost-button-thick-border col mr-2 " + (this.state.activeBtn === 1 ? "active" : "")}
          disabled={this.props.disabled}

          onClick={ () => this.handleClick(1, FILTERS.COMPLETED) } >
          Completed
        </button>

        <button
          type="button"
          className={"ghost-button-thick-border col " + (this.state.activeBtn === 2 ? "active" : "")}
          disabled={this.props.disabled}

          onClick={ () => this.handleClick(2, FILTERS.INCOMPLETED) } >
          Incompleted
        </button>

       </div>


      </div>
    )
  }
}

export default Footer;