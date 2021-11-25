import { useDispatch } from 'react-redux';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrag, useDrop } from 'react-dnd';

import { completedToggle, editToggle, removeTask, sortable } from '../../store/action';
import { EditItem } from '../EditItem/EditItem';
import { COMPLETED_ITEM, TODO_ITEM } from '../../dnd/types';

import './TodoItem.scss';
import { useRef } from 'react';

export const TodoItem = ({ todo, index }) => {
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
  //   ****   //

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: todo.completed ? COMPLETED_ITEM : TODO_ITEM,
      item: { ...todo, index },
      collect: (monitor) => {
        // console.log(monitor);
        return {
          isDragging: monitor.isDragging(),
        };
      },
    }),
    []
  );

  const [, drop] = useDrop({
    accept: todo.completed ? COMPLETED_ITEM : TODO_ITEM,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragElement = item;
      const hoverIndex = index;

      if (dragElement.index === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragElement.index < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragElement.index > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(sortable(dragElement, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <ListItem
      ref={ref}
      onDoubleClick={onEditToggle}
      className="todo__list-item"
      style={{ opacity }}
    >
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
