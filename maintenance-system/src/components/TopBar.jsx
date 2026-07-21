import { useEffect, useState } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabase/client";
import { getNotifications } from "../services/notificationService";

function Topbar() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("users")
      .select("full_name, role")
      .eq("id", user.id)
      .single();

    setUserInfo({
      email: user.email,
      full_name: data?.full_name,
      role: data?.role,
    });

    const notifications = await getNotifications(user.id);

    const unread = notifications.filter((item) => !item.is_read);

    setNotificationCount(unread.length);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-gray-800">DEMMS</h2>

      <div className="flex items-center gap-6">
        {/* Notification */}
        <button
          onClick={() => navigate("/notifications")}
          className="relative text-gray-700 hover:text-blue-600 transition"
        >
          <FaBell size={22} />

          {notificationCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3"
          >
            <FaUserCircle size={32} className="text-slate-600" />

            <div className="text-right">
              <p className="font-medium text-gray-800">{userInfo?.full_name}</p>
              <p className="text-sm text-gray-500">{userInfo?.email}</p>
            </div>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;