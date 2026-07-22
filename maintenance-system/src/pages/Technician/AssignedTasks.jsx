import { useEffect, useState } from "react";

import { supabase } from "../../supabase/client";

import Layout from "../../components/Layout";
import StatusBadge from "../../components/StatusBadge";
import PriorityBadge from "../../components/PriorityBadge";
import StatCard from "../../components/StatCard";

import { FaClipboardCheck, FaWrench } from "react-icons/fa";

import {
  getAssignedTasks,
  updateRequestStatus,
} from "../../services/technicianService";

function AssignedTasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [technicianId, setTechnicianId] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Repair-notes modal state (replaces window.prompt)
  const [completingTask, setCompletingTask] = useState(null);
  const [repairNotes, setRepairNotes] = useState("");
  const [notesError, setNotesError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    await updateRequestStatus(requestId, status, "", technicianId);
    loadTasks();
  }

  function openCompleteModal(requestId) {
    setCompletingTask(requestId);
    setRepairNotes("");
    setNotesError("");
  }

  function closeCompleteModal() {
    setCompletingTask(null);
    setRepairNotes("");
    setNotesError("");
  }

  async function handleConfirmComplete() {
    if (!repairNotes.trim()) {
      setNotesError("Please enter repair notes before completing this task.");
      return;
    }

    try {
      setSubmitting(true);

      await updateRequestStatus(
        completingTask,
        "Completed",
        repairNotes.trim(),
        technicianId
      );

      closeCompleteModal();
      loadTasks();
    } catch (error) {
      console.error(error);
      setNotesError("Failed to update status. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const assignedCount = tasks.filter(
    (task) => task.maintenance_request?.status === "Assigned"
  ).length;

  const inProgressCount = tasks.filter(
    (task) => task.maintenance_request?.status === "In Progress"
  ).length;

  const filteredTasks = tasks.filter((task) => {
    const request = task.maintenance_request;

    const matchesSearch = request?.equipment?.equipment_name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || request?.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || request?.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assigned Tasks</h1>
          <p className="text-gray-500 mt-1">
            Update progress on the repairs assigned to you.
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
          {tasks.length} Tasks
        </span>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatCard
          icon={<FaClipboardCheck size={20} />}
          label="Assigned"
          value={assignedCount}
          tint="blue"
        />
        <StatCard
          icon={<FaWrench size={20} />}
          label="In Progress"
          value={inProgressCount}
          tint="amber"
        />
      </div>

      {/* Search and Filter */}
      <div className="bg-white border rounded-2xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search equipment..."
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="All">All Status</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="All">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        {filteredTasks.length === 0 ? (
          <p className="text-sm text-gray-400 py-12 text-center">
            No assigned tasks match your search.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b text-left">
                <th className="p-4 font-medium text-gray-500">Equipment</th>
                <th className="p-4 font-medium text-gray-500">Issue</th>
                <th className="p-4 font-medium text-gray-500">Priority</th>
                <th className="p-4 font-medium text-gray-500">Status</th>
                <th className="p-4 font-medium text-gray-500">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">
                    {task.maintenance_request?.equipment?.equipment_name}
                  </td>

                  <td className="p-4 max-w-sm text-gray-600">
                    {task.maintenance_request?.issue_description}
                  </td>

                  <td className="p-4">
                    <PriorityBadge
                      priority={task.maintenance_request?.priority}
                    />
                  </td>

                  <td className="p-4">
                    <StatusBadge status={task.maintenance_request?.status} />
                  </td>

                  <td className="p-4">
                    {task.maintenance_request?.status === "Assigned" && (
                      <button
                        onClick={() =>
                          handleUpdate(task.request_id, "In Progress")
                        }
                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Start Work
                      </button>
                    )}

                    {task.maintenance_request?.status === "In Progress" && (
                      <button
                        onClick={() => openCompleteModal(task.request_id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Complete
                      </button>
                    )}

                    {task.maintenance_request?.status === "Completed" && (
                      <span className="text-sm text-gray-400">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Repair Notes Modal */}
      {completingTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Complete Task
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Add repair notes before marking this task as completed.
            </p>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Repair Notes
            </label>

            <textarea
              rows="4"
              value={repairNotes}
              onChange={(e) => {
                setRepairNotes(e.target.value);
                setNotesError("");
              }}
              placeholder="Describe what was repaired or replaced..."
              className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {notesError && (
              <p className="text-sm text-red-600 mt-2">{notesError}</p>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeCompleteModal}
                disabled={submitting}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmComplete}
                disabled={submitting}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg font-medium transition-colors"
              >
                {submitting ? "Saving..." : "Mark Completed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default AssignedTasks;