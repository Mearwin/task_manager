import React from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import {
  deleteTask,
} from './taskSlice';

export function TaskDetails({ taskId }) {

  const task = useSelector(state => state.task.tasks[taskId]);
  const list = useSelector(state => state.list.lists[task.list]);
  const dispatch = useDispatch();

  if (!task) return 'empty';

  return (
    <div className="card">
      <div className="card-content">
        <div>
          <span data-badge-caption={task.doneOn ? 'Done' : 'Todo'} className={task.doneOn ? 'new badge blue' : 'new badge red'} />

          <span className="left grey-text">task#{task.id}</span>
        </div>
        <div>
          <span><h5>{task.description}</h5></span>
        </div>
        <div>Creation date:&nbsp;{new Date(task.creationDate).toLocaleString()}</div>
        <div>{list && list.name}</div>
      </div>

      <div className="card-action">
        <span className="left-align"><a className="waves-effect waves-light btn-small red" onClick={() => dispatch(deleteTask({ id: task.id }))}>Delete</a></span>
        {/* <span className="right"><a className="waves-effect waves-light btn-small blue" onClick={() => dispatch()}>Save</a></span> */}
      </div>

    </div>
  );
}

TaskDetails.propTypes = {
  taskId: PropTypes.number,
  onDelete: PropTypes.func,
};