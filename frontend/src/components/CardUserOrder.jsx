import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";

const CardUserOrder = ({ data }) => {
  const navigate = useNavigate();
  const [selectRating, setSelectRating] = useState({});

  const formateDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleRating = async (itemId, rating) => {
    try {
      await axios.post(
        `${serverUrl}/api/item/rating`,
        { itemId, rating },
        { withCredentials: true }
      );
      setSelectRating((prev) => ({
        ...prev,
        [itemId]: rating,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 space-y-4 sm:space-y-6"
      style={{
        background: "linear-gradient(135deg, #FF9A8B, #FF6A88, #FFF1A1)", // main card gradient
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 border-b border-slate-200 pb-3">
        <div>
          <p className="font-semibold text-slate-900 text-base">
            Order #{data._id.slice(-6)}
          </p>
          <p className="text-xs sm:text-sm text-slate-700">
            Date : {formateDate(data.createdAt)}
          </p>
        </div>
        <div className="text-right space-y-1">
          {data.paymentMethod === "code" ? (
            <p className="text-xs sm:text-sm text-slate-700 tracking-wide">
              {data.paymentMethod?.toUpperCase()}
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-slate-700 tracking-wide">
              Payment: {data.payment ? "Completed" : "Pending"}
            </p>
          )}

          <p className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 px-3 py-1 text-xs font-medium border border-amber-200 shadow-sm">
            {data.shopOrders?.[0].status}
          </p>
        </div>
      </div>

      {data.shopOrders.map((shopOrder, index) => (
        <div
          className="border border-slate-200 rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4 hover:bg-opacity-90 transition"
          key={index}
          style={{
            background: "linear-gradient(135deg, #FFD8A9, #FFE4B5)", // shop order gradient
          }}
        >
          <p className="font-semibold text-slate-800 text-sm sm:text-base">
            {shopOrder.shop.name}
          </p>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2">
            {shopOrder.shopOrderItems.map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-40 md:w-full border border-slate-200 rounded-lg p-2 hover:shadow-md hover:scale-[1.02] transition-transform"
                style={{
                  background: "linear-gradient(135deg, #FFF5E6, #FFEBC2)", // individual item gradient
                }}
              >
                <img
                  onClick={() => navigate("/")}
                  src={item.item.image}
                  alt=""
                  className="w-full cursor-pointer h-24 md:h-28 object-cover rounded-md"
                />
                <p className="block text-sm font-semibold mt-2 capitalize text-slate-800 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-slate-600">
                  Qty: {item.quantity} x ₹{item.price}
                </p>

                {shopOrder.status === "delivered" && (
                  <div className="flex space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className={`text-lg ${
                          selectRating[item.item._id] >= star
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }`}
                        onClick={() => handleRating(item.item._id, star)}
                      >
                        ☆
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-slate-200 pt-2">
            <p className="font-semibold text-slate-800 text-sm sm:text-base">
              Subtotal: ₹{shopOrder.subtotal}
            </p>
            <span className="text-xs sm:text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full shadow-sm">
              Status: {shopOrder.status}
            </span>
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-t border-slate-200 pt-3">
        <p className="font-semibold text-slate-900 text-base">
          Total: ₹{data.totalAmount}
        </p>
        <button
          className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-[#ff4d2d] to-[#e64526] hover:from-[#e64526] hover:to-[#d63b1e] text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#ff4d2d]/60 active:scale-95 cursor-pointer"
          onClick={() => navigate(`/track-order/${data._id}`)}
        >
          Track Order
        </button>
      </div>
    </div>
  );
};

export default CardUserOrder;
