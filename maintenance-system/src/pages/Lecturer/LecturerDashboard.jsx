import { useEffect, useState } from "react";

import { supabase } from "../../supabase/client";

import Layout from "../../components/Layout";
import { getLecturerStats, getMyRequests } from "../../services/maintenanceService";

import { FaTools, FaClock, FaCheckCircle } from "react-icons/fa";

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
      <h1 className="text-3xl font-bold mb-6">Lecturer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <FaTools className="text-3xl mb-4" />
          <p>My Reports</p>
          <h2 className="text-3xl font-bold">{stats.myReports || 0}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <FaClock className="text-3xl mb-4" />
          <p>Pending Requests</p>
          <h2 className="text-3xl font-bold">{stats.pending || 0}</h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <FaCheckCircle className="text-3xl mb-4" />
          <p>Completed</p>
          <h2 className="text-3xl font-bold">{stats.completed || 0}</h2>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>

        {requests.map((request) => (
          <div key={request.id} className="border-b py-3">
            <p className="font-medium">{request.equipment?.equipment_name}</p>
            <p className="text-sm text-gray-500">{request.status}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>

        <a
          href="/lecturer/report-fault"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Report Equipment Fault
        </a>
      </div>
    </Layout>
  );
}

export default LecturerDashboard;