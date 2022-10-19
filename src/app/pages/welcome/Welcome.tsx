import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Modal,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", widht: "100%" }}>
      <Box
        sx={{
          height: "100vh",
          widht: "100%",
          display: "flex",
          paddingLeft: "5vw",
          alignItems: "center",
        }}
        className="home-background"
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography variant="h1" fontWeight={"bold"}>
              Task.ly
            </Typography>
            <Typography variant="h4">
              Controle todas as suas tarefas<br></br>
              em um só lugar!
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => navigate("/register")}
              >
                Criar nova conta
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                color="secondary"
                sx={{ color: "white" }}
                variant="contained"
                onClick={() => navigate("/login")}
              >
                Entrar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
