import { useState } from "react";

import Layout from "../../components/Layout";

import { createUser } from "../../services/userService";

function CreateUser() {

    const [fullName, setFullName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [role, setRole] = useState("Student");

    const [loading, setLoading] = useState(false);


    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            await createUser({
                full_name: fullName,
                email,
                password,
                role
            });

            alert("User created successfully");

            setFullName("");
            setEmail("");
            setPassword("");
            setRole("Student");

        } catch (error) {

            console.error(error);

            alert(
                error?.response?.data?.error ||
                "Failed to create user"
            );

        } finally {

            setLoading(false);

        }

    }


    return (

        <Layout>

            <h1>Create User</h1>

            <form onSubmit={handleSubmit}>

                <div>

                    <label>
                        Full Name
                    </label>

                    <br />

                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) =>
                            setFullName(
                                e.target.value
                            )
                        }
                        required
                    />

                </div>

                <br />

                <div>

                    <label>
                        Email
                    </label>

                    <br />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        required
                    />

                </div>

                <br />

                <div>

                    <label>
                        Password
                    </label>

                    <br />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        required
                    />

                </div>

                <br />

                <div>

                    <label>
                        Role
                    </label>

                    <br />

                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(
                                e.target.value
                            )
                        }
                    >

                        <option value="Admin">
                            Admin
                        </option>

                        <option value="Facility Staff">
                            Facility Staff
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

                </div>

                <br />

                <button
                    type="submit"
                    disabled={loading}
                >

                    {
                        loading
                        ? "Creating..."
                        : "Create User"
                    }

                </button>

            </form>

        </Layout>

    );

}

export default CreateUser;