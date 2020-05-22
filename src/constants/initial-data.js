export default {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Doing Homework",
    },
    "task-2": {
      id: "task-2",
      content: "Doing Tasks",
    },
    "task-3": {
      id: "task-3",
      content: "Doing Assignments",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do!",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-3"],
    },
  },
  columnOrders: ["column-1", "column-2", "column-3"],
};
