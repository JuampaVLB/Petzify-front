import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const postApi = axios.create({
  baseURL: "https://petzify.up.railway.app/api/v1/post",
  headers: {
    "Content-Type": "application/json",
    "auth-token": AsyncStorage.getItem("TokenJWT"),
  },
});

// https://petzify.up.railway.app/api/v1/auth/
// http://192.168.0.2:5000/api/v1/post