import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authApi = axios.create({
  baseURL: "http://192.168.0.3:5000/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
    "auth-token": AsyncStorage.getItem("TokenJWT"),
  },
});
// http://192.168.0.2:5000/api/v1/auth/
// https://petzify.up.railway.app/api/v1/auth/
