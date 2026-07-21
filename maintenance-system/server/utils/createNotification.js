const supabase = require("../config/supabase");


async function createNotification(
    userId,
    message
){

    const { data, error } =
    await supabase
        .from("notifications")
        .insert([
            {
                user_id: userId,
                message: message
            }
        ]);


    if(error){

        console.error(
            "Notification error:",
            error.message
        );

    }


    return data;

}


module.exports = createNotification;