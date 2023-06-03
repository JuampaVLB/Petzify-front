import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authApi = axios.create({
  baseURL: "http://192.168.1.40:3000/api/v1/auth/",
  headers: {
    "Content-Type": "application/json",
    "auth-token": AsyncStorage.getItem("TokenJWT"),
  },
});
// http://192.168.0.7:4000/api/v1/auth/profile
// https://pet-tracker-backend-production.up.railway.app/api/v1/auth/
