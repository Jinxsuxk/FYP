import axios from "axios";

export const getTechnicians = async () => {
    const response = await axios.get(
        "/api/users/technicians"
    );

    return response.data;
};

export const getUsers = async () => {

    const response =
        await axios.get(
            "/api/users"
        );

    return response.data;
};


export const updateRole = async (
    id,
    role
) => {

    const response =
        await axios.put(
            `/api/users/${id}/role`,
            {
                role
            }
        );

    return response.data;
};

export const createUser = async(userData)=>{

    const response = await axios.post(

        "/api/users/create",

    userData

    );


    return response.data;

};

export const deleteUser =
async (id) => {

    const response =
        await axios.delete(
            `/api/users/${id}`
        );

    return response.data;

};