import { createContext, useState } from "react";

export const LoveContext = createContext();

const LoveContextProvider = ({ children }) => {
  const [loveSong, setLoveSong] = useState(
    JSON.parse(localStorage.getItem("loveSong")) || []
  );

  return (
    <LoveContext.Provider value={{ loveSong, setLoveSong }}>
      {children}
    </LoveContext.Provider>
  );
};
export default LoveContextProvider;
