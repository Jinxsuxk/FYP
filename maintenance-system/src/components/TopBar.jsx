import { useEffect, useState } from "react";
import { FaBell, FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabase/client";
import { getNotifications } from "../services/notificationService";

function getInitials(name) {
  if (!name) return "?";

  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

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
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 relative z-10">
      <div>
        <p className="text-sm text-gray-400">Welcome back,</p>
        <p className="text-sm font-semibold text-gray-800 -mt-0.5">
          {userInfo?.full_name || "User"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <button
          onClick={() => navigate("/notifications")}
          className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
        >
          <FaBell size={18} />

          {notificationCount > 0 && (
            <span className="absolute top-1 right-1.5 bg-red-500 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="w-px h-8 bg-gray-100" />

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
              {getInitials(userInfo?.full_name)}
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-gray-800 leading-tight">
                {userInfo?.full_name || "User"}
              </p>
              <p className="text-xs text-gray-400 leading-tight capitalize">
                {userInfo?.role}
              </p>
            </div>

            <FaChevronDown size={10} className="text-gray-400 ml-1" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                <p className="text-sm font-medium text-gray-800">
                  {userInfo?.full_name}
                </p>
                <p className="text-xs text-gray-400">{userInfo?.email}</p>
              </div>

              <button
                onClick={() => navigate("/profile")}
                className="w-full flex items-center gap-3 text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaUser size={13} className="text-gray-400" />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <FaSignOutAlt size={13} />
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