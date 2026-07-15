import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const AuthContext = createContext();


export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        checkUser();


        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            async (event, session)=>{

                if(session?.user){
                    setUser(session.user);
                    await getRole(session.user.id);
                }
                else{
                    setUser(null);
                    setRole(null);
                }

            }
        );


        return () => {
            subscription.unsubscribe();
        };

    }, []);



    async function checkUser(){

        const {
            data:{
                session
            }
        } = await supabase.auth.getSession();


        if(session?.user){

            setUser(session.user);
            await getRole(session.user.id);

        }


        setLoading(false);
    }



    async function getRole(id){

        const {data,error}=await supabase
            .from("users")
            .select("role")
            .eq("id",id)
            .single();


        if(!error){
            setRole(data.role);
        }

    }



    return(
        <AuthContext.Provider
        value={{
            user,
            role,
            loading
        }}
        >
            {children}
        </AuthContext.Provider>
    )

}


export function useAuth(){

    return useContext(AuthContext);

}