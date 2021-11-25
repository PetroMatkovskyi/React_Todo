import { useDispatch, useSelector } from 'react-redux';
import { List } from '@mui/material';
import { useDrop } from 'react-dnd';

import { TodoItem } from '../../components/TodoItem';
import { NewTask } from '../../components/NewTask';
import { COMPLETED_ITEM, TODO_ITEM } from '../../dnd/types';
import { dropInCompleted, dropInTodo } from '../../store/action';

import './TodoList.scss';

export const TodoList = ({ numList }) => {
  const list = useSelector((store) => store.todo[numList]);
  const dispatch = useDispatch();

  // const moveTodosHandler = (dragIndex, hoverIndex) => {
  //   const dragItem = items[dragIndex];

  //   if (dragItem) {
  //     setItems(prevSta);
  //   }
  // };

  const [{ isOverTodo }, dropTodo] = useDrop({
    accept: COMPLETED_ITEM,
    drop: (item) => dispatch(dropInTodo(item)),
    collect: (monitor) => ({
      isOverTodo: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // const [, drop] = useDrop({
  //   accept: TODO_ITEM,
  //   hover(item, monitor) {
  //     if (!ref.current) {
  //       return;
  //     }
  //   },
  // });

  const [{ isOverCompleted }, dropCompleted] = useDrop({
    accept: TODO_ITEM,
    drop: (item) => dispatch(dropInCompleted(item)),
    collect: (monitor) => ({
      isOverCompleted: !!monitor.isOver(),
    }),
  });

  const rend = () => {
    console.log('render');
  };

  return (
    <div className="todo body">
      {rend()}

      <h2 className="todo__header">{list.title}</h2>
      <List ref={dropTodo} className="todo__todo list">
        {list.list.todo?.map((todo, index) => (
          <TodoItem key={todo.id} todo={todo} index={index} />
        ))}
      </List>
      <List ref={dropCompleted} className="todo__completed list">
        {list.list.completed?.map((todo, index) => (
          <TodoItem key={todo.id} todo={todo} index={index} />
        ))}
      </List>
      <NewTask listId={numList} />
    </div>
  );
};
