const supabase = require("../config/supabase");

exports.assignTechnician = async (req, res) => {

    const {
        request_id,
        technician_id,
        assigned_by
    } = req.body;

    const { error: assignmentError } = await supabase
        .from("maintenance_assignments")
        .insert([
            {
                request_id,
                technician_id,
                assigned_by
            }
        ]);

    if (assignmentError) {
        return res.status(500).json({
            error: assignmentError.message
        });
    }

    const { error: requestError } = await supabase
        .from("maintenance_request")
        .update({
            status: "Assigned"
        })
        .eq("id", request_id);

    if (requestError) {
        return res.status(500).json({
            error: requestError.message
        });
    }

    res.json({
        message: "Technician assigned successfully"
    });
};