import Layout from "../../components/Layout";
import { useEffect, useState } from "react";

import {
    getUsers,
    updateRole
} from "../../services/userService";

function UserManagement() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {

        try {

            const data =
                await getUsers();

            setUsers(data);

        } catch (error) {

            console.error(error);

        }
    }

    async function handleRoleChange(
        userId,
        role
    ) {

        try {

            await updateRole(
                userId,
                role
            );

            alert(
                "Role updated successfully"
            );

            loadUsers();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to update role"
            );

        }
    }

    return (
        <Layout>
            <div>

                <h1>
                    User Management
                </h1>

                <table border="1">

                    <thead>

                        <tr>

                            <th>
                                Name
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Role
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user.id}>

                                <td>
                                    {user.full_name}
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>

                                    <select
                                        defaultValue={
                                            user.role
                                        }
                                        id={`role-${user.id}`}
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

                                <td>

                                    <button
                                        onClick={() =>
                                            handleRoleChange(
                                                user.id,
                                                document.getElementById(
                                                    `role-${user.id}`
                                                ).value
                                            )
                                        }
                                    >
                                        Update
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </Layout>

    );
}

export default UserManagement;