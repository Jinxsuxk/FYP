import { useEffect, useState } from "react";

import { getEquipment } from "../../services/equipmentService";
import { createRequest } from "../../services/maintenanceService";
import { supabase } from "../../supabase/client";
import Layout from "../../components/Layout";

function ReportFault() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    equipment_id: "",
    priority: "Medium",
    issue_description: "",
  });

  useEffect(() => {
    loadEquipment();
  }, []);

  async function loadEquipment() {
    try {
      const data = await getEquipment();
      setEquipment(data);
    } catch (error) {
      console.error(error);
      setFormError("Failed to load equipment list. Please refresh the page.");
    }
  }

  function updateForm(changes) {
    setForm({ ...form, ...changes });
    setFormError("");
    setSuccessMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.equipment_id) {
      setFormError("Please select the equipment you're reporting.");
      return;
    }

    if (!form.issue_description.trim()) {
      setFormError("Please describe the issue before submitting.");
      return;
    }

    if (form.issue_description.trim().length < 10) {
      setFormError(
        "Please provide a bit more detail about the issue (at least 10 characters)."
      );
      return;
    }

    setFormError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setFormError("Your session has expired. Please log in again.");
        return;
      }

      const { error: requestError } = await createRequest({
        equipment_id: form.equipment_id,
        reported_by: user.id,
        issue_description: form.issue_description.trim(),
        priority: form.priority,
      });

      if (requestError) {
        console.error(requestError);
        setFormError("Failed to submit request. Please try again.");
        return;
      }

      setSuccessMessage("Maintenance request submitted successfully.");

      setForm({
        equipment_id: "",
        priority: "Medium",
        issue_description: "",
      });
    } catch (error) {
      console.error(error);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const selectedEquipment = equipment.find(
    (item) => item.id === form.equipment_id
  );

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Report Equipment Fault
          </h1>
          <p className="text-gray-500 mt-1">
            Submit a maintenance request for faulty equipment.
          </p>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment
              </label>

              <select
                value={form.equipment_id}
                onChange={(e) =>
                  updateForm({ equipment_id: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Equipment</option>

                {equipment.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.equipment_name}
                    {item.location ? ` — ${item.location}` : ""}
                  </option>
                ))}
              </select>

              {/* Confirms the exact unit, since equipment names can repeat across locations */}
              {selectedEquipment?.location && (
                <p className="text-xs text-gray-400 mt-1.5">
                  Location: {selectedEquipment.location}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>

              <select
                value={form.priority}
                onChange={(e) => updateForm({ priority: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Description
              </label>

              <textarea
                rows="5"
                value={form.issue_description}
                onChange={(e) =>
                  updateForm({ issue_description: e.target.value })
                }
                placeholder="Describe the problem in detail..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {formError && (
              <p className="text-sm text-red-600">{formError}</p>
            )}

            {successMessage && (
              <p className="text-sm text-emerald-600">{successMessage}</p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ReportFault;