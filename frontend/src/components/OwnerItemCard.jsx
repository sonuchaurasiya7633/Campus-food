import axios from "axios";
import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

const OwnerItemCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleDelete = async() =>{
    try {
      const result = await axios.get(`${serverUrl}/api/item/delete/${data._id}`,{withCredentials:true})
     dispatch(setMyShopData(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-[#ff4d2d]/30 w-full max-w-2xl relative">
      {/* Image Section */}
      <div className="w-full sm:w-40 h-40 sm:h-auto flex-shrink-0 bg-gray-100">
        <img
          src={data.image}
          alt=""
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h2 className="text-lg font-bold text-[#ff4d2d] tracking-wide">
            {data.name}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            <span className="font-semibold">Category: </span>
            {data.category}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Food Type: </span>
            {data.foodType}
          </p>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between mt-3 relative z-10">
          <div className="text-[#ff4d2d] font-extrabold text-base">
            ₹ {data.price}
          </div>
          <div className="flex items-center gap-3">
            {/* Edit Button */}
            <button
              type="button"
              onClick={() => navigate(`/edit-item/${data._id}`)}
              className="p-2 rounded-full bg-[#ff4d2d]/5 hover:bg-[#ff4d2d]/15 text-[#ff4d2d] transition-colors duration-300 cursor-pointer"
            >
              <FaPen size={16} />
            </button>

            {/* Delete Button */}
            <button
              type="button"
              className="p-2 rounded-full bg-[#ff4d2d]/5 hover:bg-[#ff4d2d]/15 text-[#ff4d2d] cursor-pointer transition-colors duration-300" onClick={handleDelete}
            >
              <FaTrashAlt size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerItemCard;
