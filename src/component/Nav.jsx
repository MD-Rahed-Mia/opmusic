import React, { useContext } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { MdQueueMusic } from "react-icons/md";
import { NavigatorBlockContext } from "../useContext/Navigator";

export default function Nav() {
  const { setNavigatorBlock } = useContext(NavigatorBlockContext);
  function handlePlaylist() {
    setNavigatorBlock("playlist");
  }

  function hanldeMinimize() {
    setNavigatorBlock("home");
  }
  return (
    <div className="w-full p-2 min-h-12 flex items-center justify-between px-4  select-none text-white text-xl">
      <div className="cursor-pointer" onClick={hanldeMinimize}>
        <FaChevronDown />
      </div>
      <div className="cursor-pointer">
        <span>OPMUSIC</span>
      </div>
      <div className="cursor-pointer" onClick={handlePlaylist}>
        <span>
          <MdQueueMusic />
        </span>
      </div>
    </div>
  );
}
