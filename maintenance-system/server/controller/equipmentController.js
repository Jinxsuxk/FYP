const supabase = require("../config/supabase");

exports.getEquipment = async (req, res) => {
  const { data, error } = await supabase
    .from("equipment")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  res.json(data);
};

exports.createEquipment = async (req, res) => {

  const {
    equipment_name,
    equipment_type,
    serial_number,
    location,
    status
  } = req.body;

  const { data, error } = await supabase
    .from("equipment")
    .insert([
      {
        equipment_name,
        equipment_type,
        serial_number,
        location,
        status
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

exports.updateEquipment = async (req, res) => {

  const { id } = req.params;

  const { data, error } = await supabase
    .from("equipment")
    .update(req.body)
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.json(data);
};

exports.deleteEquipment = async (req, res) => {

  const { id } = req.params;

  const { error } = await supabase
    .from("equipment")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.json({
    message: "Equipment deleted"
  });
};