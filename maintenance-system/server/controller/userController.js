const supabase = require("../config/supabase");

exports.getTechnicians = async (req, res) => {

    const { data, error } = await supabase
        .from("users")
        .select("id, full_name, email")
        .eq("role", "Technician");

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    res.json(data);
};

exports.getUsers = async (req, res) => {

    const { data, error } =
        await supabase
            .from("users")
            .select("*")
            .order("created_at", {
                ascending: false
            });

    if(error){
        return res.status(500).json({
            error:error.message
        });
    }

    res.json(data);
};

exports.updateRole = async (req, res) => {

    const { id } = req.params;

    const { role } = req.body;

    const { data, error } =
        await supabase
            .from("users")
            .update({
                role: role
            })
            .eq("id", id)
            .select();

    if(error){
        return res.status(500).json({
            error:error.message
        });
    }

    res.json(data);
};



exports.createUser = async (req,res)=>{
    const {
        email,
        password,
        full_name,
        role
    } = req.body;

    // Create authentication account
    const {
        data,
        error
    } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm:true
    });

    if(error){
        return res.status(500).json({
            error:error.message
        });
    }

    // Insert user profile
    const {error:userError}=

    await supabase
    .from("users")
    .insert([

        {
            id:data.user.id,

            email,

            full_name,

            role

        }

    ]);



    if(userError){

        return res.status(500).json({
            error:userError.message
        });

    }



    res.json({

        message:"User created successfully"

    });

};

exports.deleteUser = async (req, res) => {

    const { id } = req.params;

    const { error: authError } =
        await supabase.auth.admin.deleteUser(id);

    if (authError) {

        return res.status(500).json({
            error: authError.message
        });

    }

    res.json({
        message: "User deleted successfully"
    });

};