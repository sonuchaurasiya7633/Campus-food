import React from "react";
import { MdPhone } from "react-icons/md";

const OwnerOrderCard = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      {/* User Info */}
      <div>
        <h2 className="capitalize text-lg font-semibold text-gray-800">
          {data?.user?.fullName}
        </h2>
        <p className="text-sm text-gray-500">{data?.user?.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <MdPhone />
          <span>{data?.user?.mobile}</span>
        </p>
      </div>

      {/* Address */}
      <div className="flex items-start flex-col gap-2 text-gray-600 text-sm">
        <p>{data?.deliveryAddress?.text}</p>
        <p>
          Lat: {data?.deliveryAddress?.latitude}, Lon:{" "}
          {data?.deliveryAddress?.longitude}
        </p>
      </div>

      {/* Orders */}
      {data?.shopOrders?.map((shopOrder, idx) => (
        <div
          key={idx}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2"
        >
          {shopOrder?.shopOrderItems?.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-40 md:w-full border border-slate-200 rounded-lg p-2 bg-white hover:shadow-md hover:scale-[1.02] transition-transform"
            >
              <img
                src={item?.item?.image}
                alt={item?.name}
                className="w-full cursor-pointer h-24 md:h-28 object-cover rounded-md"
              />
              <p className="block text-sm font-semibold mt-2 capitalize text-slate-800 truncate">
                {item?.name}
              </p>
              <p className="text-xs text-slate-500">
                Qty: {item?.quantity} x ₹{item?.price}
              </p>
            </div>
          ))}
        </div>
      ))}

      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-500">
        <span className="text-sm">
          Status:{" "}
          <span className="font-semibold capitalize text-[#ff4d2d] ">
            {data?.shopOrders[0]?.status}
          </span>
        </span>
        <select
          value={data?.shopOrders[0]?.status}
          className="rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-2 border-[#ff4d2d] text-[#ff4d2d]"
        >
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out of Delivery</option>
        </select>
      </div>
      <div className="text-right font-bold text-gray-800 text-sm">
        Total: ₹{data?.shopOrders[0]?.subtotal}
      </div>
    </div>
  );
};

export default OwnerOrderCard;
