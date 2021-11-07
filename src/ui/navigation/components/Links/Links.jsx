import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { addList } from 'ui/todo/store';
import { NewList } from '../NewList';
import { LinkItem } from '../LinkItem';

import './Links.scss';

export const Links = () => {
  const [isAddNewList, setIsAddNewList] = useState(false);
  const lists = useSelector((store) => store.todo);
  const dispatch = useDispatch();

  const onAddList = (title) => {
    const newListTemplate = {
      title,
      removable: true,
      listId: lists.length,
      edit: false,
      oldTitle: title,
      list: {
        todo: [],
        completed: [],
      },
    };
    dispatch(addList(newListTemplate));
  };

  const newListToggle = () => {
    setIsAddNewList(!isAddNewList);
  };

  return (
    <nav className="links">
      <ul className="links__list">
        {lists.map((list) => (
          <LinkItem key={list.listId} list={list} />
        ))}
        {isAddNewList ? (
          <li>
            <NewList onAddList={onAddList} newListToggle={newListToggle} />
          </li>
        ) : (
          <li className="list-add" onClick={newListToggle}>
            <span className="list-add__plus">+</span>
            <p className="list-add__title">Add List</p>
          </li>
        )}
      </ul>
    </nav>
  );
};
