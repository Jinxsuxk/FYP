import axios from "axios";


export const getHistory = async()=>{

    const response =
    await axios.get(
        "/api/history"
    );


    return response.data;

};

export const getTechnicianHistory =
async(technicianId)=>{


const response =
await axios.get(

`/api/history/technician/${technicianId}`

);


return response.data;


};

export const getSystemHistory =
async()=>{

const response =
await axios.get(
"/api/history/system"
);

return response.data;

};