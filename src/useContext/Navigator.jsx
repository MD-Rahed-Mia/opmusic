import { createContext, useState } from "react";

export const NavigatorBlockContext = createContext();

const NavigatorBlockProvider = ({ children }) => {
  const [navigatorBlock, setNavigatorBlock] = useState("home");

  return (
    <NavigatorBlockContext.Provider
      value={{ navigatorBlock, setNavigatorBlock }}
    >
      {children}
    </NavigatorBlockContext.Provider>
  );
};
export default NavigatorBlockProvider;
