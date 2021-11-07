import { changeListName } from 'ui/todo/store';

export const EditLinkTitle = ({ list, onEditList, dispatch }) => {
  const onChangeListName = (e) => {
    dispatch(changeListName({ newTitle: e.target.value, listId: list.listId }));
  };
  return (
    <form className="links__edit-form" onSubmit={onEditList}>
      <input
        className="links__edit-name"
        type="text"
        onChange={onChangeListName}
        value={list.title}
        onBlur={onEditList}
        autoFocus
      />
    </form>
  );
};
