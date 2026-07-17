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