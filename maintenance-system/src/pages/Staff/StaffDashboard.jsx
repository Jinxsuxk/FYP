import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

import { FaTools, FaClipboardList, FaUserCog, FaHistory } from "react-icons/fa";

import { getStaffStats } from "../../services/dashboardService";

function StaffDashboard() {
  const [stats, setStats] = useState({
    equipmentCount: 0,
    openRequests: 0,
    assignedTasks: 0,
    completedRepairs: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const data = await getStaffStats();
    setStats(data);
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <FaTools className="text-3xl mb-4" />
          <p>Equipment</p>
          <h2 className="text-3xl font-bold">{stats.equipmentCount}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <FaClipboardList className="text-3xl mb-4" />
          <p>Maintenance Requests</p>
          <h2 className="text-3xl font-bold">{stats.openRequests}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <FaUserCog className="text-3xl mb-4" />
          <p>Assigned Tasks</p>
          <h2 className="text-3xl font-bold">{stats.assignedTasks}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <FaHistory className="text-3xl mb-4" />
          <p>Completed Repairs</p>
          <h2 className="text-3xl font-bold">{stats.completedRepairs}</h2>
        </div>
      </div>

      <div className="mt-8 bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold">Maintenance Management</h2>
        <p className="text-gray-500 mt-2">
          Review reports and assign technicians.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">
          <Link
            to="/staff/maintenance"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            View Requests
          </Link>

          <Link
            to="/staff/equipment"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Manage Equipment
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default StaffDashboard;