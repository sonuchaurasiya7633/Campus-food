import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";

import { useDispatch, useSelector } from "react-redux";

import { setMyOrders } from "../redux/userSlice";

const useGetMyOrders = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/order/my-orders`, {
          withCredentials: true,
        });
        dispatch(setMyOrders(result.data));
        console.log("My Order = ",result.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [dispatch, userData]);
};

export default useGetMyOrders;
