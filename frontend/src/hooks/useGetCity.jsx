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
const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apikey = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const result = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apikey}`
      );
      const components = result.data.results[0].components;
      const city =
        components.city ||
        components.town ||
        components.village ||
        components.state ||
        components.county ||
        "";
        

      console.log("Detected city:", city);
      console.log(result);
      dispatch(setCurrentCity(city));
      dispatch(setCurrentState(result.data.results[0].components.state));
      dispatch(setCurrentAddress(result.data.results[0].formatted));
    });
  }, [userData]);
};

export default useGetCity;
