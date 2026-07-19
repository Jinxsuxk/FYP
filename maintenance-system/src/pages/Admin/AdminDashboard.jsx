import Layout from "../../components/Layout";
import { useEffect, useState } from "react";

import { getAdminStats } from "../../services/dashboardService";


function AdminDashboard() {

    const [stats, setStats] = useState({
        totalEquipment: 0,
        totalUsers: 0,
        pending: 0,
        assigned: 0,
        inProgress: 0,
        completed: 0
    });


    useEffect(() => {

        loadStats();

    }, []);



    async function loadStats() {

        try {

            const data = await getAdminStats();

            setStats(data);

        } catch(error) {

            console.error(error);

        }

    }



    return (
        <Layout>
            <div>
                <h1>
                    Admin Dashboard
                </h1>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(200px,1fr))",
                        gap: "20px"
                    }}
                >

                    <div className="card">
                        Equipment
                        <h2>{stats.totalEquipment}</h2>
                    </div>

                    <div className="card">
                        Users
                        <h2>{stats.totalUsers}</h2>
                    </div>

                    <div className="card">
                        Pending
                        <h2>{stats.pending}</h2>
                    </div>

                    <div className="card">
                        Assigned
                        <h2>{stats.assigned}</h2>
                    </div>

                    <div className="card">
                        In Progress
                        <h2>{stats.inProgress}</h2>
                    </div>

                    <div className="card">
                        Completed
                        <h2>{stats.completed}</h2>
                    </div>

                </div>

                
            </div>
        </Layout>

    );

}


export default AdminDashboard;