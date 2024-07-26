import React, { useContext, useState } from "react";
import { PlaylistContext } from "../useContext/PlaylistContext";
import { NavigatorBlockContext } from "../useContext/Navigator";
import { NowPlayingContext } from "../useContext/NowPlaying";

export default function Search() {
  const [searchItem, setSearchItem] = useState([]);

  const { playlist } = useContext(PlaylistContext);

  function handleSearch(e) {
    const filterItem = playlist.filter((item, index) => {
      const value = e.target.value;
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    setSearchItem(filterItem);
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl underline text-white px-2">Search</h1>
      </div>
      <div>
        <input
          type="text"
          name="search"
          id="search"
          className="w-[90%] mx-auto  min-h-[30px] p-1 block mt-2 rounded-3xl px-2 outline-none"
          placeholder="search music"
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>

      <div className=" max-h-[400px] overflow-y-scroll">
        {searchItem &&
          searchItem.map((item, index) => {
            return <SearchCard detail={item} slNo={index} key={index} />;
          })}

        {searchItem.length == 0 ? (
          <h1 className="text-center mt-3 text-white">search your music</h1>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function SearchCard({ detail, slNo }) {
  const { playlist, setListIndex } = useContext(PlaylistContext);
  const { setNavigatorBlock } = useContext(NavigatorBlockContext);
  const { setNowPlaying } = useContext(NowPlayingContext);

  function playSearchSong() {
    const index = playlist.findIndex((item) => item.id == detail?.id);
    setListIndex(index);
    setNavigatorBlock("home");
    setNowPlaying(detail);
  }

  return (
    <>
      <div
        className="p1-2 cursor-pointer px-3 w-full min-h-[50px]  mt-2 text-white relative border-b-2 border-[#888]"
        onClick={playSearchSong}
      >
        <div className="flex gap-4 items-center">
          <div>{slNo + 1}</div>
          <div>
            <h1 className="text-lg">{detail?.title}</h1>
            <h1 className="text-[12px]">
              <span>{detail?.artist}</span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
