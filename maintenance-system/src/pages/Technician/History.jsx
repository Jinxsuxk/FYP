import { useEffect, useState } from "react";

import Layout from "../../components/Layout";

import { supabase } from "../../supabase/client";

import { getTechnicianHistory } from "../../services/historyService";

function TechnicianHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const data = await getTechnicianHistory(user.id);

      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20 text-gray-400">
          Loading history...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Maintenance History
          </h1>
          <p className="text-gray-500 mt-1">
            View your completed repair records.
          </p>
        </div>

        {history.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-12 text-center text-gray-400 text-sm">
            No completed repairs found.
          </div>
        ) : (
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b text-left">
                  <th className="p-4 font-medium text-gray-500">Equipment</th>
                  <th className="p-4 font-medium text-gray-500">Issue</th>
                  <th className="p-4 font-medium text-gray-500">
                    Repair Notes
                  </th>
                  <th className="p-4 font-medium text-gray-500">
                    Completed Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800">
                      {item.maintenance_request?.equipment?.equipment_name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.maintenance_request?.issue_description}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.repair_notes || "No notes"}
                    </td>

                    <td className="p-4 text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
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

export default TechnicianHistory;