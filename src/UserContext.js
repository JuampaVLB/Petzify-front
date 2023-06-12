import React, { createContext, useEffect, useState } from "react";
import { authApi } from "./api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Crea el contexto
export const UserContext = createContext();

// Crea el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  console.log("userdata ejecutando");
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
