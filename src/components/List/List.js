import React from 'react';
import './styles.css';
import { ListGroup } from 'reactstrap';

const List = ( {header, datasource, renderRow} ) => {
  return (
    <div >
      <div>
        {header}
      </div>

      <ListGroup className="list-dark">
          {datasource.map( item => renderRow(item) )}
      </ListGroup>

    </div>
  )
}

export default List;