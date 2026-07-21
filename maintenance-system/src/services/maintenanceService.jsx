import axios from "axios";

export const createRequest = async (requestData) => {
  const response = await axios.post(
    "/api/maintenance_request",
    requestData
  );

  return response.data;
};

export const getRequests = async () => {
  const response = await axios.get(
    "/api/maintenance_request"
  );

  return response.data;
};

export const getLecturerStats =
async (userId) => {

const response =
await axios.get(

`/api/maintenance_request/lecturer-stats/${userId}`

);

return response.data;

};

export const getMyRequests =
async(userId)=>{

const response =
await axios.get(

`/api/maintenance_request/my-requests/${userId}`

);

return response.data;

};