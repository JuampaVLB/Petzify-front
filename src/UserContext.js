import React, { createContext, useEffect, useState } from "react";
import { authApi } from "./api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Crea el contexto
export const UserContext = createContext();

// Crea el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const GetToken = async () => {
    try {
      const value = await AsyncStorage.getItem("TokenJWT");

      let headers = {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token": value,
      };

      authApi
        .get("/profile", {
          headers,
        })
        .then((res) => {
          setUserData(res.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    GetToken();
  }, []);

  GetToken();

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
