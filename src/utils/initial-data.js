const initial_data = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Task A'
    },
    'task-2': {
      id: 'task-2',
      content: 'Task B'
    },
    'task-3': {
      id: 'task-3',
      content: 'Task C'
    }
  },
  columns: {
    'column-1':{
      id: 'column-1',
      title: 'Tasks',
      taskIds: ['task-1', 'task-2', 'task-3']
    },
    'column-2':{
      id: 'column-2',
      title: 'In progress',
      taskIds: []
    },
    'column-3':{
      id: 'column-3',
      title: 'Done',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
};
export default initial_data;