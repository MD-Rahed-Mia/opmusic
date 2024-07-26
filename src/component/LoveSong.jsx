import React, { useCallback, useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { LoveContext } from "../useContext/LoveContext";
import { PlaylistContext } from "../useContext/PlaylistContext";
import { NowPlayingContext } from "../useContext/NowPlaying";
import { useNavigate } from "react-router-dom";
import { NavigatorBlockContext } from "../useContext/Navigator";

export default function LoveSong() {
  const [localLove, setLocalLove] = useState(
    JSON.parse(localStorage.getItem("loveSong")) || []
  );
  const [loveSongList, setLoveSongList] = useState([]);
  const { playlist } = useContext(PlaylistContext);

  const getMatchingItems = useCallback(() => {
    return playlist.filter((item) => localLove?.includes(item.id));
  }, [localLove, playlist]);

  useEffect(() => {
    setLoveSongList(getMatchingItems);
  }, [localLove, playlist]);

  return (
    <>
      <div>
        <h1 className="text-2xl text-white underline mx-2">Loved Song</h1>
      </div>
      <div className=" max-h-[400px] overflow-y-scroll">
        {loveSongList?.length == 0 ? <h1 className="text-center  mt-3 text-white font-bold">No loved songs found.</h1> : ""}

        {loveSongList?.map((item, index) => {
          return <LoveSongCard key={index} detail={item} slNo={index} />;
        })}
      </div>
    </>
  );
}

function LoveSongCard({ detail, slNo }) {
  const { nowPlaying, setNowPlaying } = useContext(NowPlayingContext);
  const { playlist, setListIndex } = useContext(PlaylistContext);
  const { navigatorBlock, setNavigatorBlock } = useContext(
    NavigatorBlockContext
  );
  function getIndexNumber() {
    const index = playlist.findIndex((item) => item.id == detail?.id);
    return index;
  }

  function handlePlayLoveSong() {
    setNowPlaying(detail);
    setListIndex(getIndexNumber());
    setNavigatorBlock("home");
  }
  return (
    <div
      className="p1-2 cursor-pointer px-3 w-full min-h-[50px]  mt-2 text-white relative border-b-2 border-[#888]"
      onClick={handlePlayLoveSong}
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

      <span className="absolute top-1/2 right-5 -translate-y-1/2 text-orange-300">
        <FaHeart />
      </span>
    </div>
  );
}
