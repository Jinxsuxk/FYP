const supabase = require("../config/supabase");


exports.getHistory = async (req,res)=>{


    const {data,error}=await supabase
    .from("maintenance_logs")
    .select(`
        *,
        maintenance_request(
            issue_description,
            equipment(
                equipment_name
            )
        )
    `)
    .order(
        "created_at",
        {
            ascending:false
        }
    );


    if(error){

        return res.status(500).json({
            error:error.message
        });

    }


    res.json(data);

};