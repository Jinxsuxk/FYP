import {
  useEffect,
  useState
}
from "react";

import Layout
from "../components/Layout";

import {
  getNotifications,
  markAsRead
}
from "../services/notificationService";

import {
  supabase
}
from "../supabase/client";

function Notifications() {

  const [
    notifications,
    setNotifications
  ] = useState([]);

  useEffect(() => {

    loadNotifications();

  }, []);

  async function loadNotifications() {

    const {
      data: {
        user
      }
    } =
    await supabase.auth.getUser();

    const data =
      await getNotifications(
        user.id
      );

    setNotifications(data);

  }

  async function handleRead(id) {

    await markAsRead(id);

    loadNotifications();

  }

  const unreadCount =
    notifications.filter(
      notification =>
      !notification.is_read
    ).length;

  return (

    <Layout>

      {/* Header */}

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Notifications
        </h1>

        <span
          className="
          bg-red-100
          text-red-700
          px-4
          py-2
          rounded-lg
          font-medium
          "
        >
          {unreadCount}
          Unread
        </span>

      </div>

      {/* Summary Card */}

      <div
        className="
        bg-white
        border
        rounded-xl
        shadow-sm
        p-6
        mb-6
        "
      >

        <p
          className="
          text-gray-500
          "
        >
          Total Notifications
        </p>

        <p
          className="
          text-3xl
          font-bold
          mt-2
          "
        >
          {notifications.length}
        </p>

      </div>

      {/* Notification List */}

      <div
        className="
        bg-white
        border
        rounded-xl
        shadow-sm
        overflow-hidden
        "
      >

        {

          notifications.length === 0

          ?

          <div
            className="
            p-8
            text-center
            text-gray-500
            "
          >
            No notifications available
          </div>

          :

          notifications.map(
            (notification) => (

              <div

                key={notification.id}

                className={`
                p-5
                border-b
                flex
                justify-between
                items-center

                ${
                  notification.is_read
                  ?
                  "bg-white"
                  :
                  "bg-blue-50"
                }
                `}
              >

                <div>

                  <p
                    className="
                    font-medium
                    "
                  >

                    {
                      notification.message
                    }

                  </p>

                  <p
                    className="
                    text-sm
                    text-gray-500
                    mt-1
                    "
                  >

                    {
                      notification.is_read
                      ?
                      "Read"
                      :
                      "Unread"
                    }

                  </p>

                </div>

                {

                  !notification.is_read

                  &&

                  <button

                    onClick={() =>
                      handleRead(
                        notification.id
                      )
                    }

                    className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    "
                  >

                    Mark Read

                  </button>

                }

              </div>

            )
          )

        }

      </div>

    </Layout>

  );

}

export default Notifications;