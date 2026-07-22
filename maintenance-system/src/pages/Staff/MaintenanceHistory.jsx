import Layout from "../../components/Layout";
import StatCard from "../../components/StatCard";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { FaHistory, FaFileDownload } from "react-icons/fa";

import { getHistory } from "../../services/historyService";

function MaintenanceHistory() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const data = await getHistory();
    setHistory(data);
  }

  function exportHistoryPdf() {
    const doc = new jsPDF();

    doc.text("Maintenance History Report", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Equipment", "Issue", "Notes"]],
      body: history.map((item) => [
        item.maintenance_request?.equipment?.equipment_name || "",
        item.maintenance_request?.issue_description || "",
        item.repair_notes || "",
      ]),
    });

    doc.save("maintenance-history.pdf");
  }

  const filteredHistory = history.filter((item) =>
    item.maintenance_request?.equipment?.equipment_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Maintenance History
          </h1>
          <p className="text-gray-500 mt-1">
            A record of all completed equipment repairs.
          </p>
        </div>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
          {history.length}
          {" "}Completed Repairs
        </span>

        <button
          onClick={exportHistoryPdf}
          className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
        >
          <FaFileDownload size={14} />
          Export PDF
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border rounded-2xl shadow-sm p-6 mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Search Equipment
        </label>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search equipment..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* History Table */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        {filteredHistory.length === 0 ? (
          <p className="text-sm text-gray-400 py-12 text-center">
            No completed repairs match your search.
          </p>
        ) : (
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
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">
                    {item.maintenance_request?.equipment?.equipment_name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {item.maintenance_request?.issue_description}
                  </td>

                  <td className="p-4 max-w-md text-gray-600">
                    {item.repair_notes}
                  </td>

                  <td className="p-4 text-gray-600">
                    {new Date(item.created_at).toLocaleDateString()}
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

export default MaintenanceHistory;