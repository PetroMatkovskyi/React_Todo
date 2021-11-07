import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Button } from 'ui/shared';
import { addTask } from '../../store/action';

import './NewTask.scss';

export const NewTask = ({ listId }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const newTask = (title, listId) => ({
    listId,
    edit: false,
    completed: false,
    title,
    id: Date.now(),
  });

  const onSubmit = ({ title }) => {
    dispatch(addTask(newTask(title, listId)));
  };

  return (
    <form className="todo__form" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="todo__new-task"
        {...register('title', { required: true })}
        placeholder="title"
      />
      <Button type="submit" isAddBtn={true}>
        Add Task
      </Button>
    </form>
  );
};
