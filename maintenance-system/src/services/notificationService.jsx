import axios from "axios";

export const getNotifications = async(userId)=>{
    const response =
    await axios.get(
        `/api/notifications/${userId}`
    );

    return response.data;

};


export const markAsRead = async(id)=>{


    const response =
    await axios.put(
        `/api/notifications/${id}/read`
    );


    return response.data;

};