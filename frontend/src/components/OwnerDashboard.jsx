import React from "react";
import { useSelector } from "react-redux";
import { FaPen, FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OwnerItemCard from "./OwnerItemCard";

const OwnerDashboard = () => {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();


  

  return (
    <div className="min-h-[90vh] px-4 bg-gradient-to-br from-[#fff5f5] via-[#fff] to-[#fff0e6] relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-tr from-[#ff4d2d]/30 to-[#ff9a44]/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#ff4d2d]/20 to-[#ff9a44]/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Show if no shop */}
      {!myShopData && (
        <div className="flex justify-center items-center min-h-[90vh]">
          <div className="relative w-full max-w-xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl p-10 text-center transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_12px_45px_rgba(255,77,45,0.35)]">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-[#ff4d2d] to-[#ff9a44] p-5 rounded-2xl shadow-lg animate-bounce">
                <FaUtensils className="text-white w-14 h-14 sm:w-16 sm:h-16" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#ff4d2d] to-[#ff9a44] bg-clip-text text-transparent tracking-tight mb-4">
              Add Your Restaurant
            </h2>

            {/* Subtitle */}
            <p className="text-gray-700 mb-8 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
              Be part of our{" "}
              <span className="font-semibold text-[#ff4d2d]">
                exclusive food network
              </span>{" "}
              & reach{" "}
              <span className="underline decoration-amber-500">
                thousands of hungry students
              </span>{" "}
              daily.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/create-edit-shop")}
              className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-300 ease-out 
                       bg-gradient-to-r from-[#ff4d2d] to-[#ff9a44] rounded-full shadow-lg
                       hover:shadow-[0_8px_35px_rgba(255,77,45,0.55)] hover:scale-105"
            >
              <span className="relative z-10"> Get Started</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff9a44] to-[#ff4d2d] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      )}

      {/* Show if shop exists */}
      {myShopData && (
        <div className="w-full flex flex-col items-start gap-6 px-4 sm:px-6 mt-6">
          <h1 className="text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 font-bold">
            <FaUtensils className=" text-[#ff4d2d] w-10 h-10" />
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#ff4d2d] to-[#ff9a44] bg-clip-text text-transparent">
              {myShopData.name}
            </span>
          </h1>

          {/* Shop Card */}
          <div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative">
            <div
              className="absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
              onClick={() => navigate("/create-edit-shop")}
            >
              <FaPen size={20} />
            </div>
            <img
              src={myShopData.image}
              alt=""
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {myShopData.name}
              </h1>
              <p className="text-gray-600 mb-2">
                {myShopData.city}, {myShopData.state}
              </p>
              <p className="text-gray-500">{myShopData.address}</p>
            </div>
          </div>

          {/* No Items */}
          {myShopData.items.length === 0 && (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="relative w-full max-w-xl bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl p-10 text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_12px_45px_rgba(255,77,45,0.35)]">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-[#ff4d2d] to-[#ff9a44] p-5 rounded-2xl shadow-lg animate-bounce">
                    <FaUtensils className="text-white w-14 h-14 sm:w-16 sm:h-16" />
                  </div>
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#ff4d2d] to-[#ff9a44] bg-clip-text text-transparent tracking-tight mb-4">
                  Add Your Food Item
                </h2>

                {/* Subtitle */}
                <p className="text-gray-700 mb-8 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
                  Share your{" "}
                  <span className="font-semibold text-[#ff4d2d]">
                    delicious creations
                  </span>{" "}
                  with our customers by adding them{" "}
                  <span className="underline decoration-amber-500">to the</span>{" "}
                  menu.
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => navigate("/add-item")}
                  className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-300 ease-out 
                       bg-gradient-to-r from-[#ff4d2d] to-[#ff9a44] rounded-full shadow-lg
                       hover:shadow-[0_8px_35px_rgba(255,77,45,0.55)] hover:scale-105"
                >
                  <span className="relative z-10"> Add Food</span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff9a44] to-[#ff4d2d] opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            </div>
          )}

          {/* Items List */}
          {myShopData.items.length > 0 && (
            <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
              {myShopData.items.map((item, index) => (
                <OwnerItemCard data={item} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
