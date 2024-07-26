import { createContext, useState } from "react";

export const NowPlayingContext = createContext();

const NowPlayingProvider = ({ children }) => {
  const [nowPlaying, setNowPlaying] = useState(null);
  return (
    <NowPlayingContext.Provider value={{ nowPlaying, setNowPlaying }}>
      {children}
    </NowPlayingContext.Provider>
  );
};

export default NowPlayingProvider;