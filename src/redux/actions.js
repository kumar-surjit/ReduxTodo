import actionTypes from './actionTypes';
import store from './store';

let id = 0;

export const addTask = (title, description, status = 'Pending') => {
  // console.log(id);
  return store.dispatch({
    type: actionTypes.ADD_TASK,
    payload: {id: id++, title: title, description: description, status: status},
  });
};

export const deleteTask = id => {
  return store.dispatch({
    type: actionTypes.DELETE_TASK,
    payload: {id},
  });
};

export const editTask = (id, title, description, status) => {
  return store.dispatch({
    type: actionTypes.EDIT_TASK,
    payload: {id, title, description, status},
  });
};
