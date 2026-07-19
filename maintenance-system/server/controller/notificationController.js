const supabase = require("../config/supabase");

// Get user's notifications

exports.getNotifications = async (req, res) => {

    const { userId } = req.params;

    const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", {
            ascending: false
        });

    if(error){

        return res.status(500).json({
            error: error.message
        });

    }

    res.json(data);

};


// Mark notification as read

exports.markAsRead = async (req,res)=>{

    const { id } = req.params;

    const { data,error } = await supabase
        .from("notifications")
        .update({
            is_read:true
        })
        .eq("id",id)
        .select();



    if(error){

        return res.status(500).json({
            error:error.message
        });

    }


    res.json(data);

};