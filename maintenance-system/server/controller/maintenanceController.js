const supabase = require("../config/supabase");

exports.getRequests = async (req, res) => {

  const { data, error } = await supabase
    .from("maintenance_request")
    .select(`
      *,
      equipment (
        equipment_name
      ),
      users (
        full_name
      )
    `)
    .order("created_at", {
      ascending: false
    });

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.json(data);
};

exports.createRequest = async (req, res) => {

  const {
    equipment_id,
    reported_by,
    issue_description,
    priority
  } = req.body;

  const { data, error } = await supabase
    .from("maintenance_request")
    .insert([
      {
        equipment_id,
        reported_by,
        issue_description,
        priority
      }
    ])
    .select();

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.status(201).json(data);
};

exports.updateRequestStatus = async (req, res) => {

    const { id } = req.params;

    const {
        status,
        repair_notes,
        technicianId
    } = req.body;


    const { data, error } = await supabase
        .from("maintenance_request")
        .update({
            status: status
        })
        .eq("id", id)
        .select();


    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }


    // Save repair history when completed
    if (status?.toLowerCase() === "completed") {
        const { data: logData, error: logError } =
            await supabase
                .from("maintenance_logs")
                .insert([
                    {
                        request_id: id,
                        technician_id: technicianId,
                        repair_notes: repair_notes,
                        status: status,
                        completed_at: new Date()
                    }
                ])
                .select();

        if (logError) {
            console.error(logError);

            return res.status(500).json({
                error: logError.message
            });
        }
    }

    res.json(data);

};