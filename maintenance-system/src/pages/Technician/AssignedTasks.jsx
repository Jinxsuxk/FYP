import { useEffect, useState } from "react";

import { supabase } from "../../supabase/client";

import Layout from "../../components/Layout";
import StatusBadge from "../../components/StatusBadge";
import PriorityBadge from "../../components/PriorityBadge";

import {
  getAssignedTasks,
  updateRequestStatus,
} from "../../services/technicianService";

function AssignedTasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [technicianId, setTechnicianId] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setTechnicianId(user.id);

    const data = await getAssignedTasks(user.id);

    setTasks(data);
  }

  async function handleUpdate(requestId, status) {
    let notes = "";

    if (status === "Completed") {
      notes = prompt("Enter repair notes:");
    }

    await updateRequestStatus(requestId, status, notes, technicianId);

    alert("Status updated");

    loadTasks();
  }

  const assignedCount = tasks.filter(
    (task) => task.maintenance_request?.status === "Assigned"
  ).length;

  const inProgressCount = tasks.filter(
    (task) => task.maintenance_request?.status === "In Progress"
  ).length;

  const filteredTasks = tasks.filter((task) =>
    task.maintenance_request?.equipment?.equipment_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assigned Tasks</h1>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
          {tasks.length} Tasks
        </span>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">Assigned</p>
          <p className="text-3xl font-bold">{assignedCount}</p>
        </div>

        <div className="bg-white border rounded-xl shadow-sm p-6">
          <p className="text-gray-500">In Progress</p>
          <p className="text-3xl font-bold">{inProgressCount}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border rounded-xl shadow-sm p-6 mb-6">
        <label className="block mb-2 text-sm font-medium">
          Search Equipment
        </label>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search equipment..."
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Tasks Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4">Equipment</th>
              <th className="text-left p-4">Issue</th>
              <th className="text-left p-4">Priority</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-slate-50">
                <td className="p-4">
                  {task.maintenance_request?.equipment?.equipment_name}
                </td>

                <td className="p-4 max-w-sm">
                  {task.maintenance_request?.issue_description}
                </td>

                <td className="p-4">
                  <PriorityBadge priority={task.maintenance_request?.priority} />
                </td>

                <td className="p-4">
                  <StatusBadge status={task.maintenance_request?.status} />
                </td>

                <td className="p-4">
                  {task.maintenance_request?.status === "Assigned" && (
                    <button
                      onClick={() => handleUpdate(task.request_id, "In Progress")}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                    >
                      Start Work
                    </button>
                  )}

                  {task.maintenance_request?.status === "In Progress" && (
                    <button
                      onClick={() => handleUpdate(task.request_id, "Completed")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default AssignedTasks;