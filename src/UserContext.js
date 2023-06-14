import React, { createContext, useEffect, useState } from "react";

// Crea el contexto
export const UserContext = createContext();

// Crea el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
