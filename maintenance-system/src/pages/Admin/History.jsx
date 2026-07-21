import { useEffect, useState } from "react";

import Layout from "../../components/Layout";

import { supabase } from "../../supabase/client";
import { getSystemHistory } from "../../services/historyService";

function AdminHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const data = await getSystemHistory();
    setHistory(data);
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">System History</h1>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4">Equipment</th>
              <th className="text-left p-4">Issue</th>
              <th className="text-left p-4">Reported By</th>
              <th className="text-left p-4">Technician</th>
              <th className="text-left p-4">Notes</th>
              <th className="text-left p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-b hover:bg-slate-50">
                <td className="p-4">
                  {item.maintenance_request?.equipment?.equipment_name}
                </td>

                <td className="p-4">
                  {item.maintenance_request?.issue_description}
                </td>

                <td className="p-4">
                  {item.maintenance_request?.users?.full_name}
                </td>

                <td className="p-4">{item.technician?.full_name}</td>

                <td className="p-4">{item.repair_notes}</td>

                <td className="p-4">
                  {new Date(item.completed_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default AdminHistory;