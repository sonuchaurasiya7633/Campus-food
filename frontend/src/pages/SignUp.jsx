import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
const SignUp = () => {
  const primaryColor = "#f97316"; // Softer orange

  const bgColor = "#fff7f2"; // Warm background
  const borderColor = "#e5e7eb"; // Neutral border

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()


  const handleSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, password, mobile, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data))
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (!mobile) {
      return setErr("mobile no is required");
    }
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true }
      );
       dispatch(setUserData(data))
      setErr("");
    } catch (error) {
      setErr(error?.response?.data?.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 
      bg-gradient-to-br from-orange-100 via-white to-orange-200"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white/70 backdrop-blur-xl border border-white/40 
        rounded-3xl shadow-xl w-full max-w-md p-6 sm:p-8 
        transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
        style={{ border: `1px solid ${borderColor}` }}
      >
        {/* Logo / Title */}
        <h1
          className="text-4xl font-extrabold mb-3 text-center 
          bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
        >
          CampusBites
        </h1>
        <p className="text-gray-600 mb-8 text-center text-base leading-relaxed">
          Create your account to{" "}
          <span className="font-semibold text-gray-800">
            enjoy tasty food at your desk 
          </span>
        </p>

        {/* Fullname */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
            focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
            transition-all duration-300 text-sm sm:text-base"
            placeholder="Enter your full name"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
            focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
            transition-all duration-300 text-sm sm:text-base"
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Mobile */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Mobile
          </label>
          <input
            type="number"
            className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
            focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
            transition-all duration-300 text-sm sm:text-base"
            placeholder="Enter your mobile number"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
              focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
              transition-all duration-300 text-sm sm:text-base"
              placeholder="Enter your password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 
              text-gray-500 hover:text-orange-500 transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? (
                <FaRegEye size={18} />
              ) : (
                <FaEyeSlash size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Role
          </label>
          <div className="flex gap-3">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                type="button"
                className="flex-1 border rounded-xl px-3 py-2 
                text-center cursor-pointer font-medium transition-all duration-300 
                hover:scale-105 text-sm sm:text-base capitalize"
                onClick={() => setRole(r)}
                style={
                  role === r
                    ? {
                        background:
                          "linear-gradient(to right, #f97316, #ec4899)",
                        color: "white",
                        boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)",
                      }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: primaryColor,
                        backgroundColor: "white",
                      }
                }
              >
                {r.replace(/([A-Z])/g, " $1").trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 
          rounded-xl px-5 py-3 font-semibold shadow-lg shadow-orange-200/50 
          transition-all duration-300 text-white text-sm sm:text-base
          bg-gradient-to-r from-orange-500 to-pink-500
          hover:from-orange-600 hover:to-pink-600 hover:shadow-xl cursor-pointer"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader
              size={20}
              color="transparent" 
              cssOverride={{
                border: "3px solid transparent",
                borderTop: "3px solid",
                borderImage:
                  "conic-gradient(#ec4899, #6366f1, #22c55e, #f59e0b) 1",
                borderRadius: "50%",
              }}
            />
          ) : (
            " Sign Up"
          )}
        </button>

        {err && (
          <div className="flex items-center justify-center mt-3">
            <p className="text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg px-4 py-2 shadow-sm animate-shake">
              ⚠️ {err}
            </p>
          </div>
        )}

        {/* Google SignUp */}
        <button
          className="w-full flex items-center justify-center gap-3 mt-4 
          px-5 py-3 border rounded-xl bg-white/80 
          text-gray-700 font-medium shadow-md 
          hover:shadow-lg hover:bg-gray-50 transition-all duration-300 
          text-sm sm:text-base cursor-pointer"
          style={{ border: `1px solid ${borderColor}` }}
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={22} />
          <span>Sign up with Google</span>
        </button>

        {/* Redirect to SignIn */}
        <p
          className="text-center mt-6 text-sm sm:text-base text-gray-700"
          onClick={() => navigate("/signin")}
        >
          Already have an account?{" "}
          <span className="text-orange-500 font-semibold hover:underline cursor-pointer">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
