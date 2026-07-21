import Layout from "../../components/Layout";
import StatCard from "../../components/StatCard";
import StatusBadge from "../../components/StatusBadge";
import { useEffect, useState } from "react";

import { getAdminStats } from "../../services/dashboardService";
import { getRequests } from "../../services/maintenanceService";


function AdminDashboard() {

    const [stats, setStats] = useState({
        totalEquipment: 0,
        totalUsers: 0,
        pending: 0,
        assigned: 0,
        inProgress: 0,
        completed: 0
    });

    const [request, setRequests] = useState([])


    useEffect(() => {

        loadStats();
        loadRequests();

    }, []);



    async function loadStats() {

        try {

            const data = await getAdminStats();

            setStats(data);

        } catch(error) {

            console.error(error);

        }

    }

    async function loadRequests() {

    try {

        const data = await getRequests();

        setRequests(data);

    } catch(error) {

        console.error(error);

    }

}



    return (
        <Layout>

            <div
                className="
                bg-white
                rounded-xl
                shadow-sm
                border
                p-6
                "
            >

            <h1
                className="
                text-3xl
                font-bold
                mb-6
                "
            >
                Admin Dashboard
            </h1>


            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-6
                mb-8
                "
            >

                <StatCard
                    title="Equipment"
                    value={stats.totalEquipment}
                />

                <StatCard
                    title="Users"
                    value={stats.totalUsers}
                />

                <StatCard
                    title="Pending Requests"
                    value={stats.pending}
                />

                <StatCard
                    title="Completed Requests"
                    value={stats.completed}
                />

            </div>


                <h2
                    className="
                    text-xl
                    font-semibold
                    mb-4
                    "
                >
                    Recent Maintenance Requests
                </h2>

                <table
                    className="
                    w-full
                    "
                >

                    <thead>

                        <tr
                            className="
                            border-b
                            "
                        >

                            <th className="text-left py-3">
                                Equipment
                            </th>

                            <th className="text-left py-3">
                                Reporter
                            </th>

                            <th className="text-left py-3">
                                Priority
                            </th>

                            <th className="text-left py-3">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {request.map((request) => (

                            <tr
                                key={request.id}
                                className="
                                border-b
                                "
                            >

                                <td className="py-3">
                                    {
                                        request.equipment
                                            ?.equipment_name
                                    }
                                </td>

                                <td className="py-3">
                                    {
                                        request.users
                                            ?.full_name
                                    }
                                </td>

                                <td className="py-3">
                                    {request.priority}
                                </td>

                                <td className="py-3">

                                    <StatusBadge
                                        status={
                                            request.status
                                        }
                                    />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </Layout>
        

    );

}


export default AdminDashboard;