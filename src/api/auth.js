import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authApi = axios.create({
  baseURL: "https://pet-tracker-backend-production.up.railway.app/api/v1/auth/",
  headers: {
    'Content-Type': 'application/json',
    'auth-token': AsyncStorage.getItem("TokenJWT")
 }
});
// /signup