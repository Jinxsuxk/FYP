import axios from "axios";

export const getEquipment = async () => {
  const response = await axios.get("/api/equipment");
  return response.data;
};

export const addEquipment = async (requestData) => {
  const response = await axios.post(
    "/api/equipment",
    requestData
  );
};

export const deleteEquipment = async (id) => {

    const response = await axios.delete(
        `/api/equipment/${id}`
    );

    return response.data;
};

