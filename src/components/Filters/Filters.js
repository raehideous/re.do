import React from 'react';
import * as Strings from '../../constants/strings';

const FILTERS = {
  ALL: items => { return items },
  COMPLETED: items => items.filter( item => item.is_complete ),
  INCOMPLETED: items => items.filter( item => !item.is_complete ),
}

export const Filters = ({ onFilterChange }) => {


  return (
    <div className="container">
      <div className="row" role="group">
       <button
         className={"ghost-button-thick-border col mr-2"}
         onClick={ () => onFilterChange(FILTERS.ALL) } >
         {Strings.ALL}
       </button>

       <button
         className={"ghost-button-thick-border col mr-2"}
         onClick={ () => onFilterChange(FILTERS.COMPLETED) } >
         {Strings.COMPLETED}
       </button>

       <button
         type="button"
         className={"ghost-button-thick-border col"}
         onClick={ () => onFilterChange(FILTERS.INCOMPLETED) } >
         {Strings.INCOMPLETED}
       </button>
     </div>
    </div>

  )
}


export default Filters;