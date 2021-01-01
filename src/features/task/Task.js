import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../app/store';
import {
  addTask,
  toggleTask,
  importState,
} from './taskSlice';

import { TaskDetails } from './TaskDetails';
import { List } from './List';

export function Task() {

  useSelector(state => state.task);
  const tasks = useSelector(state => state.task.tasks);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState();
  const [selectedListId, setSelectedListId] = useState();


  const createTask = e => {
    if (newTask) {
      dispatch(addTask({ description: newTask, creationDate: Date.now(), list: selectedListId }));
      setNewTask('');
    }
    e.preventDefault();
  };

  const exportTasks = () => {
    const task = store.getState().task;
    const data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(task));
    const a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'task.json';
    a.click();
  };

  const importTasks = file => {
    const fileReader = new FileReader();
    fileReader.onloadend = function () { dispatch(importState(JSON.parse(fileReader.result))); };
    fileReader.readAsText(file);
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <ul className="right hi-on-med-and-down">

            <li><button className="waves-effect waves-light btn-small blue" style={{ margin: 10 + 'px' }} onClick={() => exportTasks()}>Export</button></li>
            <li><label className="waves-effect waves-light btn-small blue" style={{ margin: 10 + 'px' }}>
              <input className="hide" type="file" onChange={e => importTasks(e.target.files[0])} />
              Import</label></li>
          </ul>
        </div>
      </nav>

      <div className="row">
        <div className="col s12 m4 l3">
          <List
            selectedListId={selectedListId}
            onSelectList={setSelectedListId}
          />
        </div>

        <div className="col s12 m8 l9">
          <div className="row">
            <div className='col s6'>
              <div className="collection">
                <form className="col s12" onSubmit={e => createTask(e)}>
                  <div className="row">
                    <div className="input-field col s10">
                      <input
                        placeholder="New task"
                        id="new_task"
                        type="text"
                        className="validate"
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                      />
                    </div>
                    <div className="input-field col s2">
                      <button type="submit" className="waves-effect waves-light btn-small"><i className="material-icons">add</i></button>
                    </div>
                  </div>
                </form>
                <div>
                  {Object.values(tasks)
                    .filter(task => !selectedListId || task.list === selectedListId)
                    .map((task, index) => <div key={index}
                      className="collection-item row"
                      onClick={() => setSelectedTaskId(task.id)}>

                      <div className="col s2 grey-text">#{task.id}</div>
                      <div className="col s7">{task.description}</div>

                      <label className='col s3'>
                        <input type="checkbox" onClick={() => dispatch(toggleTask({ id: task.id, date: Date.now() }))} />
                        <span>Done</span>
                      </label>

                    </div>)}
                </div>
              </div>
            </div>
            <div className='col s6'>
              <div>{selectedTaskId && <TaskDetails taskId={selectedTaskId} />}</div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
