# tasks-app-reactjs
Tasks Application with Reactjs, useState, useEffect and LocalStorage

Demo: [Tasks-App-Reactjs](https://tonygll.github.io/tasks-app-reactjs/)

**Source Code:**
 - App.js
``` JavaScript
import React, { useState, useEffect } from 'react';

import TaskRow from './components/TaskRow';
import TaskBanner from './components/TaskBanner';
import TaskCreator from './components/TaskCreator';
import VisibilityControl from './components/VisibilityControl';

function App() {

  // ----- USESTATES ----- //
  const [userName, setUserName] = useState('Tony');

  const [taskItems, setTaskItems] = useState([
    { name: 'Task 1', done: false },
    { name: 'Task 2', done: false },
    { name: 'Task 3', done: true },
    { name: 'Task 4', done: false }
  ]);

  const [showCompleted, setShowCompleted] = useState(true);

  // ----- USEEFFECT ----- //
  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data != null) {
      setTaskItems(JSON.parse(data))
    }else {
      setUserName('Tony Example');
      setTaskItems([
        { name: 'Task 1 Example', done: false },
        { name: 'Task 2 Example', done: false },
        { name: 'Task 3 Example', done: true },
        { name: 'Task 4 Example', done: false }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      setTaskItems([...taskItems, {
        name: taskName,
        done: false
      }]);
    }
  }

  const toggleTask = task => {
    setTaskItems(taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t)));
  }

  const taskTableRows = (doneValue) => {
    return taskItems
    .filter(task => task.done === doneValue)  
    .map(task => (
      <TaskRow task={ task } key={ task.name } toggleTask={ toggleTask } />
    ));
  }

  return (
    <div className="App">
      <TaskBanner userName={ userName } taskItems={ taskItems } />
      <TaskCreator callback={ createNewTask } />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          { taskTableRows(false) }
        </tbody>
      </table>
      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl 
          description="Completed Tasks"
          isChecked={ showCompleted }
          callback={ checked => setShowCompleted(checked) }
        />
      </div>
      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              { taskTableRows(true) }
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
```
 - /components/TaskBanner.js
 ``` Javascript
import React from 'react';

function TaskBanner(props) {
    return (
        <h4 className="bg-primary text-white text-center p-4">
            { props.userName }'s Task App ({ props.taskItems.filter(t => !t.done).length } task to do)
        </h4>
    );
}

export default TaskBanner;
```
- components/TaskCreator.js
``` Javascript
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
```
 - /components/TaskRow.js
``` Javascript
import React from 'react';

function TaskRow(props) {
    return (
        <tr key={ props.task.name }>
            <td>{ props.task.name }</td>
            <td>
                <input 
                    type="checkbox" 
                    checked={props.task.done} 
                    onChange={ () => props.toggleTask(props.task) } />
            </td>
        </tr>
    )
};

export default TaskRow;
```
 - /components/VisibilityControl.js
``` Javascript
import React from 'react';

function VisibilityControl(props) {
    return (
        <div className="form-check">
            <input 
                type="checkbox"
                className="form-check-input"
                checked={ props.isChecked }
                onChange={ e => props.callback(e.target.checked) }
            />
            <label htmlFor="form-check-label">Show { props.description }</label>
        </div>
    );
}

export default VisibilityControl;
```
















