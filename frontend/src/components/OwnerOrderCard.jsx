import axios from "axios";
import  { useState } from "react";
import { MdPhone } from "react-icons/md";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../redux/userSlice";

const OwnerOrderCard = ({ data }) => {
  const [availableBoys, setAvailableBoys] = useState([]);
  const dispatch = useDispatch();

  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
        { status },
        { withCredentials: true }
      );
      dispatch(updateOrderStatus({ orderId, shopId, status }));
      setAvailableBoys(result.data.availableBoys || []);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-lg border border-orange-100 p-6 space-y-6 hover:shadow-2xl transition duration-300">
      {/* User Info */}
      <div className="pb-4 border-b border-gray-200">
        <h2 className="capitalize text-xl font-bold text-gray-900 tracking-tight">
          {data?.user?.fullName}
        </h2>
        <p className="text-sm text-gray-500">{data?.user?.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-700 mt-2">
          <MdPhone className="text-orange-500" />
          <span>{data?.user?.mobile}</span>
        </p>
        {data.paymentMethod === "online" ? (
          <p className="mt-1 text-sm text-gray-600">
            💳 Payment:{" "}
            <span
              className={`font-semibold ${
                data.payment ? "text-green-600" : "text-red-500"
              }`}
            >
              {data.payment ? "Paid" : "Unpaid"}
            </span>
          </p>
        ) : (
          <p className="mt-1 text-sm text-gray-600">
            💵 Payment Method:{" "}
            <span className="font-semibold text-orange-600">
              {data.paymentMethod}
            </span>
          </p>
        )}
      </div>

      {/* Address */}
      <div className="bg-orange-50 p-4 rounded-lg shadow-inner text-sm text-gray-700">
        <p className="font-medium">{data?.deliveryAddress?.text}</p>
        <p className="mt-1 text-xs text-gray-500">
          📍 Lat: {data?.deliveryAddress?.latitude}, Lon:{" "}
          {data?.deliveryAddress?.longitude}
        </p>
      </div>

      {/* Orders */}
      {data?.shopOrders?.map((shopOrder, idx) => (
        <div
          key={idx}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-3"
        >
          {shopOrder?.shopOrderItems?.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-orange-100 rounded-xl p-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={item?.item?.image}
                alt={item?.name}
                className="w-full h-28 object-cover rounded-lg"
              />
              <p className="mt-2 text-sm font-semibold text-gray-800 truncate capitalize">
                {item?.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Qty: {item?.quantity} × ₹{item?.price}
              </p>
            </div>
          ))}
        </div>
      ))}

      {/* Status + Assign Delivery Boy */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="text-sm">
          Status:{" "}
          <span className="font-semibold capitalize text-orange-600">
            {data?.shopOrders[0]?.status}
          </span>
        </span>
        <select
          className="rounded-lg border px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 border-orange-300 text-orange-600 bg-white shadow-sm hover:border-orange-400 transition"
          onChange={(e) =>
            handleUpdateStatus(
              data._id,
              data.shopOrders[0].shop._id,
              e.target.value
            )
          }
        >
          <option value="">Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out of Delivery</option>
        </select>
      </div>

      {/* Available Boys OR Assigned Boy */}
      {data.shopOrders[0].status === "out of delivery" && (
        <div className="mt-4 p-4 border border-orange-200 rounded-2xl bg-gradient-to-r from-orange-50 to-orange-100 shadow-inner">
          {data.shopOrders[0]?.assignedDeliveryBoy ? (
            <p className="font-semibold text-orange-700 mb-3">
              🚴 Assigned Delivery Boy
            </p>
          ) : (
            <p className="font-semibold text-orange-700 mb-3">
              🚴 Available Delivery Boys
            </p>
          )}
          {availableBoys.length > 0 ? (
            <div className="space-y-2">
              {availableBoys.map((b, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-3 py-2 bg-white rounded-lg shadow hover:shadow-md transition"
                >
                  <span className="text-gray-800 font-medium">
                    {b.fullName}
                  </span>
                  <span className="text-sm text-gray-500">📞 {b.mobile}</span>
                </div>
              ))}
            </div>
          ) : data.shopOrders[0]?.assignedDeliveryBoy ? (
            <div className="bg-white p-3 rounded-lg shadow">
              <p className="text-gray-800 font-semibold">
                {data.shopOrders[0].assignedDeliveryBoy.fullName}
              </p>
              <p className="text-sm text-gray-500">
                📞 {data.shopOrders[0].assignedDeliveryBoy.mobile}
              </p>
            </div>
          ) : (
            <div className="text-gray-500 italic mt-2">
              ⏳ Waiting for Delivery Boy to accept
            </div>
          )}
        </div>
      )}

      {/* Total */}
      <div className="text-right font-bold text-gray-900 text-lg">
        Total:{" "}
        <span className="text-orange-600">
          ₹{data?.shopOrders[0]?.subtotal}
        </span>
      </div>
    </div>
  );
};

export default OwnerOrderCard;
