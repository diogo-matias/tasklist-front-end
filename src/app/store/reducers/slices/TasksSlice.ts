import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { setMessage } from "./messageSlice";

interface createTaskData {
  description: string;
  detail: string;
  user_id: string;
}

export interface editTaskData {
  id: string;
  description: string;
  detail: string;
  user_id: string;
  arquived?: boolean;
}

export type Task = {
  id?: string;
  description?: string;
  detail?: string;
  user_id?: string;
  randomColor?: number;
  arquived?: boolean;
};
export interface filterTasksData {
  user_id: string;
  description: string;
  detail: string;
}

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (user_id: string) => {
    const response = await api.doGet(`/tasks/${user_id}`);
    return response;
  }
);

export const filterTasks = createAsyncThunk(
  "tasks/filterTasks",
  async ({ user_id, description, detail }: filterTasksData) => {
    const params = {
      description,
      detail,
    };

    const response = await api.doGet(`/tasks/${user_id}`, params);
    return response;
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data: createTaskData, { dispatch }) => {
    const { description, detail, user_id } = data;

    console.log("Entrou no createSlice");
    const response = await api.doPost(`/tasks/${user_id}`, {
      description,
      detail,
    });

    if (!response.success) {
      dispatch(
        setMessage({
          message: response.message,
          severity: "error",
        })
      );
      throw response;
    }

    dispatch(
      setMessage({
        message: response.message,
        severity: "success",
      })
    );
    dispatch(getTasks(user_id));
    return response.data;
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (data: editTaskData, { dispatch }) => {
    const { description, detail, id, user_id, arquived } = data;

    const response = await api.doPut(
      `/tasks/${id}`,
      {
        description,
        detail,
      },
      {
        arquived: arquived,
      }
    );

    if (!response.success) {
      dispatch(
        setMessage({
          message: response.message,
          severity: "error",
        })
      );
      throw response;
    }

    dispatch(
      setMessage({
        message: response.message,
        severity: "success",
      })
    );

    return response.data;
  }
);

export const deleteTasks = createAsyncThunk(
  "tasks/deleteTasks",
  async (tasks: Task[], { dispatch }) => {
    const response = await api.doDeleteMultipleTasks(
      "/tasks/delete/multiple",
      tasks
    );

    if (!response.success) {
      dispatch(
        setMessage({
          message: response.message,
          severity: "error",
        })
      );
      throw response;
    }

    dispatch(
      setMessage({
        message: response.message,
        severity: "success",
      })
    );
    return response.data;
  }
);

const initialState: Task[] = [];

const TasksSlice = createSlice({
  name: "TasksSlice",
  initialState,
  reducers: {
    create(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getTasks.fulfilled, (state, { payload }) => {
      return payload;
    });

    addCase(editTask.fulfilled, (state, { payload }) => {
      return payload;
    });

    addCase(deleteTasks.fulfilled, (state, { payload }) => {
      return payload;
    });
    addCase(createTask.fulfilled, (state, { payload }) => {
      return payload;
    });
    addCase(filterTasks.fulfilled, (state, { payload }) => {
      return payload;
    });
  },
});

export const { create, clear } = TasksSlice.actions;
export default TasksSlice.reducer;
