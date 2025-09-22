import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";

import { useDispatch, useSelector } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

const useGetMyShop= () => {
  const dispatch = useDispatch();   
   const {userData} = useSelector(state=>state.user)
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/get-my`, {
          withCredentials: true,
        });
        dispatch(setMyShopData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchShop ();
  }, [dispatch,userData]);
};

export default useGetMyShop;