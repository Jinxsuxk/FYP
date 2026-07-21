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


exports.getStaffStats =
async (req, res) => {

try {

const {
count: equipmentCount
}
=
await supabase
.from("equipment")
.select("*", {
count: "exact",
head: true
});

const {
count: openRequests
}
=
await supabase
.from("maintenance_request")
.select("*", {
count: "exact",
head: true
})
.neq(
"status",
"Completed"
);

const {
count: assignedTasks
}
=
await supabase
.from("maintenance_request")
.select("*", {
count: "exact",
head: true
})
.eq(
"status",
"Assigned"
);

const {
count: completedRepairs
}
=
await supabase
.from("maintenance_logs")
.select("*", {
count: "exact",
head: true
});

res.json({

equipmentCount,

openRequests,

assignedTasks,

completedRepairs

});

}
catch(error){

res.status(500).json({
error:error.message
});

}

};

exports.getTechnicianStats =
async (req, res) => {

try {

const {
technicianId
}
=
req.params;



const {
data: assignedData
}
=
await supabase

.from(
"maintenance_assignments"
)

.select(`
id,
maintenance_request(
status
)
`)

.eq(
"technician_id",
technicianId
);



const assignedTasks =
assignedData.filter(
item =>
item.maintenance_request?.status
===
"Assigned"
).length;



const inProgress =
assignedData.filter(
item =>
item.maintenance_request?.status
===
"In Progress"
).length;



const completedRepairs =
assignedData.filter(
item =>
item.maintenance_request?.status
===
"Completed"
).length;



res.json({

assignedTasks,

inProgress,

completedRepairs

});

}
catch(error){

res.status(500).json({
error:error.message
});

}

};