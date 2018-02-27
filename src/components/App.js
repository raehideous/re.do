import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Todo from './Todo';

class App extends Component {
  render() {

    return (
      <div className="AppContainer">
        <header className="App-header">
          <h1 className="App-title">Welcome to Re.do lists</h1>
        </header>
          <div className="container">
            <Todo chosenList={this.props.chosenList}/>
          </div>
      </div>
    );
  }
}


const mapStatetoProps = state => {
  return {
    chosenList: state.chosenList
  }
}

export default connect(mapStatetoProps, null)(App);
