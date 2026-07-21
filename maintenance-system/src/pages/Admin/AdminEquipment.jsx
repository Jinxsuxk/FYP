import { useEffect, useState } from "react";

import Layout from "../../components/Layout";

import { getEquipment }
from "../../services/equipmentService";

import EquipmentStatusBadge
from "../../components/EquipmentStatusBadge";

function AdminEquipment() {

    const [equipment, setEquipment] =
        useState([]);

    useEffect(() => {

        loadEquipment();

    }, []);

    async function loadEquipment() {

        try {

            const data =
                await getEquipment();

            setEquipment(data);

        } catch (error) {

            console.error(error);

        }

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
                        Equipment Overview
                    </h1>

                    <p
                        className="
                        text-slate-500
                        mt-2
                        "
                    >
                        View all registered equipment.
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
                                    Type
                                </th>

                                <th className="text-left p-4">
                                    Serial Number
                                </th>

                                <th className="text-left p-4">
                                    Location
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {equipment.map((item) => (

                                <tr
                                    key={item.id}
                                    className="
                                    border-t
                                    hover:bg-slate-50
                                    "
                                >

                                    <td className="p-4 font-medium">
                                        {item.equipment_name}
                                    </td>

                                    <td className="p-4">
                                        {item.equipment_type}
                                    </td>

                                    <td className="p-4">
                                        {item.serial_number}
                                    </td>

                                    <td className="p-4">
                                        {item.location}
                                    </td>

                                    <td className="p-4">

                                        <EquipmentStatusBadge
                                            status={item.status}
                                        />

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

export default AdminEquipment;