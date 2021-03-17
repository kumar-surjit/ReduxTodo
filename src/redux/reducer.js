import actionTypes from './actionTypes';

const initialState = {
  tasks: [],
};

export default function (state = initialState, action) {
  // console.log(action.payload);
  switch (action.type) {
    case actionTypes.ADD_TASK: {
      const {title, description, id, status} = action.payload;
      // console.log('inside reducer');
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {id, title: title, description: description, status},
        ],
      };
    }
    case actionTypes.DELETE_TASK: {
      const {id} = action.payload;
      console.log('deleted task');
      let updatedTasks = state.tasks.filter(task => task.id !== id);
      return {
        ...state,
        tasks: updatedTasks,
      };
    }
    case actionTypes.EDIT_TASK: {
      const {id, title, description, status} = action.payload;
      console.log('payload:', action.payload);
      state.tasks.forEach((currTask, index) => {
        if (currTask.id === id) {
          state.tasks[index] = {id, title, description, status};
        }
      });
      return {
        ...state,
      };
    }
    default:
      return {...state};
  }
}
