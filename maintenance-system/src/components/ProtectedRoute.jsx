import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function ProtectedRoute({children, allowedRole}){

    const {user, role, loading}=useAuth();

    if(loading){
        return <h1>Loading...</h1>;
    }

    if(!user){
        return <Navigate to="/login"/>;
    }

    if(role !== allowedRole){
        return <Navigate to="/login"/>;
    }

    return children;

}


export default ProtectedRoute;