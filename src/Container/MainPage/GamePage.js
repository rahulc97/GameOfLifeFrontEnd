import React, { useState, useEffect, useCallback,  useRef } from 'react';
import Input from '../../Components/Input/Input';
import Square from '../../Components/Square/Square';
import './GamePage.css'
import Button from '../../Components/Button/Button';
import {getNextGeneration} from '../../Logic/GameOFLifeLogic';

const GamePage = (props) => {
    const [cols, setCols] = useState(0);
    const [rows, setRows] = useState(0);
    const [btnClicked,setBtnClicked]=useState(false);
    // const [matrix, setMatrix] = useState([]);
    const [lifeStatus, setLifeStatus] = useState([]);
    // const [intervalId,setIntervalId]=useState([]);
    // const [status,setStatus]=useState(false);
    let intervalId=useRef([]);
    useEffect(() => {
        let rowList = [];
        for (let indexRow = 0; indexRow < rows; indexRow++) {
            let colList = [];
            for (let indexCol = 0; indexCol < cols; indexCol++) {
                colList = [...colList, false];
            }
            rowList = [...rowList, colList];
        }
        setLifeStatus(rowList)

        // console.log('[fromuseeffect]',rowList);



    },[rows,cols]);

    const callGeneration=useCallback(()=>{
        const lifeArray=lifeStatus;

        console.log('[Referenced]',lifeArray);
       const nextGen= getNextGeneration(lifeArray,rows,cols);
       setLifeStatus([...nextGen]);
   
       console.log("Worked",nextGen);
    },[lifeStatus,cols,rows]);

    useEffect(()=>{
        let interval=null;

        if(btnClicked){
             interval=setInterval(()=>{
                // const gen=callGeneration;
                callGeneration();
            },1000);
            intervalId.current=[...intervalId.current,interval]
            // setIntervalId([...intervalId,interval])
        }else{
            intervalId.current.map(interval=>{
               return clearInterval(interval);

            })
        }
        return ()=>{
            clearInterval(intervalId.current)
        }
  
    },[btnClicked,callGeneration])
  

  
    const onRowChangeHandler = (event) => {
        setRows(event.target.value);
    }
    const onColChangeHandler = (event) => {
        setCols(event.target.value);
    }
  const onClickHandler=(row,col)=>{
        // console.log(row,col);
        let updatedLife=lifeStatus;
        updatedLife[row][col]=!updatedLife[row][col];
        setLifeStatus([...updatedLife]);
  }
  const buttonClickHandler=()=>{

      setBtnClicked(!btnClicked);   
  }

    let dynamicMatrix = null;
    dynamicMatrix = lifeStatus.map((rowElement, rowIndex) => {
        return (
        
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} key={rowIndex}>
                {
                    rowElement.map((colElement, colIndex) => {
                        return(
                         
                        <Square key={`${rowIndex}${colIndex}`} living={lifeStatus[rowIndex][colIndex]} row={rowIndex} col={colIndex} clicked={onClickHandler}/> 
                        )
                    })
                }
            </div>)

    })

    return (
        <React.Fragment>
            <h1>Game Of Life</h1>
            <Input type='number' label='Rows' changeHandler={onRowChangeHandler} />
            <Input type='number' label='Columns' changeHandler={onColChangeHandler} />
            <div className='matrixDiv'>
                {dynamicMatrix}
            </div>
            {/* {console.log('[render]',lifeStatus)} */}
            {/* {rows + ' ' + cols + '' + matrix} */}

            <Button click={buttonClickHandler} label={btnClicked?'Pause':'Start'}/>

        </React.Fragment>);
}

export default GamePage;