import axios from "axios";

export const getAdminStats =
async () => {

    const response =
    await axios.get(
        "/api/dashboard/admin"
    );

    return response.data;
};