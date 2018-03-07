import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import TaskLists from '../TaskLists';
import { history } from '../../store'
import Tasks from '../Tasks';
import './styles.css';

class App extends Component {
  render() {
    return (
      <div className="AppContainer">
        <header className="App-header">
          <h1 className="App-title">Welcome to Re.do lists</h1>
        </header>

        <div className="container col-md-6 .offset-md-3">
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/" component={TaskLists} />
              <Route path="/list/:id" component={Tasks} />
            </Switch>
          </ConnectedRouter>
        </div>

      </div>
    );
  }
}

export default App;
