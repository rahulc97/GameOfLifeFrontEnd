import React, { useState, useEffect } from 'react';
import Input from '../Components/Input/Input';
import Square from '../Components/Square/Square';

const GamePage = (props) => {
    const [cols, setCols] = useState(0);
    const [rows, setRows] = useState(0);
    const [matrix, setMatrix] = useState([]);
    const onRowChangeHandler = (event) => {
        setRows(event.target.value);
    }
    const onColChangeHandler = (event) => {
        setCols(event.target.value);
    }
    useEffect(() => {
        let arrayMatrix = [];
        for (let indexRow = 0; indexRow < rows; indexRow++) {
            for (let indexCol = 0; indexCol < cols; indexCol++) {
                // console.log(indexRow,indexCol);
                arrayMatrix = [...arrayMatrix, `${indexRow},${indexCol}`];

            }


        }
        setMatrix(arrayMatrix);
        console.log(arrayMatrix);
    }, [cols, rows]);

    let dynamicMatrix=null;
    dynamicMatrix= matrix.map(matrixElement=>{
        return  <Square key={matrixElement}/>
    })

    return (
        <React.Fragment>
            <h1>Game Of Life</h1>
            <Input type='number' label='Rows' changeHandler={onRowChangeHandler} />
            <Input type='number' label='Columns' changeHandler={onColChangeHandler} />
            {dynamicMatrix}
            {/* {rows + ' ' + cols + '' + matrix} */}
           
        </React.Fragment>);
}

export default GamePage;