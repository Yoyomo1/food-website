import React, { useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children, value }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { useGlobalContext, AppProvider };
