import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import { supabase } from "../../supabase/client";
import { getMyRequests } from "../../services/maintenanceService";

import StatusBadge from "../../components/StatusBadge";
import PriorityBadge from "../../components/PriorityBadge";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const data = await getMyRequests(user.id);
    setRequests(data);
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Requests</h1>
          <p className="text-gray-500 mt-1">
            All equipment faults you've reported, with their current status.
          </p>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
          {requests.length === 0 ? (
            <p className="text-sm text-gray-400 py-12 text-center">
              You haven't reported any equipment faults yet.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b text-left">
                  <th className="p-4 font-medium text-gray-500">Equipment</th>
                  <th className="p-4 font-medium text-gray-500">Issue</th>
                  <th className="p-4 font-medium text-gray-500">Priority</th>
                  <th className="p-4 font-medium text-gray-500">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="p-4 font-medium text-gray-800">
                      {request.equipment?.equipment_name}
                    </td>
                    <td className="p-4 text-gray-600">
                      {request.issue_description}
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
      </div>
    </Layout>
  );
}

export default MyRequests;