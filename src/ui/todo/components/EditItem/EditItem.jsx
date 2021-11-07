import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { changeTitle, editToggle } from '../../store/action';

import './EditItem.scss';

export const EditItem = ({ todo }) => {
  const dispatch = useDispatch();

  const onChangeTitle = (e) => {
    dispatch(changeTitle({ title: e.target.value, todo }));
  };

  const onEditToggle = () => {
    dispatch(editToggle(todo));
  };

  const onChangeTitleKeyUp = (e) => {
    const ENTER_KEY = 13;
    if (e.keyCode === ENTER_KEY) onEditToggle();
  };

  return todo.edit ? (
    <input
      className={cn({
        todo__onEdit: true,
        todo__onEdit_completed: todo.completed,
      })}
      onChange={onChangeTitle}
      onKeyUp={onChangeTitleKeyUp}
      onBlur={onEditToggle}
      type="text"
      value={todo.title}
      autoFocus
    />
  ) : (
    <h5
      className={cn({
        todo__title: true,
        todo__title_completed: todo.completed,
      })}
    >
      {todo.title}
    </h5>
  );
};
