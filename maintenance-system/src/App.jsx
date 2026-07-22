import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminEquipment from "./pages/Admin/AdminEquipment";
import AdminMaintenance from "./pages/Admin/AdminMaintenance";
import AdminHistory from "./pages/Admin/History";
import UserManagement from "./pages/Admin/UserManagement";
import CreateUser from "./pages/Admin/CreateUser";
import LecturerDashboard from "./pages/Lecturer/LecturerDashboard";
import ReportFault from "./pages/Lecturer/ReportFault";
import MyRequests from "./pages/Lecturer/MyRequests";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StaffDashboard from "./pages/Staff/StaffDashboard";
import Equipment from "./pages/Staff/Equipment";
import MaintenanceHistory from "./pages/Staff/MaintenanceHistory";
import MaintenanceRequests from "./pages/Staff/MaintenanceRequests";
import TechnicianDashboard from "./pages/Technician/TechnicianDashboard";
import AssignedTasks from "./pages/Technician/AssignedTasks";
import TechnicianHistory from "./pages/Technician/History";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />}/>

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="Admin">
                <AdminDashboard/>
            </ProtectedRoute>
          }
        />

        <Route
            path="/admin/equipment"
            element={
            <ProtectedRoute allowedRole="Admin">
                <AdminEquipment/>
            </ProtectedRoute>
            }
        />

        <Route
            path="/admin/maintenance"
            element={
            <ProtectedRoute allowedRole="Admin">
                <AdminMaintenance/>
            </ProtectedRoute>
            }
        />

        <Route
            path="/admin/history"
            element={
              <ProtectedRoute allowedRole="Admin">
                  <AdminHistory/>
              </ProtectedRoute>
            }
        />

        <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRole="Admin">
                  <UserManagement/>
              </ProtectedRoute>
            }
        />

        <Route
            path="/admin/users/create"
            element={
              <ProtectedRoute allowedRole="Admin">
                  <CreateUser/>
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
          path="/lecturer/requests"
          element={
            <ProtectedRoute allowedRole="Lecturer">
                <MyRequests/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="Student">
                <StudentDashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/report-fault"
          element={
            <ProtectedRoute allowedRole="Student">
                <ReportFault/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/requests"
          element={
            <ProtectedRoute allowedRole="Student">
                <MyRequests/>
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

        <Route
          path="/technician/history"
          element={
            <ProtectedRoute allowedRole="Technician">
                <TechnicianHistory/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;