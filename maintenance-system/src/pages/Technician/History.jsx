import { useEffect, useState } from "react";

import Layout from "../../components/Layout";

import { supabase } from "../../supabase/client";

import {
    getTechnicianHistory
}
from "../../services/historyService";


function TechnicianHistory() {


    const [history, setHistory] =
        useState([]);

    const [loading, setLoading] =
        useState(true);



    useEffect(() => {

        loadHistory();

    }, []);




    async function loadHistory() {

        try {

            setLoading(true);


            const {
                data:{
                    user
                }
            }
            =
            await supabase.auth.getUser();



            const data =
            await getTechnicianHistory(
                user.id
            );


            setHistory(data);


        } catch(error){

            console.error(error);

        }
        finally{

            setLoading(false);

        }

    }




    if(loading){

        return (

            <Layout>

                <div
                className="
                text-center
                py-20
                text-gray-500
                "
                >

                    Loading history...

                </div>

            </Layout>

        );

    }




    return (

        <Layout>


        <div
        className="
        max-w-7xl
        mx-auto
        "
        >


            <div
            className="
            mb-8
            "
            >

                <h1
                className="
                text-3xl
                font-bold
                text-slate-800
                "
                >

                    Maintenance History

                </h1>


                <p
                className="
                text-slate-500
                mt-2
                "
                >

                    View your completed repair records.

                </p>


            </div>





            {
                history.length === 0

                ?

                (

                <div
                className="
                bg-white
                border
                rounded-xl
                p-10
                text-center
                text-gray-500
                "
                >

                    No completed repairs found.

                </div>

                )


                :

                (

                <div
                className="
                bg-white
                border
                rounded-xl
                shadow-sm
                overflow-hidden
                "
                >


                <table
                className="
                w-full
                "
                >


                <thead
                className="
                bg-slate-100
                "
                >

                <tr>


                    <th
                    className="
                    text-left
                    p-4
                    "
                    >
                        Equipment
                    </th>


                    <th
                    className="
                    text-left
                    p-4
                    "
                    >
                        Issue
                    </th>


                    <th
                    className="
                    text-left
                    p-4
                    "
                    >
                        Repair Notes
                    </th>


                    <th
                    className="
                    text-left
                    p-4
                    "
                    >
                        Completed Date
                    </th>


                </tr>


                </thead>




                <tbody>


                {
                    history.map(
                    (item)=>(


                    <tr
                    key={item.id}
                    className="
                    border-t
                    hover:bg-slate-50
                    "
                    >



                    <td
                    className="
                    p-4
                    font-medium
                    "
                    >

                    {
                    item
                    .maintenance_request
                    ?.equipment
                    ?.equipment_name
                    }

                    </td>




                    <td
                    className="
                    p-4
                    text-gray-600
                    "
                    >

                    {
                    item
                    .maintenance_request
                    ?.issue_description
                    }

                    </td>




                    <td
                    className="
                    p-4
                    text-gray-600
                    "
                    >

                    {
                    item.repair_notes
                    ||
                    "No notes"
                    }

                    </td>




                    <td
                    className="
                    p-4
                    text-gray-500
                    "
                    >

                    {
                    new Date(
                        item.created_at
                    )
                    .toLocaleDateString()
                    }

                    </td>



                    </tr>


                    ))

                }


                </tbody>


                </table>


                </div>

                )

            }



        </div>


        </Layout>

    );

}


export default TechnicianHistory;