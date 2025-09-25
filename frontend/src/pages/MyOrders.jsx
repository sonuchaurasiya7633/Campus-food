import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import OwnerOrderCard from "../components/OwnerOrderCard";
import CardUserOrder from "../components/CardUserOrder";

const MyOrders = () => {
  const { userData, myOrders } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex justify-center px-4 bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="w-full max-w-[850px] p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="w-12 h-12 flex items-center justify-center 
               bg-white rounded-full shadow-md border border-[#ff4d2d]/30
               text-[#ff4d2d] hover:bg-[#ff4d2d] hover:text-white 
               transition-all duration-300 ease-in-out group cursor-pointer"
          >
            <IoArrowBackOutline
              size={22}
              className="transform group-hover:-translate-x-1 transition-transform duration-300"
            />
          </button>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-900 tracking-tight">
            My Orders
          </h1>
        </div>

        {/* Orders Section */}
        <div className="space-y-8">
          {myOrders?.length > 0 ? (
            myOrders.map((order, index) =>
              userData.role === "user" ? (
                <CardUserOrder key={index} data={order} />
              ) : userData.role === "owner" ? (
                <OwnerOrderCard key={index} data={order} />
              ) : null
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl shadow-md border border-slate-200">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png"
                alt="No Orders"
                className="w-24 h-24 mb-4 opacity-80"
              />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                No Orders Yet
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Looks like you haven’t placed any orders.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
