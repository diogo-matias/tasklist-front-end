import { Box, TextField, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  setNavigate,
  setSuccess,
  userLogin,
} from "../../store/reducers/slices/UserSlice";
import { useAppDispatch } from "../../hooks/redux";
import { useSelector } from "react-redux/es/exports";
import { State } from "../../store/reducers/rootReducer";
import { clearUser } from "../../store/reducers/slices/UserSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector((state: State) => state.UserSlice);

  async function handleSubmit() {
    const data = {
      email,
      password,
    };
    dispatch(userLogin(data));
  }

  useEffect(() => {
    dispatch(clearUser());
  }, []);

  function handleBack() {
    navigate("/");
  }

  useEffect(() => {
    if (user.navigate === "/tasklist") {
      navigate(user.navigate);
      dispatch(setSuccess(undefined));
      dispatch(setNavigate(""));
    }
  }, [user]);

  return (
    <Box sx={{ minHeight: "100vh" }} className="register-login-bg">
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "background.paper",
          padding: 5,
          borderRadius: 3,
          boxShadow: "0px 0px 30px rgb(0,0,0,0.4)",
        }}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          Login
        </Typography>
        <TextField
          key="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          label="Email"
        />
        <TextField
          key="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          label="password"
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          sx={{ padding: 1, borderRadius: 3, color: "white", marginTop: 2 }}
        >
          Enviar
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ArrowBackIcon onClick={handleBack} sx={{ cursor: "pointer" }} />
          <Typography onClick={handleBack} sx={{ cursor: "pointer" }}>
            Voltar
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
