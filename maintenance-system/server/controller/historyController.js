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

exports.getTechnicianHistory =
async(req,res)=>{


const {
technicianId
}
=
req.params;



const {
data,
error
}
=
await supabase

.from(
"maintenance_logs"
)

.select(`

*,

maintenance_request(

issue_description,

equipment(
equipment_name
)

)

`)

.eq(
"technician_id",
technicianId
)

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

exports.getSystemHistory =
async (req,res)=>{

const { data, error } =
await supabase

.from("maintenance_logs")

.select(`
*,

maintenance_request(
    issue_description,

    equipment(
        equipment_name
    ),

    users!maintenance_request_reported_by_fkey(
        full_name
    )
),

technician:users(
    full_name
)

`)

.order(
"completed_at",
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