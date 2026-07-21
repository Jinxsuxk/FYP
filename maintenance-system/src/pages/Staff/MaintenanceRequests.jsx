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

  const filteredRequests =
    requests.filter((request) => {

    const matchesSearch =
    request.equipment
    ?.equipment_name
    ?.toLowerCase()
    .includes(
    search.toLowerCase()
    );

    const matchesStatus =
    statusFilter === "All"
    ||
    request.status === statusFilter;

    const matchesPriority =
    priorityFilter === "All"
    ||
    request.priority === priorityFilter;

    return (
      matchesSearch
      &&
      matchesStatus
      &&
      matchesPriority
    );

    });

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Maintenance Requests</h1>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
          {requests.length} Requests
        </span>
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-6 mb-6">

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
          "
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
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

          <option value="Pending">
            Pending
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
            setPriorityFilter(
              e.target.value
            )
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

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4">Equipment</th>
              <th className="text-left p-4">Reporter</th>
              <th className="text-left p-4">Priority</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Assign Technician</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.map((request) => (
              <tr
                key={request.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="p-4">{request.equipment?.equipment_name}</td>

                <td className="p-4">{request.users?.full_name}</td>

                <td className="p-4">
                  <PriorityBadge priority={request.priority} />
                </td>

                <td className="p-4">
                  <StatusBadge status={request.status} />
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <select
                      value={selectedTechnicians[request.id] || ""}
                      onChange={(e) =>
                        setSelectedTechnicians({
                          ...selectedTechnicians,
                          [request.id]: e.target.value,
                        })
                      }
                      className="border rounded-lg px-3 py-2"
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
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Assign
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default MaintenanceRequests;