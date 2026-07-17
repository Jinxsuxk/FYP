import axios from "axios";


export const getAssignedTasks = async (technicianId)=>{

    const response = await axios.get(
        `/api/tasks/${technicianId}`
    );

    return response.data;

};



export const updateRequestStatus = async (
    requestId,
    status,
    repair_notes,
    technicianId
)=>{

    const response = await axios.put(
        `/api/maintenance_request/${requestId}/status`,
        {
            status,
            repair_notes,
            technicianId
        }
    );


    return response.data;

};