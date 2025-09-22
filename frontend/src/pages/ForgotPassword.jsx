import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
      setStep(2);
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
      setStep(3);
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      setErr("");
      console.log(result);
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4 ">
          <IoArrowBackOutline
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {step === 1 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2 text-sm"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
                focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
                transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <button
              className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 
                rounded-xl px-5 py-3 font-semibold shadow-lg shadow-orange-200/50 
                transition-all duration-300 text-white text-sm sm:text-base
                bg-gradient-to-r from-orange-500 to-pink-500
                hover:from-orange-600 hover:to-pink-600 hover:shadow-xl cursor-pointer"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader
                  size={20}
                  color="transparent" // transparent so gradient visible
                  cssOverride={{
                    border: "3px solid transparent",
                    borderTop: "3px solid",
                    borderImage:
                      "conic-gradient(#ec4899, #6366f1, #22c55e, #f59e0b) 1", // pink→indigo→green→amber
                    borderRadius: "50%",
                  }}
                />
              ) : (
                " Send OTP"
              )}
            </button>
            {err && (
              <div className="flex items-center justify-center mt-3">
                <p className="text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg px-4 py-2 shadow-sm animate-shake">
                  ⚠️ {err}
                </p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-2 text-sm"
              >
                OTP
              </label>
              <input
                id="otp"
                type="text"
                className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
                focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
                transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />
            </div>
            <button
              className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 
                rounded-xl px-5 py-3 font-semibold shadow-lg shadow-orange-200/50 
                transition-all duration-300 text-white text-sm sm:text-base
                bg-gradient-to-r from-orange-500 to-pink-500
                hover:from-orange-600 hover:to-pink-600 hover:shadow-xl cursor-pointer"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader
                  size={20}
                  color="transparent" // transparent so gradient visible
                  cssOverride={{
                    border: "3px solid transparent",
                    borderTop: "3px solid",
                    borderImage:
                      "conic-gradient(#ec4899, #6366f1, #22c55e, #f59e0b) 1", // pink→indigo→green→amber
                    borderRadius: "50%",
                  }}
                />
              ) : (
                "Verify"
              )}
            </button>
            {err && (
              <div className="flex items-center justify-center mt-3">
                <p className="text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg px-4 py-2 shadow-sm animate-shake">
                  ⚠️ {err}
                </p>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-2 text-sm"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
                focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
                transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-2 text-sm"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
                focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
                transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>
            <button
              className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 
                rounded-xl px-5 py-3 font-semibold shadow-lg shadow-orange-200/50 
                transition-all duration-300 text-white text-sm sm:text-base
                bg-gradient-to-r from-orange-500 to-pink-500
                hover:from-orange-600 hover:to-pink-600 hover:shadow-xl cursor-pointer"
              onClick={handleResetPassword}
            >
              {loading ? (
                <ClipLoader
                  size={20}
                  color="transparent" // transparent so gradient visible
                  cssOverride={{
                    border: "3px solid transparent",
                    borderTop: "3px solid",
                    borderImage:
                      "conic-gradient(#ec4899, #6366f1, #22c55e, #f59e0b) 1", // pink→indigo→green→amber
                    borderRadius: "50%",
                  }}
                />
              ) : (
                " Reset Password"
              )}
            </button>
            {err && (
              <div className="flex items-center justify-center mt-3">
                <p className="text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg px-4 py-2 shadow-sm animate-shake">
                  ⚠️ {err}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
