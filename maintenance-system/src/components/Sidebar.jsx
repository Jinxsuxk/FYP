import { Link } from "react-router-dom";

import {
    FaHome,
    FaUsers,
    FaTools,
    FaHistory,
    FaClipboardList
}
from "react-icons/fa";

function Sidebar() {

    return (

        <div
            style={{
                width: "250px",
                background: "#1f2937",
                color: "white",
                padding: "20px"
            }}
        >

            <h2>
                DEMMS
            </h2>

            <hr />

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                }}
            >

                <Link
                    to="/admin/dashboard"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    <FaHome />
                    {" "}
                    Dashboard
                </Link>

                <Link
                    to="/equipment"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    <FaTools />
                    {" "}
                    Equipment
                </Link>

                <Link
                    to="/staff/maintenance"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    <FaClipboardList />
                    {" "}
                    Requests
                </Link>

                <Link
                    to="/history"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    <FaHistory />
                    {" "}
                    History
                </Link>

                <Link
                    to="/admin/users"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    <FaUsers />
                    {" "}
                    Users
                </Link>

                <Link
                    to="/admin/users/create"
                    style={{
                        color: "white",
                        textDecoration: "none"
                    }}
                >
                    Create User
                </Link>

                <Link
                    to="/notifications"
                    style={{
                    color:"white",
                    textDecoration:"none"
                    }}
                    >
                    🔔 Notifications
                </Link>

            </div>

        </div>

    );

}

export default Sidebar;