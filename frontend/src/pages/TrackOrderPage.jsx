import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { IoArrowBackOutline } from "react-icons/io5";
import DeliveryBoyTracking from "../components/DeliveryBoyTracking";
import { useSelector } from "react-redux";

const TrackOrderPage = () => {
  const navigate = useNavigate();
  const {socket} = useSelector(state=>state.user)
  const [livelocation,setLiveLocation] = useState({})
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState();

  const handleGetOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-order-by-id/${orderId}`,
        { withCredentials: true }
      );
      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(()=>{
socket.on("updateDeliveryLocation",({deliveryBoyId,latitude,longitude})=>{
setLiveLocation(prev=>({
    ...prev,
    [deliveryBoyId]:{lat:latitude,lon:longitude}
}))
})
},[socket])

  useEffect(() => {
    handleGetOrder();
  }, [orderId]);

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
      {/* Header */}
      <div className="sticky top-4 left-0 z-10 flex items-center gap-3 w-fit bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-orange-200">
        <button
          onClick={() => navigate("/my-orders")}
          className="w-10 h-10 flex items-center justify-center 
                     bg-orange-50 rounded-full 
                     shadow-sm hover:shadow-md border border-orange-200
                     text-[#ff4d2d] hover:bg-[#ff4d2d] hover:text-white 
                     transition-all duration-300 ease-in-out group cursor-pointer"
        >
          <IoArrowBackOutline
            size={20}
            className="transform group-hover:-translate-x-1 transition-transform duration-300"
          />
        </button>
        <span className="font-semibold text-base md:text-lg text-gray-700 tracking-wide">
          Track Order
        </span>
      </div>

      {/* Orders */}
      {currentOrder?.shopOrders.map((shopOrder, index) => (
        <div className="bg-white p-4 rounded-2xl shadow-md border-orange-100 space-y-4" key={index}>
        <div>
          <p className="text-lg font-bold mb-2 text-[#ff4d2d]">{shopOrder.shop.name}</p>
          <p className="font-semibold"><span>Items: </span>{shopOrder.shopOrderItems?.map(i=>i.name).join(",")} </p>
          <p><span className="font-semibold">Subtotal:</span>{shopOrder.subtotal}</p>
          <p><span className="font-semibold">Delivery Address : </span>{currentOrder.deliveryAddress.text}</p>
        </div>
       {shopOrder.status != "delivered" ? <>
  
       {shopOrder.assignedDeliveryBoy ? 
      <div className="text-sm text-gray-700">
<p className="font-semibold"><span className="font-semibold">Delivery Boy Name: </span>{shopOrder.assignedDeliveryBoy.fullName}</p>
<p className="font-semibold"><span className="font-semibold">Delivery Boy Contact No.: </span>{shopOrder.assignedDeliveryBoy.mobile}</p>
      </div> :
      <p className="font-semibold">Delivery Boy is not assigned yet</p>
      }
       </>: <p className="text-green-600 font-semibold text-lg">Delivered</p> }


{(shopOrder.assignedDeliveryBoy && shopOrder.status !=="delivered") &&
<div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-md"><DeliveryBoyTracking data={{
  deliveryBoyLocation:livelocation[shopOrder.assignedDeliveryBoy._id] || {
    
    lat:shopOrder.assignedDeliveryBoy.location.coordinates[1],
    lon:shopOrder.assignedDeliveryBoy.location.coordinates[0]
  },
  customerLocation:{
    lat:currentOrder.deliveryAddress.latitude,
    lon:currentOrder.deliveryAddress.longitude
  }
}}/></div>}


        </div>
      ))}



    </div>
  );
};

export default TrackOrderPage;
