import axios from "axios";

export const getTechnicians = async () => {
    const response = await axios.get(
        "/api/users/technicians"
    );

    return response.data;
};