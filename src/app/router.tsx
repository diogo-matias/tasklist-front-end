import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import TaskList from "./pages/tasklist/Tasklist";
import Welcome from "./pages/welcome/Welcome";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasklist" element={<TaskList />} />
        <Route path="*" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}
