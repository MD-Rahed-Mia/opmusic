import { createContext, useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";

export const PlaylistContext = createContext();

const PlayListProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState(null);

  //make random number
  const makeRandom = () => {
    const rand = Math.floor(Math.random() * 10);
    return rand;
  };

  const [listIndex, setListIndex] = useState(makeRandom());

  const { data, error } = useFetch("/database/music.json");
  useEffect(() => {
    setPlaylist(data);
  }, [data, error]);

  if (error) console.log(error);
  return (
    <PlaylistContext.Provider
      value={{ playlist, setPlaylist, listIndex, setListIndex }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlayListProvider;
