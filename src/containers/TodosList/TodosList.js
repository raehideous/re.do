import React, { Component } from 'react';

class TodosLists extends Component {
  constructor() {
    super();

  }

  render() {
  	return (
      <ListGroup>
  			{this.props.todoList.map( todoList => {
          return <ListGroupItem>{todoList.name}</ListGroupItem>
        })}
      </ListGroup>
  	);
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( ActionCreators, dispatch );
}

export default connect( mapStatetoProps, mapDispatchToProps )( TodosLists );