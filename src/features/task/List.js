import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import {
  addList,
} from './listSlice';

const colors = ['blue', 'blue darken-2', 'red', 'red darken-2', 'green', 'green darken-2', 'yellow', 'yellow darken-2', 'grey', 'grey darken-2', 'lime', 'lime darken-2'];

export function List({ selectedListId, onSelectList }) {

  useSelector(state => state.task);
  const lists = useSelector(state => state.list.lists);
  const dispatch = useDispatch();
  const [newList, setNewList] = useState('');

  const createList = e => {
    if (newList) {
      dispatch(addList({ name: newList, creationDate: Date.now(), color: randomColor() }));
      setNewList('');
    }
    e.preventDefault();
  };

  const randomColor = () => {
    return colors[Math.floor([Math.random() * colors.length])];
  };

  return (
    <>
      <div className="collection">
        <div
          className={!selectedListId ? 'collection-item' : 'collection-item hoverable'}
          onClick={() => onSelectList(null)}
        >All</div>
        {Object.values(lists).map((list, index) =>
          <div key={index}
            className={list.id === selectedListId ? 'collection-item ' + list.color : 'collection-item hoverable ' + list.color}
            onClick={() => onSelectList(list.id)}
          >
            <span>{list.name}</span>
          </div>)}
        <div className="collection-item">
          <form className="col s12" onSubmit={e => createList(e)}>
            <div className="row">
              <div className="input-field col s8">
                <input
                  placeholder="New list"
                  id="new_list"
                  type="text"
                  className="validate"
                  value={newList}
                  onChange={e => setNewList(e.target.value)}
                />
              </div>
              <div className="input-field col s4">
                <button type="submit" className="waves-effect waves-light btn-small"><i className="material-icons">add</i></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

List.propTypes = {
  selectedListId: PropTypes.number,
  onSelectList: PropTypes.func,
};