import { useDispatch } from 'react-redux';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { completedToggle, editToggle, removeTask } from '../../store/action';
import { EditItem } from '../EditItem/EditItem';

import './TodoItem.scss';

export const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const onChange = () => {
    dispatch(completedToggle(todo));
  };
  const onRemove = () => {
    dispatch(removeTask(todo));
  };

  const onEditToggle = () => {
    dispatch(editToggle(todo));
  };

  return (
    <ListItem onDoubleClick={onEditToggle} className="todo__list-item">
      <div className="todo__check">
        <Checkbox
          id={todo.id + ''}
          onChange={onChange}
          className="todo__input"
          type="checkbox"
          checked={todo.completed}
        />
        <EditItem todo={todo} />
      </div>
      <IconButton edge="end" aria-label="delete" onClick={onRemove}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
