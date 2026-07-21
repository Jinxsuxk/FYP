import { useEffect, useState } from "react";
import { getEquipment } from "../../services/equipmentService";
import { createRequest } from "../../services/maintenanceService";
import { supabase } from "../../supabase/client";
import Layout from "../../components/Layout";

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
        <Layout>
            <div className="max-w-3xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Report Equipment Fault
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Submit a maintenance request for faulty equipment.
                    </p>
                </div>

                <div
                    className="
                    bg-white
                    rounded-xl
                    shadow-sm
                    border
                    border-slate-200
                    p-6
                    "
                >

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div>

                            <label
                                className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                                "
                            >
                                Equipment
                            </label>

                            <select
                                value={form.equipment_id}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        equipment_id: e.target.value
                                    })
                                }
                                className="
                                w-full
                                border
                                border-slate-300
                                rounded-lg
                                px-4
                                py-2.5
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                "
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

                        <div>

                            <label
                                className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                                "
                            >
                                Priority
                            </label>

                            <select
                                value={form.priority}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        priority: e.target.value
                                    })
                                }
                                className="
                                w-full
                                border
                                border-slate-300
                                rounded-lg
                                px-4
                                py-2.5
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                "
                            >
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

                        <div>

                            <label
                                className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                                "
                            >
                                Issue Description
                            </label>

                            <textarea
                                rows="5"
                                value={form.issue_description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        issue_description:
                                            e.target.value
                                    })
                                }
                                placeholder="Describe the problem in detail..."
                                className="
                                w-full
                                border
                                border-slate-300
                                rounded-lg
                                px-4
                                py-3
                                resize-none
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                "
                            />
                        </div>

                        <div
                            className="
                            flex
                            justify-end
                            "
                        >

                            <button
                                type="submit"
                                className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                font-medium
                                px-6
                                py-3
                                rounded-lg
                                transition
                                "
                            >
                                Submit Request
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </Layout>
    );
}

export default ReportFault;
