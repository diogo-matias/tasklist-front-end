import { createSlice } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

interface origin {
  vertical: "top" | "bottom";
  horizontal: "right" | "left" | "center";
}

export interface message {
  open?: boolean;
  message: string;
  severity: AlertColor;
  origin?: origin;
  autoHideDuration: number;
}

const initialState: message = {
  open: false,
  message: "",
  severity: "info",
  origin: {
    vertical: "bottom",
    horizontal: "right",
  },
  autoHideDuration: 2000,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, { payload }): message {
      const data = {
        open: true,
        message: payload.message,
        severity: payload.severity,
        origin: payload.origin || initialState.origin,
        autoHideDuration:
          payload.autoHideDuration || initialState.autoHideDuration,
      };

      return data;
    },

    clearMessage(state) {
      return {
        ...state,
        open: false,
        origin: initialState.origin,
      };
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
