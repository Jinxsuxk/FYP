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

        <div>

            <h1>
                Admin Dashboard
            </h1>


            <div>


                <h2>
                    Equipment
                </h2>

                <p>
                    {stats.totalEquipment}
                </p>


            </div>



            <div>


                <h2>
                    Users
                </h2>

                <p>
                    {stats.totalUsers}
                </p>


            </div>



            <div>


                <h2>
                    Pending Requests
                </h2>

                <p>
                    {stats.pending}
                </p>


            </div>



            <div>


                <h2>
                    Assigned Requests
                </h2>

                <p>
                    {stats.assigned}
                </p>


            </div>



            <div>


                <h2>
                    In Progress
                </h2>

                <p>
                    {stats.inProgress}
                </p>


            </div>



            <div>


                <h2>
                    Completed Repairs
                </h2>

                <p>
                    {stats.completed}
                </p>


            </div>



        </div>

    );

}


export default AdminDashboard;