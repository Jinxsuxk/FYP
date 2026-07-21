import axios from "axios";

export const getAdminStats =
async () => {

    const response =
    await axios.get(
        "/api/dashboard/admin"
    );

    return response.data;
};

export const getStaffStats =
async () => {

const response =
await axios.get(
"/api/dashboard/staff-stats"
);

return response.data;

};

export const getTechnicianStats =
async (technicianId) => {

const response =
await axios.get(

`/api/dashboard/technician-stats/${technicianId}`

);

return response.data;

};