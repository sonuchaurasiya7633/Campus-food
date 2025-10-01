import React, { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentState,
  setUserData,
} from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setLocation } from "../redux/mapSlice";
const useUpdateLocation = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
   const updateLocation = async(lat,lon) =>{
   const result = await axios.post(`${serverUrl}/api/user/update-location`,{lat,lon},{withCredentials:true})
   console.log(result.data)
   }
   navigator.geolocation.watchPosition((pos)=>{
    updateLocation(pos.coords.latitude,pos.coords.longitude)
   })
  }, [userData]);
};

export default useUpdateLocation;
