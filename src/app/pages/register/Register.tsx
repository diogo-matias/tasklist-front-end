import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setNavigate,
  setSuccess,
  userRegister,
} from "../../store/reducers/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Rpassword, setRpassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.UserSlice);
  const navigate = useNavigate();

  async function handleSubmit() {
    const data = {
      email,
      password,
      Rpassword,
    };

    dispatch(userRegister(data));
  }

  function handleBack() {
    navigate("/");
  }

  useEffect(() => {
    if (user.navigate === "/login") {
      navigate(user.navigate);
      dispatch(setSuccess(undefined));
      dispatch(setNavigate(""));
    }

    if (user.success) {
      setEmail("");
      setPassword("");
      setRpassword("");
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
        <Typography variant="h4" fontWeight={600}>
          Register
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
        <TextField
          type="password"
          key="Rpassword"
          onChange={(e) => {
            setRpassword(e.target.value);
          }}
          value={Rpassword}
          label="Repeat password"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          sx={{ padding: 1, borderRadius: 3, color: "white", marginTop: 2 }}
        >
          {user.loading ? (
            <CircularProgress color="inherit" size={25} />
          ) : (
            "Enviar"
          )}
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
