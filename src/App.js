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
