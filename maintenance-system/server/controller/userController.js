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