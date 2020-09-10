import React from 'react';
import './Input.css'
const Input = (props) => {
    return (
        <div className='container'>
            <label className='label'>{props.label}: </label>
            <input className='input' type={props.type} placeholder={props.label} onChange={props.changeHandler}/>
        </div>
    )
}

export default Input;