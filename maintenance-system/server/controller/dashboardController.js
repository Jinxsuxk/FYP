const supabase = require("../config/supabase");

exports.getAdminStats = async (req, res) => {

    try {

        const [
            equipment,
            users,
            pending,
            assigned,
            inProgress,
            completed
        ] = await Promise.all([

            supabase
                .from("equipment")
                .select("*", {
                    count: "exact",
                    head: true
                }),

            supabase
                .from("users")
                .select("*", {
                    count: "exact",
                    head: true
                }),

            supabase
                .from("maintenance_request")
                .select("*", {
                    count: "exact",
                    head: true
                })
                .eq("status", "Pending"),

            supabase
                .from("maintenance_request")
                .select("*", {
                    count: "exact",
                    head: true
                })
                .eq("status", "Assigned"),

            supabase
                .from("maintenance_request")
                .select("*", {
                    count: "exact",
                    head: true
                })
                .eq("status", "In Progress"),

            supabase
                .from("maintenance_request")
                .select("*", {
                    count: "exact",
                    head: true
                })
                .eq("status", "Completed")

        ]);

        res.json({
            totalEquipment: equipment.count,
            totalUsers: users.count,
            pending: pending.count,
            assigned: assigned.count,
            inProgress: inProgress.count,
            completed: completed.count
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};