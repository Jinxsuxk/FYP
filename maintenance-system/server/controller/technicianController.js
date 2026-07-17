const supabase = require("../config/supabase");

exports.getAssignedTasks = async (req, res) => {

  const { technicianId } = req.params;

  const { data, error } = await supabase
    .from("maintenance_assignments")
    .select(`
      *,
      maintenance_request (
        *,
        equipment (
          equipment_name
        )
      )
    `)
    .eq("technician_id", technicianId);

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.json(data);
};