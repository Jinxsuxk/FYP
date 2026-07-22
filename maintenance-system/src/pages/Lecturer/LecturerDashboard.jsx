import { useEffect, useState } from "react";

import { supabase } from "../../supabase/client";

import Layout from "../../components/Layout";
import { getLecturerStats, getMyRequests } from "../../services/maintenanceService";

import { FaTools, FaClock, FaCheckCircle, FaPlus } from "react-icons/fa";

import StatusBadge from "../../components/StatusBadge";
import PriorityBadge from "../../components/PriorityBadge";
import StatCard from "../../components/StatCard";

function LecturerDashboard() {
  const [stats, setStats] = useState({});
  const [requests, setRequests] = useState([]);

  async function loadData() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const statData = await getLecturerStats(user.id);
    const requestData = await getMyRequests(user.id);

    setStats(statData);
    setRequests(requestData);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Track your equipment reports and their repair progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<FaTools size={20} />}
          label="My Reports"
          value={stats.myReports || 0}
          tint="blue"
        />
        <StatCard
          icon={<FaClock size={20} />}
          label="Pending Requests"
          value={stats.pending || 0}
          tint="amber"
        />
        <StatCard
          icon={<FaCheckCircle size={20} />}
          label="Completed"
          value={stats.completed || 0}
          tint="emerald"
        />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h2>

        {requests.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">
            No requests yet. Report an equipment fault to get started.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-slate-50 border-b text-left rounded-lg">
                  <th className="py-3 px-4 font-medium text-gray-500 rounded-l-lg">
                    Equipment Name
                  </th>
                  <th className="py-3 px-4 font-medium text-gray-500">
                    Location
                  </th>
                  <th className="py-3 px-4 font-medium text-gray-500">
                    Priority
                  </th>
                  <th className="py-3 px-4 font-medium text-gray-500 rounded-r-lg">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {requests.slice(0, 5).map((request) => (
                  <tr key={request.id}>
                    <td className="py-4 px-4 font-medium text-gray-800">
                      {request.equipment?.equipment_name}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {request.equipment?.location}
                    </td>
                    <td className="py-4 px-4">
                      <PriorityBadge priority={request.priority} />
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={request.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </Layout>
  );
}

export default LecturerDashboard;