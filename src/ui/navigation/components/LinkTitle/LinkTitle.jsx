import { Link } from 'react-router-dom';

import { Button } from 'ui/shared';
import { removeList } from 'ui/todo/store/action';

export const LinkTitle = ({ list, dispatch }) => {
  const onRemoveList = () => {
    dispatch(removeList(list.listId));
  };
  return (
    <Link className="links__item" to={`${list.title.replace(' ', '_')}${list.listId}`}>
      {list.title}
      {list.list.todo.length ? <span>{list.list.todo.length}</span> : ''}
      {list.removable && (
        <Button isRemoveBtn={true} isLinkBtn={true} onClick={onRemoveList}>
          +
        </Button>
      )}
    </Link>
  );
};
