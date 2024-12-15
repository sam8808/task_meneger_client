import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WebSocketProvider } from "./context/WebSocketContext";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import Projects from "./pages/dashboard/Projects";
import ProjectDetails from "./pages/dashboard/ProjectDetails";
import Tasks from "./pages/dashboard/Tasks";
import TaskDetails from "./pages/dashboard/TaskDetails.jsx";
import ProjectForm from "./components/projects/ProjectForm";
import TaskForm from "./components/tasks/TaskForm";

const App = () => {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <Routes>
          {/* Public Routes - остаются без изменений */}
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
          </Route>

          {/* Protected Routes */}
          <Route element={<DashboardLayout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Project routes */}
            <Route
              path="/projects"
              element={
                <PrivateRoute>
                  <Projects />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/create"
              element={
                <PrivateRoute>
                  <ProjectForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <PrivateRoute>
                  <ProjectDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:id/edit"
              element={
                <PrivateRoute>
                  <ProjectForm />
                </PrivateRoute>
              }
            />

            {/* Task routes */}
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/create"
              element={
                <PrivateRoute>
                  <TaskForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <PrivateRoute>
                  <TaskDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/:id/edit"
              element={
                <PrivateRoute>
                  <TaskForm />
                </PrivateRoute>
              }
            />
          </Route>

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900">404</h1>
                  <p className="text-gray-600">Страница не найдена</p>
                </div>
              </div>
            }
          />
        </Routes>
      </WebSocketProvider>
    </AuthProvider>
  );
};

export default App;
