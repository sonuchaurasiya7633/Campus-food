import React, { useEffect, useState } from "react";
import { IoArrowBackOutline, IoLocateSharp, IoSearch } from "react-icons/io5";
import { ImMobile } from "react-icons/im";
import {
  MdDeliveryDining,
  MdOutlineLocationOn,
  MdPayment,
} from "react-icons/md";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice";
import axios from "axios";
import { FaCreditCard } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

function RecenterMap({ location }) {
  if (location.lat && location.lon) {
    const map = useMap();
    map.setView([location.lat, location.lon], 16, { animate: true });
  }
  return null;
}

const CheckOut = () => {
  const navigate = useNavigate();
  const { location, address } = useSelector((state) => state.map);
  const { cartItems, totalAmount } = useSelector((state) => state.user);
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const dispatch = useDispatch();

  const apikey = import.meta.env.VITE_GEOAPIKEY;

  const deliveryFee = totalAmount > 500 ? 0 : 30;
  const AmountWithDeliveryFee = totalAmount + deliveryFee;

  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(setLocation({ lat: latitude, lon: longitude }));
      getAddressByLatLng(latitude, longitude);
    });
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const apikey = import.meta.env.VITE_GEOAPIKEY;
      const result = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${apikey}`
      );
      dispatch(setAddress(result?.data?.results[0].formatted));
    } catch (error) {
      console.log(error);
    }
  };

  const getLatLngByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          addressInput
        )}&key=${apikey}`
      );

      const lat = result?.data?.results[0]?.geometry.lat;
      const lng = result?.data?.results[0]?.geometry.lng;

      if (lat && lng) {
        dispatch(setLocation({ lat, lon: lng }));
        console.log(lat, lng);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff9f9] via-[#fff0f0] to-[#ffeaea] flex items-center justify-center p-4 sm:p-6">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate("/cart")}
          className="w-12 h-12 flex items-center justify-center 
                     bg-white/80 backdrop-blur-md rounded-full 
                     shadow-md hover:shadow-xl border border-[#ff4d2d]/40
                     text-[#ff4d2d] hover:bg-[#ff4d2d] hover:text-white 
                     transition-all duration-300 ease-in-out group cursor-pointer"
        >
          <IoArrowBackOutline
            size={22}
            className="transform group-hover:-translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-4 sm:p-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center tracking-tight">
          🛒 Checkout
        </h1>

        {/* Delivery Section */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <MdOutlineLocationOn size={22} className="text-[#ff4d2d]" />
            Delivery Location
          </h2>

          {/* Address Input */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter your delivery address..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] transition"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />
            <button
              className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg flex items-center justify-center cursor-pointer transition"
              onClick={getLatLngByAddress}
            >
              <IoSearch size={18} />
            </button>
            <button
              className="bg-[#6b07f6] hover:bg-[#4b05b5] text-white px-4 py-2 rounded-lg flex items-center justify-center cursor-pointer transition"
              onClick={getCurrentLocation}
            >
              <IoLocateSharp size={18} />
            </button>
          </div>

          {/* Map Section */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-md">
            <div className="h-64 sm:h-80 w-full">
              <MapContainer
                className="w-full h-full"
                center={[location?.lat || 28.6139, location?.lon || 77.209]}
                zoom={16}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <RecenterMap location={location} />
                <Marker
                  position={[location?.lat, location?.lon]}
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                />
              </MapContainer>
            </div>
          </div>
        </section>

        {/* payment section */}
        <section>
          <h2 className="text-lg font-bold mb-4 text-gray-800 tracking-tight flex gap-2">
            <MdPayment
              className="text-4xl p-3 rounded-full 
             bg-gradient-to-r from-pink-500 to-orange-500 
             text-white shadow-md hover:shadow-xl 
             cursor-pointer transition-all duration-300 
             hover:scale-110 active:scale-95"
            />
            Choose Payment Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Cash On Delivery */}
            <div
              className={`relative flex items-center gap-4 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                paymentMethod === "cod"
                  ? "border-2 border-[#ff4d2d] bg-gradient-to-r from-orange-50 to-white shadow-lg scale-[1.02]"
                  : "border border-gray-200 hover:border-[#ff4d2d]/50 hover:shadow-md"
              }`}
              onClick={() => setPaymentMethod("cod")}
            >
              {/* Tick Badge */}
              {paymentMethod === "cod" && (
                <span className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-[#ff4d2d] text-white text-xs font-bold shadow">
                  ✓
                </span>
              )}

              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 shadow-inner">
                <MdDeliveryDining className="text-green-600 text-xl" />
              </span>

              <div>
                <p className="font-semibold text-gray-900">Cash On Delivery</p>
                <p className="text-xs text-gray-500">
                  Pay when your food arrives
                </p>
              </div>
            </div>

            {/* Online Payment */}
            <div
              className={`relative flex items-center gap-4 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                paymentMethod === "online"
                  ? "border-2 border-[#ff4d2d] bg-gradient-to-r from-orange-50 to-white shadow-lg scale-[1.02]"
                  : "border border-gray-200 hover:border-[#ff4d2d]/50 hover:shadow-md"
              }`}
              onClick={() => setPaymentMethod("online")}
            >
              {/* Tick Badge */}
              {paymentMethod === "online" && (
                <span className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-[#ff4d2d] text-white text-xs font-bold shadow">
                  ✓
                </span>
              )}

              <div className="flex items-center gap-2">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 shadow-inner">
                  <ImMobile className="text-purple-700 text-xl" />
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 shadow-inner">
                  <FaCreditCard className="text-blue-700 text-xl" />
                </span>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  UPI / Credit / Debit
                </p>
                <p className="text-xs text-gray-500">Pay securely online</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#ff7b54] text-white shadow-md">
              🛒
            </span>
            Order Summary
          </h2>

          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 shadow-lg p-6 space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm bg-white/70 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition duration-300"
              >
                <span className="font-medium text-gray-800 capitalize">
                  {item.name}
                  <span className="text-gray-500"> X {item.quantity}</span>
                </span>
                <span className="flex items-center text-base font-semibold text-gray-900">
                  ₹ {item.price * item.quantity}
                </span>
              </div>
            ))}

            {/* Subtotal */}
            <div className="flex justify-between pt-2 text-gray-700 text-sm">
              <span>Subtotal</span>
              <span>
                
                ₹ {totalAmount}
              </span>
            </div>

            {/* Delivery Fee */}
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Delivery Fee</span>
              <span className="flex items-center">
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-semibold">Free</span>
                ) : (
                  <>
                    <FaIndianRupeeSign className="mr-1 text-gray-600" />
                    {deliveryFee}
                  </>
                )}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-lg font-bold pt-4 border-t border-gray-200">
              <span className="text-gray-900">Total</span>
              <span className="flex items-center text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d2d] to-[#ff7b54]">
                <FaIndianRupeeSign className="mr-1" />₹{AmountWithDeliveryFee}
              </span>
            </div>

            {/* CTA Button */}
            <button className="w-full mt-4 bg-gradient-to-r from-[#ff4d2d] to-[#ff7b54] hover:opacity-90 text-white py-3 rounded-2xl font-semibold shadow-md transition-all duration-300">
              {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckOut;
