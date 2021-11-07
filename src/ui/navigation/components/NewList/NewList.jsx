import { useForm } from 'react-hook-form';

import { Button } from 'ui/shared';

import './NewList.scss';

export const NewList = ({ onAddList, placeholder, newListToggle }) => {
  const { register, handleSubmit } = useForm();

  const onAddNewList = ({ title }) => {
    onAddList(title);
    newListToggle();
  };

  return (
    <form className="links__form" onSubmit={handleSubmit(onAddNewList)}>
      <input
        className="links__new-task"
        placeholder={placeholder}
        {...register('title', { required: true, onBlur: newListToggle })}
        autoFocus
      />
      <Button type="submit" isListBtn={true}>
        +
      </Button>
    </form>
  );
};
