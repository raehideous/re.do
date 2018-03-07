import React from 'react';
import './styles.css';


const List = ( {header, datasource, renderRow} ) => {
  return (
    <div >
      <div>
        {header}
      </div>

      <ul className="container list-dark">
          {datasource.map( item => renderRow(item) )}
      </ul>

    </div>
  )
}

export default List;