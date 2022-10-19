import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Modal,
  Checkbox,
  SwipeableDrawer,
  Switch,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useSelector } from "react-redux/es/exports";
import { State } from "../../store/reducers/rootReducer";
import {
  createTask,
  getTasks,
  editTask,
  deleteTasks,
  filterTasks,
} from "../../store/reducers/slices/TasksSlice";
import type {
  Task,
  editTaskData,
  filterTasksData,
} from "../../store/reducers/slices/TasksSlice";
import { invalidUser } from "../../services/auth";
import { setMessage } from "../../store/reducers/slices/messageSlice";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../store/reducers/slices/UserSlice";

export default function TaskList() {
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: State) => state.TasksSlice);
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const navigate = useNavigate();
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [select, setSelect] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [descriptionFilter, setDescriptionFilter] = useState<string>("");
  const [detailFilter, setDetailFilter] = useState<string>("");
  const [arquived, setArchived] = useState<boolean | undefined>(false);
  const [showArquived, setShowArquived] = useState<boolean>(false);
  const user_id = getLocalStorage("user_id");

  const modalStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: getThemeColor(selectedTask?.randomColor || 0),
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const isUserInvalid = invalidUser();

    if (isUserInvalid) {
      dispatch(
        setMessage({
          message: "Usuário inválido",
          severity: "error",
        })
      );
      navigate("/");
    }

    dispatch(getTasks(user_id));
  }, []);

  function getLocalStorage(key: string) {
    try {
      const response = JSON.parse(localStorage.getItem(key) || "");

      return response;
    } catch (error) {
      return error;
    }
  }

  function handleSelect() {
    setSelect(!select);

    if (!select) {
      setSelectedTasks([]);
    }
  }

  function handleSelectCheckbox(task: Task) {
    const alreadyExist = selectedTasks?.find((item) => item.id === task.id);

    if (alreadyExist) {
      setSelectedTasks((old: any) => {
        return old.filter((item: Task) => item.id !== alreadyExist.id);
      });

      return;
    }

    setSelectedTasks((old: any) => {
      return [...old, task];
    });
  }

  async function handleSubmit() {
    const data = {
      description,
      detail,
      user_id,
    };

    dispatch(createTask(data));
    dispatch(getTasks(user_id));
    setOpenCreateModal(false);
    setSelect(false);
    setDescription("");
    setDetail("");
  }

  function handleDelete() {
    dispatch(deleteTasks(selectedTasks));
    setSelect(false);
  }

  function handleTaskClick(task: Task) {
    if (select) return;

    setOpen(true);
    setSelectedTask(task);
  }

  function handleSave(task: Task | null, saveType?: "arquive") {
    const data: editTaskData = {
      description: task?.description || "",
      detail: task?.detail || "",
      id: selectedTask?.id || "",
      user_id: user_id || "",
      arquived: saveType === "arquive" ? !task?.arquived : task?.arquived,
    };

    dispatch(editTask(data));

    setOpen(false);
    // setSelectedTask(null);
  }

  function getThemeColor(number: number) {
    // primary.main -> purple
    // secondaty.main -> blue
    // info.main -> yellow

    switch (number) {
      case 0:
        return "primary.main";
      case 1:
        return "secondary.main";
      case 2:
        return "info.main";

      default:
        return "primary.main";
    }
  }

  function handleCloseCreateModal() {
    setOpenCreateModal(false);
    setDescription("");
    setDetail("");
  }

  function handleSelectAll() {
    setSelectedTasks(tasks);
  }

  useEffect(() => {
    handleFilter();
  }, [descriptionFilter, detailFilter]);

  function handleFilter() {
    const data: filterTasksData = {
      user_id,
      description: descriptionFilter,
      detail: detailFilter,
    };
    dispatch(filterTasks(data));
  }

  function handleClearFilter() {
    setDescriptionFilter("");
    setDetailFilter("");
    setShowArquived(false);
    setOpenDrawer(false);
  }

  function handleLogout() {
    dispatch(clearUser());
    navigate("/");
  }

  return (
    <Box sx={{ minHeight: "100vh" }} className="home-background">
      <Box
        sx={{ maxWidht: 1440, margin: "auto", paddingX: 15, paddingTop: 15 }}
      >
        <Grid container>
          <Grid container item xs={10} spacing={3}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography variant="h4" fontWeight={"bold"}>
                  Minhas Tarefas
                </Typography>

                <AddIcon
                  onClick={() => setOpenCreateModal(true)}
                  sx={{ cursor: "pointer", fontWeight: "bold" }}
                  fontSize="large"
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                {select && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                  >
                    Excluir
                  </Button>
                )}
                {select && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleSelectAll}
                  >
                    Selecionar Todos
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setOpenDrawer(true)}
                  sx={{ color: "white" }}
                >
                  Filtrar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSelect}
                >
                  Selecionar
                </Button>
              </Box>
            </Grid>
            <Grid item container xs={12} spacing={2}>
              {tasks.length > 0 ? (
                tasks.map((task: Task, index: number) => {
                  if (task.arquived === showArquived) {
                    return (
                      <Grid
                        key={index}
                        item
                        xs={3}
                        onClick={() => handleTaskClick(task)}
                      >
                        <Box
                          sx={{
                            backgroundColor: getThemeColor(
                              task?.randomColor || 0
                            ),
                            borderRadius: 3,
                            boxShadow: "4px 4px 10px rgb(0,0,0,0.5)",
                            minHeight: 70,
                            padding: 2,
                            position: "relative",
                            overflow: "auto",
                            wordBreak: "break-all",
                            cursor: "pointer",
                          }}
                        >
                          {select && (
                            <Box
                              sx={{
                                widht: "100%",
                                justifyContent: "flex-end",
                                display: "flex",
                                position: "absolute",
                                right: 0,
                                top: 0,
                              }}
                            >
                              <Checkbox
                                style={{ color: "#ffff" }}
                                onChange={() => handleSelectCheckbox(task)}
                                checked={selectedTasks.some(
                                  (item) => item.id === task.id
                                )}
                              />
                            </Box>
                          )}
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              {task?.description &&
                                (task?.description?.length > 50 ? (
                                  <Box>
                                    {task?.description?.slice(0, 50)}...
                                  </Box>
                                ) : (
                                  task?.description
                                ))}
                            </Typography>

                            <Typography variant="body1">
                              {task?.detail &&
                                (task?.detail?.length > 50 ? (
                                  <Box>{task?.detail?.slice(0, 50)}...</Box>
                                ) : (
                                  task?.detail
                                ))}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  }
                })
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "70vh",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      height: "50%",
                      width: "50%",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Box
                      className="dino-img-background"
                      sx={{ minHeight: 300 }}
                    ></Box>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              paddingX: 3,
              display: "flex",
              flexDirection: "column",
              alingItem: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alingItem: "center",
              }}
            >
              <Box
                sx={{
                  padding: 3,
                  borderRadius: "50%",
                  border: "1px solid white",
                  overflow: "hidden",
                  minHeight: 50,
                  minWidht: 50,
                }}
              >
                <img
                  src={`https://robohash.org/${user_id}?set=set4`}
                  style={{
                    width: "100%",
                    transform: "scaleX(-1)",
                  }}
                />
              </Box>
              <Typography variant="h4" fontWeight={"bold"} textAlign="center">
                User
              </Typography>
              <Typography variant="body1" textAlign="center">
                user.name
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{
                  paddingX: 3,
                  marginTop: 2,
                  width: "50%",
                  alignSelf: "center",
                }}
                onClick={handleLogout}
              >
                Sair
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-tasks"
          aria-describedby="modal-edit-tasks"
        >
          <Box sx={modalStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight="bold">
                  Descrição
                </Typography>
                <TextField
                  multiline
                  rows={2}
                  fullWidth
                  value={selectedTask?.description}
                  onChange={(e) =>
                    setSelectedTask((task: Task | null) => {
                      return { ...task, description: e.target.value };
                    })
                  }
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight="bold">
                  Detalhamento
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={selectedTask?.detail}
                  onChange={(e) =>
                    setSelectedTask((task: Task | null) => {
                      return { ...task, detail: e.target.value };
                    })
                  }
                />
              </Grid>
              <Grid item sx={{ display: "flex", gap: 2, marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ color: "black" }}
                  onClick={() => handleSave(selectedTask)}
                >
                  Salvar
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ color: "black" }}
                  onClick={() => handleSave(selectedTask, "arquive")}
                >
                  {selectedTask?.arquived ? "Desarquivar" : "Arquivar"}
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ color: "black" }}
                  onClick={() => setOpen(false)}
                >
                  Voltar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Modal
          open={openCreateModal}
          onClose={handleCloseCreateModal}
          aria-labelledby="modal-tasks"
          aria-describedby="modal-edit-tasks"
        >
          <Box sx={modalStyle}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight="bold">
                  Descrição
                </Typography>
                <TextField
                  label="Descrição da tarefa"
                  fullWidth
                  multiline
                  rows={2}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight="bold">
                  Detalhamento
                </Typography>
                <TextField
                  label="Detalhamento da tarefa"
                  fullWidth
                  multiline
                  rows={2}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </Grid>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  color="inherit"
                  sx={{ color: "black" }}
                >
                  Adicionar
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCloseCreateModal}
                  color="inherit"
                  sx={{ color: "black" }}
                >
                  Voltar
                </Button>
              </Box>
            </Grid>
          </Box>
        </Modal>
        <SwipeableDrawer
          anchor={"right"}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => console.log("n sei")}
        >
          <Box role="presentation">
            <Box
              sx={{
                widht: 300,
                padding: 5,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                Filtrar por:
              </Typography>
              <TextField
                label="Descrição"
                value={descriptionFilter}
                onChange={(e) => setDescriptionFilter(e.target.value)}
              />
              <TextField
                label="Detail"
                value={detailFilter}
                onChange={(e) => setDetailFilter(e.target.value)}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Switch
                  onChange={(e) => setShowArquived(e.target.checked)}
                  checked={showArquived}
                  name="loading"
                  color="primary"
                />
                <Typography variant="caption">Mostrar arquivados</Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                sx={{ color: "white" }}
                onClick={handleClearFilter}
              >
                Limpar filtro
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ color: "white" }}
                onClick={() => setOpenDrawer(false)}
              >
                Voltar
              </Button>
            </Box>
          </Box>
        </SwipeableDrawer>
      </Box>
    </Box>
  );
}
