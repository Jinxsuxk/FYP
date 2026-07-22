import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import PriorityBadge from "../../components/PriorityBadge";
import StatusBadge from "../../components/StatusBadge";

import { getRequests } from "../../services/maintenanceService";
import { getTechnicians } from "../../services/userService";
import { assignTechnician } from "../../services/assignmentService";
import { supabase } from "../../supabase/client";

function MaintenanceRequests() {
  const [requests, setRequests] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnicians, setSelectedTechnicians] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const requestData = await getRequests();
    const technicianData = await getTechnicians();

    setRequests(requestData);
    setTechnicians(technicianData);
  }

  async function handleAssign(requestId) {
    const technicianId = selectedTechnicians[requestId];

    if (!technicianId) {
      alert("Please select technician");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await assignTechnician({
      request_id: requestId,
      technician_id: technicianId,
      assigned_by: user.id,
    });

    alert("Technician assigned");

    loadData();
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.equipment?.equipment_name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || request.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Maintenance Requests</h1>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
          {requests.length} Requests
        </span>
      </div>

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
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        {filteredRequests.length === 0 ? (
          <p className="text-sm text-gray-400 py-12 text-center">
            No requests match your search or filters.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b text-left">
                <th className="p-4 font-medium text-gray-500">Equipment</th>
                <th className="p-4 font-medium text-gray-500">Reporter</th>
                <th className="p-4 font-medium text-gray-500">Issue</th>
                <th className="p-4 font-medium text-gray-500">Priority</th>
                <th className="p-4 font-medium text-gray-500">Status</th>
                <th className="p-4 font-medium text-gray-500">
                  Assign Technician
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">
                    {request.equipment?.equipment_name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {request.users?.full_name}
                  </td>

                  <td className="p-4 font-medium text-gray-800">
                    {request.issue_description}
                  </td>

                  <td className="p-4">
                    <PriorityBadge priority={request.priority} />
                  </td>

                  <td className="p-4">
                    <StatusBadge status={request.status} />
                  </td>

                  <td className="p-4">
                    {request.status === "Pending" ? (
                      <div className="flex gap-2">
                        <select
                          value={selectedTechnicians[request.id] || ""}
                          onChange={(e) =>
                            setSelectedTechnicians({
                              ...selectedTechnicians,
                              [request.id]: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select Technician</option>

                          {technicians.map((tech) => (
                            <option key={tech.id} value={tech.id}>
                              {tech.full_name}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={() => handleAssign(request.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Assign
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">
                        Already assigned
                      </span>
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

export default MaintenanceRequests;