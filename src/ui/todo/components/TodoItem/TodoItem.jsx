import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { completedToggle, editToggle, removeTask, sortable } from '../../store/action';
import { EditItem } from '../EditItem/EditItem';
import { COMPLETED_ITEM, TODO_ITEM } from '../../dnd/types';

import './TodoItem.scss';

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
      item: { todo, index },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    }),
    []
  );

  const [{ isOver }, drop] = useDrop({
    accept: todo.completed ? COMPLETED_ITEM : TODO_ITEM,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

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
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(sortable(item.todo, dragIndex, hoverIndex));

      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.4 : 1;
  const background = isOver ? 'rgb(188,251,255)' : '';
  drag(drop(ref));

  return (
    <ListItem
      ref={ref}
      onDoubleClick={onEditToggle}
      className="todo__list-item"
      style={{ opacity, background }}
    >
      <div className="todo__check">
        <Checkbox
          id={todo.id + ''}
          onChange={onChange}
          className="todo__input"
          type="checkbox"
          checked={todo.completed}
        />
        <EditItem todo={todo} index={index} />
      </div>
      <IconButton edge="end" aria-label="delete" onClick={onRemove}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
