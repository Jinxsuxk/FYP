import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

import { FaTools, FaClipboardList, FaUserCog, FaHistory, FaClipboardCheck } from "react-icons/fa";

import { getStaffStats } from "../../services/dashboardService";

import StatCard from "../../components/StatCard";

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of equipment and maintenance activity across the facility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={<FaTools size={20} />}
          label="Equipment"
          value={stats.equipmentCount}
          tint="blue"
        />
        <StatCard
          icon={<FaClipboardList size={20} />}
          label="Maintenance Requests"
          value={stats.openRequests}
          tint="amber"
        />
        <StatCard
          icon={<FaUserCog size={20} />}
          label="Assigned Tasks"
          value={stats.assignedTasks}
          tint="violet"
        />
        <StatCard
          icon={<FaHistory size={20} />}
          label="Completed Repairs"
          value={stats.completedRepairs}
          tint="emerald"
        />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">
          <Link
            to="/staff/maintenance"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
          >
            View Requests
          </Link>

          <Link
            to="/staff/equipment"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
          >
            Manage Equipment
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default StaffDashboard;