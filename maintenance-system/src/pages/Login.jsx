import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function login() {

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password
            });

        if (error) {
            alert(error.message);
            return;
        }

        const { data: userData, error: profileError } = await supabase
            .from("users")
            .select("role")
            .eq("id", data.user.id)
            .single();

        if (profileError) {
            console.log(profileError);
            alert(profileError.message);
            return;
        }

        if (userData.role === "Admin") {
            navigate("/admin/dashboard",
            {
            replace:true
            });
        }

        if (userData.role === "Staff") {
            navigate("/staff/dashboard",
            {
            replace:true
            });
        }

        if (userData.role === "Technician") {
            navigate("/technician/dashboard",
            {
            replace:true
            });
        }

        if (userData.role === "Lecturer") {
            navigate("/lecturer/dashboard",
            {
            replace:true
            });
        }

        if (userData.role === "Student") {
            navigate("/student/dashboard",{
                replace:true
            });
        }
    }

    return (

        <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-slate-100
        "
        >

        <div
            className="
            bg-white
            shadow-xl
            rounded-xl
            p-8
            w-full
            max-w-md
            "
        >

            <h1
            className="
            text-3xl
            font-bold
            text-center
            mb-2
            "
            >
            DEMMS
            </h1>

            <p
            className="
            text-center
            text-gray-500
            mb-6
            "
            >
            Digital Equipment Maintenance
            Management System
            </p>

            <Input
            label="Email"
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
            />

            <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) =>
                setPassword(e.target.value)
            }
            />

            <Button onClick={login}>
            Login
            </Button>

        </div>

        </div>

    );
}

export default Login;