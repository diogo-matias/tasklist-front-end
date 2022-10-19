import { combineReducers } from "@reduxjs/toolkit";
import TasksSlice from "./slices/TasksSlice";
import UserSlice from "./slices/UserSlice";
import messageSlice from "./slices/messageSlice";

const combinedReducers = combineReducers({
  TasksSlice,
  UserSlice,
  messageSlice,
});

export default combinedReducers;
export type State = ReturnType<typeof combinedReducers>;
