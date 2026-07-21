import {
    FaHome,
    FaTools,
    FaClipboardList,
    FaHistory,
    FaUsers,
    FaBell,
    FaUser
}
from "react-icons/fa";


export const sidebarMenu = {


Admin:[

{
name:"Dashboard",
path:"/admin/dashboard",
icon:<FaHome/>
},

{
name:"Equipment",
path:"/admin/equipment",
icon:<FaTools/>
},

{
name:"Requests",
path:"/admin/maintenance",
icon:<FaClipboardList/>
},

{
name:"History",
path:"/admin/history",
icon:<FaHistory/>
},

{
name:"Users",
path:"/admin/users",
icon:<FaUsers/>
},

{
name:"Notifications",
path:"/notifications",
icon:<FaBell/>
},

{
name:"Profile",
path:"/profile",
icon:<FaUser/>
}

],



Staff:[

{
name:"Dashboard",
path:"/staff/dashboard",
icon:<FaHome/>
},

{
name:"Equipment",
path:"/staff/equipment",
icon:<FaTools/>
},

{
name:"Requests",
path:"/staff/maintenance",
icon:<FaClipboardList/>
},

{
name:"History",
path:"/staff/history",
icon:<FaHistory/>
},

{
name:"Notifications",
path:"/notifications",
icon:<FaBell/>
},

{
name:"Profile",
path:"/profile",
icon:<FaUser/>
}

],



Technician:[

{
name:"Dashboard",
path:"/technician/dashboard",
icon:<FaHome/>
},

{
name:"Assigned Tasks",
path:"/technician/tasks",
icon:<FaClipboardList/>
},

{
name:"History",
path:"/technician/history",
icon:<FaHistory/>
},

{
name:"Notifications",
path:"/notifications",
icon:<FaBell/>
},

{
name:"Profile",
path:"/profile",
icon:<FaUser/>
}

],



Student:[

{
name:"Dashboard",
path:"/student/dashboard",
icon:<FaHome/>
},

{
name:"Report Fault",
path:"/student/report-fault",
icon:<FaTools/>
},

{
name:"My Requests",
path:"/student/requests",
icon:<FaClipboardList/>
},

{
name:"Notifications",
path:"/notifications",
icon:<FaBell/>
},

{
name:"Profile",
path:"/profile",
icon:<FaUser/>
}

],



Lecturer:[

{
name:"Dashboard",
path:"/lecturer/dashboard",
icon:<FaHome/>
},

{
name:"Report Fault",
path:"/lecturer/report-fault",
icon:<FaTools/>
},

{
name:"My Requests",
path:"/lecturer/requests",
icon:<FaClipboardList/>
},

{
name:"Notifications",
path:"/notifications",
icon:<FaBell/>
},

{
name:"Profile",
path:"/profile",
icon:<FaUser/>
}

]


};