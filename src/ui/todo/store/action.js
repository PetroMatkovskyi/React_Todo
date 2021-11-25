import * as types from './types';

export const getTodo = () => {
  return async (dispacth) => {
    const completed = [];
    const todo = [];
    const response = await fetch(`${process.env.REACT_APP_API_URL}/todos?_limit=5`);
    const json = await response.json();
    json.forEach((item) => {
      item.edit = false;
      item.listId = 1;
      item.completed ? completed.push(item) : todo.push(item);
    });

    dispacth({ type: types.GET_TODO, payload: { todo, completed } });
  };
};

export const completedToggle = (todo) => ({
  type: types.COMPLETED_TOGGLE,
  payload: todo,
});

export const removeTask = (task) => ({ type: types.REMOVE_TASK, payload: task });

export const editToggle = (id) => ({ type: types.EDIT_TASK_TOGGLE, payload: id });

export const changeTitle = (info) => ({ type: types.CHANGE_TASK_TITLE, payload: info });

export const addTask = (task) => ({ type: types.ADD_TASK, payload: task });

export const addList = (list) => ({ type: types.ADD_LIST, payload: list });

export const removeList = (listId) => ({ type: types.REMOVE_LIST, payload: listId });

export const editListToggle = (listId) => ({
  type: types.EDIT_LIST_TOGGLE,
  payload: listId,
});

export const changeListName = (newName) => ({
  type: types.CHANGE_LIST_NAME,
  payload: newName,
});

export const dropInTodo = (item) => ({
  type: types.DROP_IN_TODO,
  payload: item,
});

export const dropInCompleted = (item) => ({
  type: types.DROP_IN_COMPLETED,
  payload: item,
});

export const sortable = (todo, hoverIndex) => ({
  type: types.SORTABLE,
  payload: { todo, hoverIndex },
});
