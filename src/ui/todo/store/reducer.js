import * as types from './types';

const initialState = [
  {
    title: 'important',
    removable: false,
    listId: 0,
    list: {
      todo: [
        {
          listId: 0,
          id: 1,
          title: 'delectus aut autemgu',
          completed: false,
          edit: true,
        },
        {
          listId: 0,
          id: 2,
          title: 'quis ut nam facilis et officia qui',
          completed: false,
          edit: false,
        },
      ],
      completed: [
        {
          listId: 0,
          id: 4,
          title: 'et porro tempora',
          completed: true,
          edit: false,
        },
      ],
    },
  },
  {
    title: 'todo list',
    removable: false,
    listId: 1,
    list: {
      todo: [],
      completed: [],
    },
  },
];

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TODO:
      return state.map((item, i) => {
        if (i === 1) {
          return {
            ...item,
            list: {
              ...item.list,
              todo: item.list.todo.concat(action.payload.todo),
              completed: item.list.completed.concat(action.payload.completed),
            },
          };
        }
        return item;
      });

    case types.COMPLETED_TOGGLE:
      return state.map((list, i) => {
        if (action.payload.listId !== i) {
          return list;
        } else {
          return {
            ...list,
            list: {
              todo: action.payload.completed
                ? state[i].list.todo.concat([
                    { ...action.payload, completed: !action.payload.completed },
                  ])
                : state[i].list.todo.filter((i) => i.id !== action.payload.id),

              completed: !action.payload.completed
                ? state[i].list.completed.concat([
                    { ...action.payload, completed: !action.payload.completed },
                  ])
                : state[i].list.completed.filter((i) => i.id !== action.payload.id),
            },
          };
        }
      });

    case types.REMOVE_TASK:
      return state.map((list, i) => {
        if (action.payload.listId !== i) {
          return list;
        } else {
          return {
            ...list,
            list: {
              todo: !action.payload.completed
                ? state[i].list.todo.filter((task) => task.id !== action.payload.id)
                : state[i].list.todo,
              completed: action.payload.completed
                ? state[i].list.completed.filter((task) => task.id !== action.payload.id)
                : state[i].list.completed,
            },
          };
        }
      });

    // case types.EDIT_TASK_TOGGLE:
    //   return state.map((list, i) => {
    //     if (action.payload.listId !== i) {
    //       return list;
    //     } else {
    //       return {
    //         ...list,
    //         list: {
    //           todo: state[i].list.todo.map((task) => {
    //             if (task.id !== action.payload.id && !task.edit) {
    //               return task;
    //             } else {
    //               return {
    //                 ...task,
    //                 title: task.title ? task.title : task.oldTitle,
    //                 edit: !task.edit,
    //                 oldTitle: task.title,
    //               };
    //             }
    //           }),
    //           completed: state[i].list.completed.map((task) => {
    //             if (task.id !== action.payload.id && !task.edit) {
    //               return task;
    //             } else {
    //               return {
    //                 ...task,
    //                 title: task.title ? task.title : task.oldTitle,
    //                 edit: !task.edit,
    //                 oldTitle: task.title,
    //               };
    //             }
    //           }),
    //         },
    //       };
    //     }
    //   });

    case types.CHANGE_TASK_TITLE:
      return state.map((list, i) => {
        if (action.payload.todo.listId !== i) {
          return list;
        } else {
          return {
            ...list,
            list: {
              todo: state[i].list.todo.map((task) => {
                if (task.id !== action.payload.todo.id) {
                  return task;
                } else {
                  return {
                    ...task,
                    title: action.payload.title,
                  };
                }
              }),
              completed: state[i].list.completed.map((task) => {
                if (task.id !== action.payload.todo.id) {
                  return task;
                } else {
                  return {
                    ...task,
                    title: action.payload.title,
                  };
                }
              }),
            },
          };
        }
      });

    case types.ADD_TASK:
      return state.map((list, i) => {
        if (action.payload.listId !== i) {
          return list;
        } else {
          return {
            ...list,
            list: {
              ...list.list,
              todo: list.list.todo.concat([action.payload]),
            },
          };
        }
      });
    case types.ADD_LIST:
      return state.concat([action.payload]);

    case types.REMOVE_LIST:
      return state.filter((item) => item.listId !== action.payload);

    case types.EDIT_LIST_TOGGLE:
      return state.map((list) => {
        if (list.listId !== action.payload) {
          return list;
        } else {
          return {
            ...list,
            title: list.title || list.oldTitle,
            edit: !list.edit,
            oldTitle: list.title,
          };
        }
      });

    case types.CHANGE_LIST_NAME:
      return state.map((list) => {
        if (list.listId !== action.payload.listId) {
          return list;
        } else {
          return {
            ...list,
            title: action.payload.newTitle,
          };
        }
      });

    case types.DROP_IN_TODO:
      return state.map((list) => {
        if (list.listId !== action.payload.listId) {
          return list;
        } else {
          return {
            ...list,
            list: {
              ...list.list,
              todo: list.list.todo.concat([{ ...action.payload, completed: false }]),
              completed: list.list.completed.filter(
                (item) => item.id !== action.payload.id
              ),
            },
          };
        }
      });

    case types.DROP_IN_COMPLETED:
      return state.map((list) => {
        if (list.listId !== action.payload.listId) {
          return list;
        } else {
          return {
            ...list,
            list: {
              ...list.list,
              todo: list.list.todo.filter((item) => item.id !== action.payload.id),
              completed: list.list.completed.concat([
                { ...action.payload, completed: true },
              ]),
            },
          };
        }
      });

    default:
      return state;
  }
};
