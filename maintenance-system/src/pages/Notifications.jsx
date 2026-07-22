import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import StatCard from "../components/StatCard";

import { getNotifications, markAsRead } from "../services/notificationService";
import { supabase } from "../supabase/client";

import { FaBell } from "react-icons/fa";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const data = await getNotifications(user.id);

    setNotifications(data);
  }

  async function handleRead(id) {
    await markAsRead(id);
    loadNotifications();
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  return (
    <Layout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">
            Stay up to date on your maintenance activity.
          </p>
        </div>

        {unreadCount > 0 && (
          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium">
            {unreadCount} Unread
          </span>
        )}
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          icon={<FaBell size={20} />}
          label="Total Notifications"
          value={notifications.length}
          tint="blue"
        />
      </div>

      {/* Notification List */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-400 py-12 text-center">
            No notifications available.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-5 flex justify-between items-center transition-colors ${
                  notification.is_read ? "bg-white" : "bg-indigo-50/60"
                }`}
              >
                <div className="flex items-start gap-3">
                  {!notification.is_read && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                  )}

                  <div>
                    <p className="font-medium text-gray-800">
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {notification.is_read ? "Read" : "Unread"}
                    </p>
                  </div>
                </div>

                {!notification.is_read && (
                  <button
                    onClick={() => handleRead(notification.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shrink-0"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Notifications;