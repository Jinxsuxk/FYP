import axios from "axios";

export const assignTechnician = async (assignmentData) => {

    const response = await axios.post(
        "/api/assignments",
        assignmentData
    );

    return response.data;
};