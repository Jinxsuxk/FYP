import { useEffect, useState } from "react";

import Layout from "../../components/Layout";

import {
    getRequests
}
from "../../services/maintenanceService";

function AdminMaintenance() {

    const [requests, setRequests] =
        useState([]);

    useEffect(() => {

        loadRequests();

    }, []);

    async function loadRequests() {

        try {

            const data =
                await getRequests();

            setRequests(data);

        } catch (error) {

            console.error(error);

        }

    }

    function StatusBadge({ status }) {

        const styles = {

            "Pending":
            "bg-yellow-100 text-yellow-700",

            "Assigned":
            "bg-blue-100 text-blue-700",

            "In Progress":
            "bg-orange-100 text-orange-700",

            "Completed":
            "bg-green-100 text-green-700"

        };

        return (

            <span
                className={`
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
                ${styles[status] || ""}
                `}
            >
                {status}
            </span>

        );

    }

    return (

        <Layout>

            <div className="max-w-7xl mx-auto">

                <div className="mb-8">

                    <h1
                        className="
                        text-3xl
                        font-bold
                        text-slate-800
                        "
                    >
                        Maintenance Requests
                    </h1>

                    <p
                        className="
                        text-slate-500
                        mt-2
                        "
                    >
                        Monitor all maintenance requests.
                    </p>

                </div>

                <div
                    className="
                    bg-white
                    rounded-xl
                    border
                    shadow-sm
                    overflow-hidden
                    "
                >

                    <table className="w-full">

                        <thead
                            className="
                            bg-slate-100
                            "
                        >

                            <tr>

                                <th className="text-left p-4">
                                    Equipment
                                </th>

                                <th className="text-left p-4">
                                    Priority
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                                <th className="text-left p-4">
                                    Issue
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {requests.map((request) => (

                                <tr
                                    key={request.id}
                                    className="
                                    border-t
                                    hover:bg-slate-50
                                    "
                                >

                                    <td className="p-4 font-medium">

                                        {
                                            request.equipment
                                            ?.equipment_name
                                        }

                                    </td>

                                    <td className="p-4">
                                        {request.priority}
                                    </td>

                                    <td className="p-4">

                                        <StatusBadge
                                            status={
                                                request.status
                                            }
                                        />

                                    </td>

                                    <td className="p-4">

                                        {
                                            request.issue_description
                                        }

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>

    );

}

export default AdminMaintenance;