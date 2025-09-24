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
    <div className="w-full min-h-screen flex justify-center px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="w-full max-w-[800px] p-4">
        <div className="flex items-center gap-4 mb-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="w-12 h-12 flex items-center justify-center 
               bg-white rounded-full 
               shadow-md hover:shadow-xl border border-[#ff4d2d]/30
               text-[#ff4d2d] hover:bg-[#ff4d2d] hover:text-white 
               transition-all duration-300 ease-in-out group cursor-pointer"
          >
            <IoArrowBackOutline
              size={22}
              className="transform group-hover:-translate-x-1 transition-transform duration-300"
            />
          </button>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">
            My Orders
          </h1>
        </div>
        <div className="space-y-6">
          {myOrders?.map((order, index) =>
            userData.role === "user" ? (
              <CardUserOrder key={index} data={order} />
            ) : userData.role === "owner" ? (
              <OwnerOrderCard key={index} data={order} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
