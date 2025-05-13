import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./components/Home";
import Profile from "./components/Profile";
import TaskLogger from "./components/TaskLogger";
import SummaryForm from "./components/SummaryForm";
import AdminNavbar from "./components/AdminNavbar.js";
import UserNavbar from "./components/UserNavbar";
import Details from "./components/UserDetails.js";
import AllUsers from "./components/AllUsers.js";
import AssignTask from "./components/AssignTask";
import UserDashboard from "./components/UserDashboard.js";
import UserProfile from "./components/UserProfile.js";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username") || "";
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar &&
        isLoggedIn &&
        (username === "admin" ? <AdminNavbar /> : <UserNavbar />)}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/assign-task" element={<AssignTask />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/user-dashboard/:id" element={<UserDashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              {username === "admin" ? (
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
            <ProtectedRoute isLoggedIn={isLoggedIn && username === "admin"}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && username !== "admin"}>
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
          path="/taskLogger"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <TaskLogger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SummaryForm"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SummaryForm />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
