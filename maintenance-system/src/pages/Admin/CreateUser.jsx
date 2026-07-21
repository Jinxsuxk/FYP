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

        <div
            className="
            max-w-3xl
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
                    Create User
                </h1>

                <p
                    className="
                    text-slate-500
                    mt-2
                    "
                >
                    Create a new account and assign a role.
                </p>

            </div>


            <div
                className="
                bg-white
                border
                rounded-xl
                shadow-sm
                p-8
                "
            >

                <form
                    onSubmit={handleSubmit}
                    className="
                    space-y-6
                    "
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
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(
                                    e.target.value
                                )
                            }
                            required
                            className="
                            w-full
                            border
                            rounded-lg
                            px-4
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "
                        />

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
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            required
                            className="
                            w-full
                            border
                            rounded-lg
                            px-4
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "
                        />

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
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                            className="
                            w-full
                            border
                            rounded-lg
                            px-4
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "
                        />

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
                            User Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(
                                    e.target.value
                                )
                            }
                            className="
                            w-full
                            border
                            rounded-lg
                            px-4
                            py-3
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            "
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



                    <div
                        className="
                        pt-4
                        "
                    >

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            font-medium
                            px-6
                            py-3
                            rounded-lg
                            transition
                            disabled:bg-gray-400
                            disabled:cursor-not-allowed
                            "
                        >

                            {
                                loading
                                ? "Creating User..."
                                : "Create User"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    </Layout>

);

}

export default CreateUser;