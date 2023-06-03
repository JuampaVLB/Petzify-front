import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const postApi = axios.create({
  baseURL: "http://192.168.0.7:3000/api/v1/post",
  headers: {
    "Content-Type": "application/json",
    "auth-token": AsyncStorage.getItem("TokenJWT"),
  },
});