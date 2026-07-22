import Layout from "../../components/Layout";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import PriorityBadge from "../../components/PriorityBadge";
import { useEffect, useState } from "react";

import { FaTools, FaUsers, FaClock, FaCheckCircle } from "react-icons/fa";

import { getAdminStats } from "../../services/dashboardService";
import { getRequests } from "../../services/maintenanceService";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEquipment: 0,
    totalUsers: 0,
    pending: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0,
  });

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadStats();
    loadRequests();
  }, []);

  async function loadStats() {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadRequests() {
    try {
      const data = await getRequests();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Dashboard should surface the newest activity, not the entire table
  const recentRequests = requests.slice(0, 5);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          System-wide overview of equipment, users, and maintenance activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={<FaTools size={20} />}
          label="Equipment"
          value={stats.totalEquipment}
          tint="blue"
        />

        <StatCard
          icon={<FaUsers size={20} />}
          label="Users"
          value={stats.totalUsers}
          tint="violet"
        />

        <StatCard
          icon={<FaClock size={20} />}
          label="Pending Requests"
          value={stats.pending}
          tint="amber"
        />

        <StatCard
          icon={<FaCheckCircle size={20} />}
          label="Completed Requests"
          value={stats.completed}
          tint="emerald"
        />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Maintenance Requests
          </h2>
        </div>

        {recentRequests.length === 0 ? (
          <p className="text-sm text-gray-400 py-12 text-center">
            No maintenance requests yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="p-4 font-medium text-gray-500">Equipment</th>
                <th className="p-4 font-medium text-gray-500">Reporter</th>
                <th className="p-4 font-medium text-gray-500">Priority</th>
                <th className="p-4 font-medium text-gray-500">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {recentRequests.map((request) => (
                <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">
                    {request.equipment?.equipment_name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {request.users?.full_name}
                  </td>

                  <td className="p-4">
                    <PriorityBadge priority={request.priority} />
                  </td>

                  <td className="p-4">
                    <StatusBadge status={request.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default AdminDashboard;