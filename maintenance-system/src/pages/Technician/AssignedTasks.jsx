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

  const filteredTasks = tasks.filter((task) => {
    const request = task.maintenance_request;

    const matchesSearch =
        request?.equipment?.equipment_name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
        statusFilter === "All" ||
        request?.status === statusFilter;

    const matchesPriority =
        priorityFilter === "All" ||
        request?.priority === priorityFilter;

    return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
    );

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

      {/* Search and Filter */}
        <div
        className="
        bg-white
        border
        rounded-2xl
        shadow-sm
        p-6
        mb-6
        "
        >

        <div
            className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            "
        >

            <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search equipment..."
            className="
            border
            rounded-lg
            px-4
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            "
            />


            <select
            value={statusFilter}
            onChange={(e) =>
                setStatusFilter(e.target.value)
            }
            className="
            border
            rounded-lg
            px-4
            py-2
            "
            >

            <option value="All">
                All Status
            </option>

            <option value="Assigned">
                Assigned
            </option>

            <option value="In Progress">
                In Progress
            </option>

            <option value="Completed">
                Completed
            </option>

            </select>


            <select
            value={priorityFilter}
            onChange={(e) =>
                setPriorityFilter(e.target.value)
            }
            className="
            border
            rounded-lg
            px-4
            py-2
            "
            >

            <option value="All">
                All Priority
            </option>

            <option value="Low">
                Low
            </option>

            <option value="Medium">
                Medium
            </option>

            <option value="High">
                High
            </option>

            <option value="Critical">
                Critical
            </option>

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
                        onClick={() =>
                          handleUpdate(task.request_id, "Completed")
                        }
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
    </Layout>
  );
}

export default AssignedTasks;