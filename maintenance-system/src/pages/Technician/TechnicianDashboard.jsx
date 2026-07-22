import { FaClipboardCheck, FaWrench, FaHistory } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../../supabase/client";
import { getTechnicianStats } from "../../services/dashboardService";

import Layout from "../../components/Layout";
import StatCard from "../../components/StatCard";

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Technician Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Your assigned tasks and repair progress at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FaClipboardCheck size={20} />}
          label="Assigned Tasks"
          value={stats.assignedTasks}
          tint="blue"
        />
        <StatCard
          icon={<FaWrench size={20} />}
          label="In Progress"
          value={stats.inProgress}
          tint="amber"
        />
        <StatCard
          icon={<FaHistory size={20} />}
          label="Repair History"
          value={stats.completedRepairs}
          tint="emerald"
        />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">
          <Link
            to="/technician/tasks"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
          >
            Assigned Tasks
          </Link>

          <Link
            to="/technician/history"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
          >
            Repair History
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default TechnicianDashboard;