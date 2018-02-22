import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Todo from './Todo';
import CreateBox from './CreateBox';
import Filters from './Filters';

class App extends Component {
  render() {
    return (
      <div className="AppContainer">
        <header className="App-header">
          <h1 className="App-title">Welcome to Re.do lists</h1>
        </header>
          <div className="container vert-offset-top-2 mt-3">
            <CreateBox chosenListId={this.props.chosenListId}/>
            <Todo chosenListId={this.props.chosenList}/>
            <Filters />
          </div>
      </div>
    );
  }
}


const mapStatetoProps = state => {
  return {
    chosenListId: state.chosenListId
  }
}

export default connect(mapStatetoProps, null)(App);
