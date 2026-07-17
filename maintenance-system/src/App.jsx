import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import LecturerDashboard from "./pages/Lecturer/LecturerDashboard";
import ReportFault from "./pages/Lecturer/ReportFault";
import StaffDashboard from "./pages/Staff/StaffDashboard";
import Equipment from "./pages/Staff/Equipment";
import MaintenanceHistory from "./pages/Staff/MaintenanceHistory";
import MaintenanceRequests from "./pages/Staff/MaintenanceRequests";
import TechnicianDashboard from "./pages/Technician/TechnicianDashboard";
import AssignedTasks from "./pages/Technician/AssignedTasks";

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
          path="/lecturer/report-fault"
          element={
            <ProtectedRoute allowedRole="Lecturer">
                <ReportFault/>
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
          path="/staff/history"
          element={
            <ProtectedRoute allowedRole="Staff">
                <MaintenanceHistory/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/maintenance"
          element={
            <ProtectedRoute allowedRole="Staff">
                <MaintenanceRequests/>
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

        <Route
          path="/technician/dashboard"
          element={
            <ProtectedRoute allowedRole="Technician">
                <TechnicianDashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/technician/tasks"
          element={
            <ProtectedRoute allowedRole="Technician">
                <AssignedTasks/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;