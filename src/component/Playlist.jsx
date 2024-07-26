import React, { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { PlaylistContext } from "../useContext/PlaylistContext";
import { NowPlayingContext } from "../useContext/NowPlaying";
import { useNavigate } from "react-router-dom";
import { NavigatorBlockContext } from "../useContext/Navigator";

export default function Playlist() {
  const { playlist } = useContext(PlaylistContext);
  return (
    <div>
      <div>
        <h1 className="text-2xl text-white px-3 mt-3 font-bold underline">
          Playlist
        </h1>

        <div className="playlist max-h-[350px] overflow-y-scroll">
          {playlist &&
            playlist.map((item, index) => {
              return <PlaylistCard detail={item} key={index} slNo={index} />;
            })}
        </div>
      </div>
    </div>
  );
}

function PlaylistCard({ detail, slNo }) {
  const { nowPlaying, setNowPlaying } = useContext(NowPlayingContext);
  const { setListIndex } = useContext(PlaylistContext);
  const { setNavigatorBlock } = useContext(NavigatorBlockContext);
  const [isLove, setIsLove] = useState(false);

  const navigate = useNavigate();
  function handlePlaylistSong(event, slNo) {
    setNowPlaying(detail);
    setListIndex(slNo);
    navigate("/");
    setNavigatorBlock("home");
  }

  useEffect(() => {
    const localLove = JSON.parse(localStorage.getItem("loveSong")) || [];

    if (localLove.includes(detail?.id)) {
      setIsLove(true);
    }
  }, []);

  return (
    <div
      className="p1-2 cursor-pointer px-3 w-full min-h-[50px]  mt-2 text-white relative border-b-2 border-[#888]"
      onClick={() => handlePlaylistSong(detail, slNo)}
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

      <span
        className={
          isLove
            ? "absolute top-1/2 right-5 -translate-y-1/2 text-orange-300"
            : "absolute top-1/2 right-5 -translate-y-1/2 text-white"
        }
      >
        <FaHeart />
      </span>
    </div>
  );
}
