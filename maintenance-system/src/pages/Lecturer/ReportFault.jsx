import { useEffect, useState } from "react";
import { getEquipment } from "../../services/equipmentService";
import { createRequest } from "../../services/maintenanceService";
import { supabase } from "../../supabase/client";

function ReportFault() {
    const [equipment, setEquipment] = useState([]);

    const [form, setForm] = useState({
    equipment_id: "",
    priority: "Medium",
    issue_description: ""
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
    }
    }

    async function handleSubmit(e) {
    e.preventDefault();

    try {
        const {
        data: { user }
        } = await supabase.auth.getUser();

        await createRequest({
        equipment_id: form.equipment_id,
        reported_by: user.id,
        issue_description: form.issue_description,
        priority: form.priority
        });

        alert("Maintenance request submitted");

        setForm({
        equipment_id: "",
        priority: "Medium",
        issue_description: ""
        });

    } catch (error) {
        console.error(error);
        alert("Failed to submit request");
    }
    }

    return (
    <div>
        <h1>Report Equipment Fault</h1>

        <form onSubmit={handleSubmit}>

        <div>
            <label>Equipment</label>

            <select
            value={form.equipment_id}
            onChange={(e) =>
                setForm({
                ...form,
                equipment_id: e.target.value
                })
            }
            >
            <option value="">
                Select Equipment
            </option>

            {equipment.map((item) => (
                <option
                key={item.id}
                value={item.id}
                >
                {item.equipment_name}
                </option>
            ))}
            </select>
        </div>

        <br />

        <div>
            <label>Priority</label>

            <select
            value={form.priority}
            onChange={(e) =>
                setForm({
                ...form,
                priority: e.target.value
                })
            }
            >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
            </select>
        </div>

        <br />

        <div>
            <label>Description</label>

            <textarea
            rows="5"
            value={form.issue_description}
            onChange={(e) =>
                setForm({
                ...form,
                issue_description: e.target.value
                })
            }
            />
        </div>

        <br />

        <button type="submit">
            Submit Request
        </button>

        </form>
    </div>
    );
}

export default ReportFault;
