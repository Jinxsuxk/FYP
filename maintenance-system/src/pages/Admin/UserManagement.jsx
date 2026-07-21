import Layout from "../../components/Layout";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    getUsers,
    updateRole,
    deleteUser
}
from "../../services/userService";

function UserManagement() {

    const [users, setUsers] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [selectedRoles,
        setSelectedRoles] =
        useState({});

    useEffect(() => {

        loadUsers();

    }, []);

    async function loadUsers() {

        try {

            const data =
                await getUsers();

            setUsers(data);

            const roleMap = {};

            data.forEach((user) => {

                roleMap[user.id] =
                    user.role;

            });

            setSelectedRoles(
                roleMap
            );

        }

        catch (error) {

            console.error(error);

        }

    }

    async function handleRoleChange(
        userId
    ) {

        try {

            await updateRole(

                userId,

                selectedRoles[userId]

            );

            alert(
                "Role updated successfully"
            );

            loadUsers();

        }

        catch (error) {

            console.error(error);

            alert(
                "Failed to update role"
            );

        }

    }

    const filteredUsers =
        users.filter(
            (user) =>

                user.full_name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                user.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    async function handleDelete(
        userId,
        fullName
    ){

        const confirmed =
            window.confirm(
                `Delete ${fullName}?`
            );

        if(!confirmed){
            return;
        }

        try{

            await deleteUser(userId);

            alert(
                "User deleted successfully"
            );

            loadUsers();

        }
        catch(error){

            console.error(error);

            alert(
                "Failed to delete user"
            );

        }

    }

    return (

        <Layout>

            <div
                className="
                flex
                justify-between
                items-center
                mb-6
                "
            >

                <h1
                    className="
                    text-3xl
                    font-bold
                    "
                >
                    User Management
                </h1>

                <div
                    className="
                    flex
                    gap-3
                    "
                >

                    <span
                        className="
                        bg-blue-100
                        text-blue-700
                        px-4
                        py-2
                        rounded-lg
                        font-medium
                        "
                    >
                        {users.length}
                        {" "}Users
                    </span>

                    <Link
                        to="/admin/users/create"
                        className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        "
                    >
                        Create User
                    </Link>

                </div>

            </div>

            {/* Search */}

            <div
                className="
                bg-white
                border
                rounded-xl
                shadow-sm
                p-6
                mb-6
                "
            >

                <label
                    className="
                    block
                    mb-2
                    text-sm
                    font-medium
                    "
                >
                    Search Users
                </label>

                <input

                    value={search}

                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }

                    placeholder="Search by name or email"

                    className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-2
                    "
                />

            </div>

            {/* User Table */}

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
                        bg-slate-50
                        "
                    >

                        <tr>

                            <th
                                className="
                                text-left
                                p-4
                                "
                            >
                                Name
                            </th>

                            <th
                                className="
                                text-left
                                p-4
                                "
                            >
                                Email
                            </th>

                            <th
                                className="
                                text-left
                                p-4
                                "
                            >
                                Role
                            </th>

                            <th
                                className="
                                text-left
                                p-4
                                "
                            >
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filteredUsers.map(
                                (user) => (

                                    <tr

                                        key={user.id}

                                        className="
                                        border-b
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
                                                user.full_name
                                            }
                                        </td>

                                        <td
                                            className="
                                            p-4
                                            "
                                        >
                                            {
                                                user.email
                                            }
                                        </td>

                                        <td
                                            className="
                                            p-4
                                            "
                                        >

                                            <select

                                                value={
                                                    selectedRoles[
                                                    user.id
                                                    ] || ""
                                                }

                                                onChange={(e) =>
                                                    setSelectedRoles({

                                                        ...selectedRoles,

                                                        [user.id]:
                                                            e.target.value

                                                    })
                                                }

                                                className="
                                                border
                                                rounded-lg
                                                px-3
                                                py-2
                                                "
                                            >

                                                <option value="Admin">
                                                    Admin
                                                </option>

                                                <option value="Staff">
                                                    Staff
                                                </option>

                                                <option value="Technician">
                                                    Technician
                                                </option>

                                                <option value="Lecturer">
                                                    Lecturer
                                                </option>

                                                <option value="Student">
                                                    Student
                                                </option>

                                            </select>

                                        </td>

                                        <td
                                            className="
                                            p-4
                                            "
                                        >

                                            <button

                                                onClick={() =>
                                                    handleRoleChange(
                                                        user.id
                                                    )
                                                }

                                                className="
                                                bg-blue-600
                                                hover:bg-blue-700
                                                text-white
                                                px-4
                                                py-2
                                                rounded-lg
                                                "
                                            >

                                                Update

                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        user.id,
                                                        user.full_name
                                                    )
                                                }
                                                className="
                                                bg-red-600
                                                hover:bg-red-700
                                                text-white
                                                px-3
                                                py-2
                                                rounded-lg
                                                "
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </Layout>

    );

}

export default UserManagement;