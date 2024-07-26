import React, { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { CiCircleList } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { NavigatorBlockContext } from "../useContext/Navigator";
export default function FooterMenu() {
  const { setNavigatorBlock } = useContext(NavigatorBlockContext);

  function handleLoveSong() {
    setNavigatorBlock("loveSong");
  }

  function handleHome() {
    setNavigatorBlock("home");
  }
  function handlePlaylist() {
    setNavigatorBlock("playlist");
  }
  function handleSearch() {
    setNavigatorBlock("search");
  }

  return (
    <div className="absolute bg-[#000000ba] w-full min-h-12 bottom-0 left-0 rounded-3xl text-white flex items-center justify-evenly gap-5 shadow-lg select-none">
      <div
        className="flex items-center justify-center flex-col cursor-pointer text-sm"
        onClick={handleHome}
      >
        <FaHome />
        <span>Home</span>
      </div>
      <div
        className="flex items-center justify-center flex-col cursor-pointer text-sm"
        onClick={handleSearch}
      >
        <IoSearchSharp />
        <span>Search</span>
      </div>
      <div
        className="flex items-center justify-center flex-col cursor-pointer text-sm"
        onClick={handlePlaylist}
      >
        <CiCircleList />
        <span>Playlist</span>
      </div>
      <div
        className="flex items-center justify-center flex-col cursor-pointer text-sm text-orange-300"
        onClick={handleLoveSong}
      >
        <FaHeart />
        <span>Love</span>
      </div>
    </div>
  );
}
