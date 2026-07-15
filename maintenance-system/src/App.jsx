import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import LecturerDashboard from "./pages/Lecturer/LecturerDashboard";
import StaffDashboard from "./pages/Staff/StaffDashboard";
import Equipment from "./pages/Staff/Equipment";
import TechnicianDashboard from "./pages/Technician/TechnicianDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="Admin">
                <AdminDashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/lecturer/dashboard"
          element={
            <ProtectedRoute allowedRole="Lecturer">
                <LecturerDashboard/>
            </ProtectedRoute>
          }
        />


        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute allowedRole="Staff">
                <StaffDashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/technician/dashboard"
          element={
            <ProtectedRoute allowedRole="Technician">
                <TechnicianDashboard/>
            </ProtectedRoute>
          }
        />

        <Route
            path="/staff/equipment"
            element={
            <ProtectedRoute allowedRole="Staff">
            <Equipment/>
            </ProtectedRoute>
            }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;