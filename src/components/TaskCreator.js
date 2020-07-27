import React, { useState } from 'react';


function TaskCreator(props) {

    const [newTaskName, setNewTaskName] = useState('');

    const updateNewTaskValue = e => {
        setNewTaskName(e.target.value);
    }
    
    
    const createNewTask = () => {
        props.callback(newTaskName)
        setNewTaskName('');
    }
    
    const keyPress = (e) => {
        if (e.key === "Enter") {
            createNewTask();
        }
    }

    return (
        <div className="m-4 row">
            <input 
                type="text"
                className="form-control p-1 col-6"
                value={ newTaskName }
                onChange={ updateNewTaskValue }
                onKeyPress={ keyPress }
            />
            <button 
                className="btn btn-primary p-1 ml-2 col-2 col-md-1"
                onClick= { createNewTask }
            >Add Task</button>
        </div>
    );
}

export default TaskCreator;