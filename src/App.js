import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./components/Home";
import Profile from "./components/Profile";
import TaskLogger from "./components/TaskLogger";
import SummaryForm from "./components/SummaryForm";
import AdminNavbar from "./components/AdminNavbar";
import UserNavbar from "./components/UserNavbar";
import Details from "./components/UserDetails";
import AllUsers from "./components/AllUsers";
import AssignTask from "./components/AssignTask";
import UserDashboard from "./components/UserDashboard";
import UserProfile from "./components/UserProfile";
import SignupPage from "./components/SignupPage";
import AdminData from "./data/AdminData";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username") || "";
  const location = useLocation();

  const isAdmin = AdminData.some(admin => admin.name === username);
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && isLoggedIn && (
        isAdmin ? <AdminNavbar /> : <UserNavbar />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/assign-task" element={<AssignTask />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/user-dashboard/:id" element={<UserDashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              {isAdmin ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/home" />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && isAdmin}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && !isAdmin}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/task-logger"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <TaskLogger />
            </ProtectedRoute>
          }
        />

        <Route
          path="/summary-form"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SummaryForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to={isAdmin ? "/admin/dashboard" : "/home"} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
