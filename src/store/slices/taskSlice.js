// src/store/slices/taskSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
  filters: {
    status: "all",
    priority: "all",
    assignee: "all",
    searchQuery: "",
  },
  view: "kanban", // 'kanban' или 'list'
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Установка всех задач
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Установка текущей задачи
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Добавление новой задачи
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    // Обновление существующей задачи
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        if (state.currentTask?.id === action.payload.id) {
          state.currentTask = action.payload;
        }
      }
    },

    // Удаление задачи
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      if (state.currentTask?.id === action.payload) {
        state.currentTask = null;
      }
    },

    // Обновление статуса задачи (для drag-n-drop)
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = newStatus;
      }
    },

    // Добавление комментария к задаче
    addComment: (state, action) => {
      const { taskId, comment } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        if (!task.comments) task.comments = [];
        task.comments.push(comment);
      }
      if (state.currentTask?.id === taskId) {
        if (!state.currentTask.comments) state.currentTask.comments = [];
        state.currentTask.comments.push(comment);
      }
    },

    // Установка фильтров
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    // Установка вида отображения (канбан/список)
    setView: (state, action) => {
      state.view = action.payload;
    },

    // Установка состояния загрузки
    setLoading: (state, action) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    // Установка ошибки
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Добавление подзадачи
    addSubtask: (state, action) => {
      const { parentId, subtask } = action.payload;
      const parent = state.tasks.find((task) => task.id === parentId);
      if (parent) {
        if (!parent.subtasks) parent.subtasks = [];
        parent.subtasks.push(subtask);
      }
      if (state.currentTask?.id === parentId) {
        if (!state.currentTask.subtasks) state.currentTask.subtasks = [];
        state.currentTask.subtasks.push(subtask);
      }
    },

    // Обновление подзадачи
    updateSubtask: (state, action) => {
      const { parentId, subtaskId, updates } = action.payload;
      const parent = state.tasks.find((task) => task.id === parentId);
      if (parent && parent.subtasks) {
        const subtaskIndex = parent.subtasks.findIndex(
          (st) => st.id === subtaskId
        );
        if (subtaskIndex !== -1) {
          parent.subtasks[subtaskIndex] = {
            ...parent.subtasks[subtaskIndex],
            ...updates,
          };
        }
      }
    },

    // Сброс состояния
    resetTaskState: (state) => {
      return initialState;
    },
  },
});

// Экспорт actions
export const {
  setTasks,
  setCurrentTask,
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  addComment,
  setFilters,
  setView,
  setLoading,
  setError,
  addSubtask,
  updateSubtask,
  resetTaskState,
} = taskSlice.actions;

// Селекторы
export const selectAllTasks = (state) => state.tasks.tasks;
export const selectCurrentTask = (state) => state.tasks.currentTask;
export const selectTasksLoading = (state) => state.tasks.loading;
export const selectTasksError = (state) => state.tasks.error;
export const selectTaskFilters = (state) => state.tasks.filters;
export const selectTaskView = (state) => state.tasks.view;

// Селектор для фильтрованных задач
export const selectFilteredTasks = (state) => {
  const { tasks } = state.tasks;
  const { status, priority, assignee, searchQuery } = state.tasks.filters;

  return tasks.filter((task) => {
    const matchesStatus = status === "all" || task.status === status;
    const matchesPriority = priority === "all" || task.priority === priority;
    const matchesAssignee =
      assignee === "all" || task.assignee?.id.toString() === assignee;
    const matchesSearch = searchQuery
      ? task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesStatus && matchesPriority && matchesAssignee && matchesSearch;
  });
};

// Селектор для задач по статусу (для канбан-доски)
export const selectTasksByStatus = (state) => {
  const filteredTasks = selectFilteredTasks(state);
  return {
    todo: filteredTasks.filter((task) => task.status === "todo"),
    in_progress: filteredTasks.filter((task) => task.status === "in_progress"),
    review: filteredTasks.filter((task) => task.status === "review"),
    done: filteredTasks.filter((task) => task.status === "done"),
  };
};

export default taskSlice.reducer;
