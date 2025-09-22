import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice";
import { ClipLoader } from "react-spinners";
const EditItem = () => {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const { itemId } = useParams();
  const [currentItem, setCurrentItem] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("");
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Snacks",
    "Main course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("foodType", foodType);
      formData.append("price", price);

      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/item/edit-item/${itemId}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleGetItemById = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-by-id/${itemId}`,
          { withCredentials: true }
        );
        setCurrentItem(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetItemById();
  }, [itemId]);

  useEffect(() => {
    setName(currentItem?.name || "");
    setPrice(currentItem?.price || 0);
    setCategory(currentItem?.category || "");
    setFoodType(currentItem?.foodType || "");
    setFrontendImage(currentItem?.image || "");
  }, [currentItem]);

  return (
    <div className="flex justify-center items-center flex-col p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen ">
      <div className="absolute top-5 left-5 z-10">
        <button
          onClick={() => navigate("/")}
          className="w-12 h-12 flex items-center justify-center 
                     bg-white/90 backdrop-blur-md rounded-full 
                     shadow-lg hover:shadow-xl border border-[#ff4d2d]/30
                     text-[#ff4d2d] hover:bg-[#ff4d2d] hover:text-white 
                     transition-all duration-300 ease-in-out group cursor-pointer"
        >
          <IoArrowBackOutline
            size={22}
            className="transform group-hover:-translate-x-1 transition-transform duration-300"
          />
        </button>
      </div>
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16 " />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">Edit Food</div>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter item Name"
              className="w-full px-4 py-2 border border-lg focus:outline-none focus:ring-2 focus:ring-orange-500 "
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Food Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border border-lg focus:outline-none focus:ring-2 focus:ring-orange-500 "
              onChange={handleImage}
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Price
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border border-lg focus:outline-none focus:ring-2 focus:ring-orange-500 "
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Select Category
            </label>
            <select
              className="w-full px-4 py-2 border border-lg focus:outline-none focus:ring-2 focus:ring-orange-500 "
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Category</option>
              {categories.map((cate, index) => (
                <option value={cate} key={index}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Select Food Type
            </label>
            <select
              className="w-full px-4 py-2 border border-lg focus:outline-none focus:ring-2 focus:ring-orange-500 "
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
            >
              <option value="veg">Veg</option>
              <option value="non veg">non Veg</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

          <button
            className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer "
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
                    "conic-gradient(#ec4899, #6366f1, #22c55e, #f59e0b) 1",
                  borderRadius: "50%",
                }}
              />
            ) : (
              " Save "
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
