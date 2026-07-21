import { FaClipboardCheck, FaWrench, FaHistory } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../../supabase/client";
import { getTechnicianStats } from "../../services/dashboardService";

import Layout from "../../components/Layout";

function TechnicianDashboard() {
  const [stats, setStats] = useState({
    assignedTasks: 0,
    inProgress: 0,
    completedRepairs: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const data = await getTechnicianStats(user.id);
    setStats(data);
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Technician Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <FaClipboardCheck className="text-3xl mb-4" />
          <p>Assigned Tasks</p>
          <h2 className="text-3xl font-bold">{stats.assignedTasks}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <FaWrench className="text-3xl mb-4" />
          <p>In Progress</p>
          <h2 className="text-3xl font-bold">{stats.inProgress}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <FaHistory className="text-3xl mb-4" />
          <p>Repair History</p>
          <h2 className="text-3xl font-bold">{stats.completedRepairs}</h2>
        </div>
      </div>

      <div className="mt-8 bg-white border rounded-xl p-6">
        <h2 className="text-xl font-semibold">Technician Work Center</h2>
        <p className="text-gray-500 mt-2">
          View assigned maintenance tasks and update repair progress.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">
          <Link
            to="/technician/tasks"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Assigned Tasks
          </Link>

          <Link
            to="/history"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Repair History
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default TechnicianDashboard;