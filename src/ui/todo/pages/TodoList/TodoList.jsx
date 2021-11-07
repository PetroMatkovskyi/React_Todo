import { useSelector } from 'react-redux';
import { List } from '@mui/material';

import { TodoItem } from '../../components/TodoItem';
import { NewTask } from '../../components/NewTask';

import './TodoList.scss';

export const TodoList = ({ numList }) => {
  const list = useSelector((store) => store.todo[numList]);

  return (
    <div className="todo body">
      <h2 className="todo__header">{list.title}</h2>
      <List className="todo__todo list">
        {list.list.todo?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
      <List className="todo__completed list">
        {list.list.completed?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
      <NewTask listId={numList} />
    </div>
  );
};
