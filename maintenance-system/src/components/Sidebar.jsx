import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

import { supabase } from "../supabase/client";
import { sidebarMenu } from "./sidebarMenu";

function Sidebar() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  useEffect(() => {
    loadRole();
  }, []);

  async function loadRole() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    setRole(data.role);
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    localStorage.clear();

    navigate("/login");
  }

  const links = sidebarMenu[role] || [];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">DEMMS</h1>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;