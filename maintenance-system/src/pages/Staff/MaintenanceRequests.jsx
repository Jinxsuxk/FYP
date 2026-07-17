import { useEffect, useState } from "react";

import { getRequests }
from "../../services/maintenanceService";

import { getTechnicians }
from "../../services/userService";

import { assignTechnician }
from "../../services/assignmentService";

import { supabase }
from "../../supabase/client";

function MaintenanceRequests() {

  const [requests, setRequests] = useState([]);

  const [technicians, setTechnicians] = useState([]);

  const [selectedTechnicians,
    setSelectedTechnicians] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    const requestData =
      await getRequests();

    const technicianData =
      await getTechnicians();

    setRequests(requestData);

    setTechnicians(technicianData);
  }

  async function handleAssign(
    requestId
  ) {

    const technicianId =
      selectedTechnicians[requestId];

    if (!technicianId) {
      alert("Select technician");
      return;
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();

    await assignTechnician({
      request_id: requestId,
      technician_id: technicianId,
      assigned_by: user.id
    });

    alert("Assigned successfully");

    loadData();
  }

  return (
    <div>

      <h1>
        Maintenance Requests
      </h1>

      <table border="1">

        <thead>
          <tr>
            <th>Equipment</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assign</th>
          </tr>
        </thead>

        <tbody>

          {requests.map((request) => (

            <tr key={request.id}>

              <td>
                {
                  request.equipment
                    ?.equipment_name
                }
              </td>

              <td>
                {request.priority}
              </td>

              <td>
                {request.status}
              </td>

              <td>

                <select
                  value={
                    selectedTechnicians[
                      request.id
                    ] || ""
                  }
                  onChange={(e) =>
                    setSelectedTechnicians({
                      ...selectedTechnicians,
                      [request.id]:
                        e.target.value
                    })
                  }
                >

                  <option value="">
                    Select Technician
                  </option>

                  {
                    technicians.map(
                      (tech) => (
                        <option
                          key={tech.id}
                          value={tech.id}
                        >
                          {tech.full_name}
                        </option>
                      )
                    )
                  }

                </select>

                <button
                  onClick={() =>
                    handleAssign(
                      request.id
                    )
                  }
                >
                  Assign
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default MaintenanceRequests;