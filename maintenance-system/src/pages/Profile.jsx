import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { supabase } from "../supabase/client";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
    setFullName(data.full_name || "");
  }

  async function updateProfile() {
    if (!fullName.trim()) {
      alert("Full name cannot be empty");
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({ full_name: fullName.trim() })
      .eq("id", profile.id);

    if (error) {
      alert(error.message);
      return;
    }
    alert("Profile updated");

    loadProfile();
  }

  async function changePassword() {
    if (!newPassword) {
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password changed successfully");

    setNewPassword("");
  }

  if (!profile) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white border rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              value={profile.email}
              disabled
              className="w-full border rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Role</label>
            <input
              value={profile.role}
              disabled
              className="w-full border rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          <button
            onClick={updateProfile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        />

        <button
          onClick={changePassword}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Change Password
        </button>
      </div>
    </Layout>
  );
}

export default Profile;