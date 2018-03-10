import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import TaskLists from '../TaskLists';
import { history } from '../../store'
import Tasks from '../Tasks';
import { Container, Col } from 'reactstrap';
import './styles.css';

class App extends Component {
  render() {
    return (
      <div className="AppContainer">
        <header className="App-header">
          <h1 className="App-title">Welcome to Re.do lists</h1>
        </header>

        <Container className="mt-3">
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" component={TaskLists} />
                <Route path="/list/:id" component={Tasks} />
              </Switch>
            </ConnectedRouter>
          </Col>
        </Container>

      </div>
    );
  }
}

export default App;