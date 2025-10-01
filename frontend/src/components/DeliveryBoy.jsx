import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import DeliveryBoyTracking from "./DeliveryBoyTracking";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const DeliveryBoy = () => {
  const navigate = useNavigate()
  const { userData, socket } = useSelector((state) => state.user);
  const [availableAssignment, setAvailableAssignment] = useState([]);
  const [currentOrder, setCurrentOrder] = useState();
  const [todayDeliveries,setTodayDeliveries] = useState([])
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [deliveryBoyLocation, setDeliveryBotLocation] = useState(null);
 const [loading,setLoading] = useState(false)
 const [message,setMessage] = useState("")
  useEffect(() => {
    if (!socket || userData.role !== "deliveryBoy") return;
    let watchId;
    if (navigator.geolocation) {
      (watchId = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setDeliveryBotLocation({ lat: latitude, lon: longitude });
        socket.emit("updateLocation", {
          latitude,
          longitude,
          userId: userData._id,
        });
      })),
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        };
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [socket, userData]);

  const getAssignments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`, {
        withCredentials: true,
      });
      setAvailableAssignment(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        {
          withCredentials: true,
        }
      );
      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/accept-orders/${assignmentId}`,
        { withCredentials: true }
      );
      console.log(result.data);
      await getCurrentOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const sendOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
        },
        { withCredentials: true }
      );
      setLoading(false)
      setShowOtpBox(true);
      console.log(result.data);
    } catch (error) {
      console.log(error);
       setLoading(false)
    }
  };

  const verifyOtp = async () => {
    setMessage("")
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
          otp,
        },
        { withCredentials: true }
      );
      console.log(result.data);
      setMessage(result.data.message)
      location.reload()
      
    } catch (error) {
      console.log(error);
    }
  };

 
  
  const handleTodayDeliveries = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-today-deliveries`,
        
        { withCredentials: true }
      );
      console.log(result.data);
      setTodayDeliveries(result.data)
    } catch (error) {
      console.log("deliveris error = ",error);
    }
  };




  useEffect(() => {
    socket?.on("newAssignment", (data) => {
      if (data.sendTo == userData._id) {
        setAvailableAssignment((prev) => [...prev, data]);
      }
    });

    return () => {
      socket?.off("newAssignment");
    };
  }, [socket]);

const ratePerdelivery = 30;
const totalEarning = todayDeliveries.reduce((sum,d)=>sum + d.count*ratePerdelivery,0)

  useEffect(() => {
    getAssignments();
    getCurrentOrder();
    handleTodayDeliveries()
  }, [userData]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-orange-50 via-white to-orange-50 overflow-y-auto">
      <div className="w-full max-w-[900px] flex flex-col gap-6 items-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full sm:w-[95%] border border-orange-100 transition hover:shadow-xl">
          {/* Welcome */}
          <h1 className="text-2xl font-extrabold text-orange-600 mb-3 sm:mb-0">
            Welcome, <span className="text-green-700">{userData.fullName}</span>
          </h1>

         
          {/* Location */}
          <p className="text-sm sm:text-base text-gray-700 bg-orange-50 px-4 py-2 rounded-lg shadow-inner">
            <span className="font-semibold text-orange-600">Latitude:</span>{" "}
            {deliveryBoyLocation?.lat || userData.location.coordinates[1]},{" "}
            <span className="font-semibold text-orange-600">Longitude:</span>{" "}
            {deliveryBoyLocation?.lon || userData.location.coordinates[0]}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 w-[90%] mb-6 border border-orange-100">
          <h1>Today Deliveries</h1>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={todayDeliveries}>
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="hour" tickFormatter={(h)=>`${h}:00`}/>
                  <YAxis  allowDecimals={false}/>
                  <Tooltip formatter={(value)=>[value,"order"]} labelFormatter={label=>`${label}:00`}/>
                    <Bar dataKey="count" fill="#ff4d2d"/>
            </BarChart>
          </ResponsiveContainer>

          <div className="max-w-sm mx-auto mt-6 p-6 bg-white rounded-2xl shadow-lg text-center">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">toaday`s Earning</h1>
        <span className="text-3xl font-bold text-green-600 ">₹{totalEarning}</span>
          </div>
        </div>

        {!currentOrder && (
          <div className="bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100 ">
            <h1 className="text-lg font-semibold mb-4 flex items-center gap-2 ">
              Available Orders
            </h1>

            <div className="space-y-4">
              {availableAssignment.length > 0 ? (
                availableAssignment.map((a, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm font-semibold">{a.shopName}</p>
                      <p className="text-sm text-gray-500">
                        {" "}
                        <span className="font-semibold">
                          Delivery Address:
                        </span>{" "}
                        {a.deliveryAddress.text}
                      </p>
                      <p className="text-xs text-gray-400">
                        {a.items.length} items | {a.subtotal}
                      </p>
                    </div>
                    <button
                      className="bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600 cursor-pointer"
                      onClick={() => acceptOrder(a.assignmentId)}
                    >
                      Accept
                    </button>
                  </div>
                ))
              ) : (
                <p>No Available Order</p>
              )}
            </div>
          </div>
        )}

        {currentOrder && (
          <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md mx-auto border border-orange-200">
            <h2 className="text-xl font-bold mb-4 text-orange-700 flex items-center gap-2">
              📦 Current Order
            </h2>

            <div className="border border-orange-100 rounded-xl p-5 bg-gradient-to-r from-orange-50 to-orange-100 hover:shadow-md transition">
              <p className="font-semibold text-base text-gray-800">
                {currentOrder?.shopOrder.shop.name}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {currentOrder.deliveryAddress.text}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {currentOrder.shopOrder.shopOrderItems.length} items |{" "}
                <span className="font-medium text-orange-700">
                  ₹{currentOrder?.shopOrder.subtotal}
                </span>
              </p>
            </div>
            <DeliveryBoyTracking
              data={{
                deliveryBoyLocation: deliveryBoyLocation || {
                  lat: userData.location.coordinates[1],
                  lon: userData.location.coordinates[0],
                },
                customerLocation: {
                  lat: currentOrder.deliveryAddress.latitude,
                  lon: currentOrder.deliveryAddress.longitude,
                },
              }}
            />
            {!showOtpBox ? (
              <button
                className="mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all duration-200 cursor-pointer "
                onClick={sendOtp} disabled={loading}
              >
             {loading ? (
            <ClipLoader
              size={20}
              color="transparent" // transparent so gradient visible
              cssOverride={{
                border: "3px solid transparent",
                borderTop: "3px solid",
                borderImage:
                  "conic-gradient(#ec4899, #6366f1, #22c55e, #f59e0b) 1",
                borderRadius: "50%",
              }}
            />
          ) : (
            " Mark As Delivered"
          )}
              </button>
            ) : (
              <div>
                <p className="text-sm font-semibold mb-2">
                  Enter send to{" "}
                  <span className="text-orange-500 capitalize">
                    {currentOrder.user.fullName}
                  </span>
                </p>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400 "
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp} 
                />
                {message && <p className="text-center text-green-600 text-lg">{message}</p> }
                
                <button
                  className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all cursor-pointer"
                  onClick={verifyOtp} 
                >
                  Submit OTP
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryBoy;
