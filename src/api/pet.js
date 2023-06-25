import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const petApi = axios.create({
  baseURL: "http://192.168.0.3:5000/api/v1/pet/",
  headers: {
    "Content-Type": "application/json",
    "auth-token": AsyncStorage.getItem("TokenJWT"),
  },
});

// https://petzify.up.railway.app/api/v1/auth/
// http://192.168.0.3:5000/api/v1/post
// 192.168.0.3