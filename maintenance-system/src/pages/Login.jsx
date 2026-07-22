import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { FaTools, FaCheckCircle, FaClipboardList, FaUsersCog } from "react-icons/fa";

import Input from "../components/Input";
import Button from "../components/Button";

const ROLE_ROUTES = {
  Admin: "/admin/dashboard",
  Staff: "/staff/dashboard",
  Technician: "/technician/dashboard",
  Lecturer: "/lecturer/dashboard",
  Student: "/student/dashboard",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function login() {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      const { data: userData, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.log(profileError);
        alert(profileError.message);
        return;
      }

      const destination = ROLE_ROUTES[userData.role];

      if (destination) {
        navigate(destination, { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#F4F5FB]">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-600 to-indigo-900 text-white p-12 flex-col justify-between overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-white/5" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
            <FaTools size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">DEMMS</span>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Streamlined equipment
            <br />
            maintenance for campus
            <br />
            facilities.
          </h1>
          <p className="text-indigo-100 max-w-md">
            Report faults, assign technicians, and track repair history — all
            in one place.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-indigo-50">
              <FaCheckCircle className="text-indigo-300 shrink-0" />
              <span>Real-time equipment status tracking</span>
            </div>
            <div className="flex items-center gap-3 text-indigo-50">
              <FaUsersCog className="text-indigo-300 shrink-0" />
              <span>Instant technician assignment</span>
            </div>
            <div className="flex items-center gap-3 text-indigo-50">
              <FaClipboardList className="text-indigo-300 shrink-0" />
              <span>Full maintenance history & reporting</span>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-sm text-indigo-200">
          Development of a Web-Based Digital Equipment Maintenance
          Management System
        </p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile-only brand mark */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <FaTools size={16} />
            </div>
            <span className="text-lg font-bold text-gray-900">DEMMS</span>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome back
            </h2>
            <p className="text-gray-500 mb-8">
              Sign in to your account to continue.
            </p>

            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="mt-6">
              <Button onClick={login} disabled={loading} className="w-full">
                {loading ? "Signing in..." : "Login"}
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Having trouble signing in? Contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;