import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

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
            navigate("/admin/dashboard");
        }

        if (userData.role === "Staff") {
            navigate("/staff/dashboard");
        }

        if (userData.role === "Technician") {
            navigate("/technician/dashboard");
        }

        if (userData.role === "Lecturer") {
            navigate("/lecturer/dashboard");
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={login}>
                Login
            </button>
        </div>
    );
}

export default Login;