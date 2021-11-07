import { useDispatch } from 'react-redux';

import { editListToggle } from 'ui/todo/store';
import { EditLinkTitle } from '../EditLinkTitle/EditLinkTitle';
import { LinkTitle } from '../LinkTitle';

import './LinkItem.scss';

export const LinkItem = ({ list }) => {
  const dispatch = useDispatch();
  const onEditList = () => {
    dispatch(editListToggle(list.listId));
  };
  return (
    <li key={list.listId} className={'links__li'} onDoubleClick={onEditList}>
      {!list.removable || !list.edit ? (
        <LinkTitle list={list} dispatch={dispatch} />
      ) : (
        <EditLinkTitle list={list} onEditList={onEditList} dispatch={dispatch} />
      )}
    </li>
  );
};
