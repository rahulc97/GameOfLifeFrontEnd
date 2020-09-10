import React from 'react';
import './Square.css'
const Square = (props) => {
    let classes='square dead';
    if(props.living){
    
        classes='square live';
    }

    return (
        <div className={classes} onClick={()=>props.clicked(props.row,props.col)} >
            {/* {props.id} */}
        </div>
   );
}
export default Square;