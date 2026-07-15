import { useState } from "react";
import { supabase } from "../supabase/client";

function Register(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function register(){
        const {data,error} = await supabase.auth.signUp({
            email,
            password
        });

        if(error){
            alert(error.message);
        }
        else{
            alert("Account created");
        }
    }


    return(
        <div>

        <h1>Register</h1>

        <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={register}>
        Register
        </button>

        </div>
    )

}

export default Register;