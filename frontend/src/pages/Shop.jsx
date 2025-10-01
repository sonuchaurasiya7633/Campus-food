import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { FaStore, FaUtensils } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import FoodCart from "../components/FoodCart";
import { IoArrowBackSharp } from "react-icons/io5";

const Shop = () => {
  const { shopId } = useParams();
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState([]);
  const navigate = useNavigate()
  const handleShop = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/get-by-shop/${shopId}`,
        { withCredentials: true }
      );
      setShop(result.data.shop);
      setItems(result.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShop();
  }, [shopId]);
  return (
    <div className="min-h-screen bg-gray-50">
      <button className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/40 hover:bg-black/70 text-white px-3 py-2 rounded-full shadow transition cursor-pointer" onClick={()=>navigate("/")}>
        <IoArrowBackSharp />
        <span>Back</span>
      </button>
      {shop && (
        <div className="relative w-full md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
          {/* Background Image */}
          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
          />

          {/* Overlay with Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-center items-center text-center px-6">
            {/* Store Icon with Vibrant Background */}
            <div className="p-5 bg-gradient-to-tr from-red-500 via-orange-500 to-yellow-400 rounded-full shadow-lg mb-4 animate-pulse">
              <FaStore className="text-white text-4xl md:text-5xl" />
            </div>

            {/* Shop Name */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
              {shop.name}
            </h1>

            {/* Address */}
            <div className="flex items-center gap-2 mt-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-md">
              <FaLocationDot size={20} className="text-red-400" />
              <p className="text-sm md:text-base font-medium text-gray-200">
                {shop.address}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="flex items-center justify-center gap-3 text-3xl font-bold mb-10 text-gray-800">
          {" "}
          <FaUtensils color="red" /> Our Menu
        </h2>
        {items.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-8">
            {items.map((item) => (
              <FoodCart data={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No Item Available</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
