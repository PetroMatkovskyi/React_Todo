import { combineReducers } from 'redux';
import { todoReducer } from '../../ui/todo/store';

export const rootReducer = combineReducers({
  todo: todoReducer,
});
