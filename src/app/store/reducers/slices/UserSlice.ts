import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { State } from "../rootReducer";
import { setMessage } from "./messageSlice";

interface loginData {
  email: string;
  password: string;
}

interface registerData {
  email: string;
  password: string;
  Rpassword: string;
}

class LoginError extends Error {
  constructor(message: string, cause: any) {
    super(message);
    this.cause = cause;
    this.name = "LoginError";
  }
}

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (data: registerData, { dispatch }) => {
    const response = await api.doPost("/users", data);

    if (!response.success) {
      dispatch(
        setMessage({
          message: response.message || "Erro",
          severity: "error",
        })
      );
      throw new Error(response.message);
    }

    dispatch(
      setMessage({
        message: response.message || "Sucesso",
        severity: "success",
      })
    );
    return response;
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (data: loginData, { dispatch }) => {
    const response = await api.doPost("/users/login", data);

    if (!response.success) {
      dispatch(
        setMessage({
          message: response.message || "Erro",
          severity: "error",
        })
      );
      throw new LoginError(response.message, response);
    }

    setMessage({
      message: response.message || "Sucesso",
      severity: "success",
    });
    return response;
  }
);

interface initialState {
  success: boolean;
  message: string;
  user_id: string;
  navigate?: string;
}

const initialState: initialState = {
  success: false,
  message: "",
  user_id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    create(state, action) {
      return action.payload;
    },
    clearUser() {
      localStorage.removeItem("user_id");
      return initialState;
    },
    setSuccess(state, { payload }) {
      state.success = payload;
    },
    setNavigate(state, { payload }) {
      state.navigate = payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(userLogin.fulfilled, (state, { payload }) => {
      localStorage.setItem("user_id", JSON.stringify(payload.user_id || ""));
      api.setAuthHeader(payload.user_id);

      return { ...payload, navigate: "/tasklist" };
    });
    addCase(userLogin.rejected, (state, { error }) => {
      return {
        success: false,
        message: error.message,
      };
    });
    addCase(userRegister.rejected, (state, { error }) => {
      return {
        success: false,
        message: error.message,
      };
    });
    addCase(userRegister.fulfilled, (state, { payload }) => {
      return {
        ...payload,
        navigate: "/login",
      };
    });
  },
});

export const { create, clearUser, setSuccess, setNavigate } = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state: State) => state.UserSlice;
