import { duration, Slider } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import { MdOutlineSkipNext } from "react-icons/md";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { FaPause } from "react-icons/fa6";
import { NowPlayingContext } from "../useContext/NowPlaying";
import { PlaylistContext } from "../useContext/PlaylistContext";
import { LoveContext } from "../useContext/LoveContext";

export default function MusicPanel({ isActive }) {
  // const [player, setPlayer] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [property, setProperty] = useState({});
  const [detail, setDetail] = useState(null);
  const { nowPlaying, setNowPlaying } = useContext(NowPlayingContext);

  //setup love song
  const { loveSong, setLoveSong } = useContext(LoveContext);

  useEffect(() => {
    setDetail(nowPlaying);
  }, [nowPlaying]);

  useEffect(() => {
    //initiate audio player
    const audioPlayer = document.getElementById("player");
    setPlayer(document.getElementById("player"));

    //handle loading metadata
    const handleMetaData = () => {
      setProperty(() => {
        return {
          ...property,
          duration: player?.duration,
          currentTime: player?.currentTime,
        };
      });
    };

    //handle current time
    function handleTimeUpdate() {
      setProperty({
        ...property,
        duration: player?.duration,
        currentTime: player?.currentTime,
      });
    }

    //added event for load meta data
    audioPlayer.addEventListener("loadedmetadata", handleMetaData);
    //added event for time calculate
    audioPlayer.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioPlayer.removeEventListener("loadedmetadata", handleMetaData);
      audioPlayer.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [detail, player]);

  //play music and setup audio src
  useEffect(() => {
    if (player && nowPlaying) {
      player.src = nowPlaying?.path;
      if (isPlaying) {
        player?.play();
      }
    }
  }, [nowPlaying, player, isPlaying]);

  //check is loved or not
  const [isLove, setIsLove] = useState();

  useEffect(() => {
    const isHasLove = loveSong?.includes(detail?.id);
    if (isHasLove) {
      setIsLove(true);
    } else {
      setIsLove(false);
    }
  }, [detail]);

  return (
    <div
      className="w-full mt-10"
      style={{
        visibility: isActive == "home" ? "visible" : "hidden",
        width: isActive == "home" ? "100%" : "0",
        height: isActive == "home" ? "100%" : "0",
        overflow: "hidden",
      }}
    >
      <audio id="player">
        {detail?.path && <source src={detail?.path} type="audio/mp3" />}
      </audio>

      <div className="w-[180px] h-[180px] mx-auto rounded-full overflow-hidden">
        <img
          src="/images/colorful_music.jpg"
          alt="panel title"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between px-4 py-1 mt-4 text-white">
        <div
          className={
            isLove
              ? "text-orange-300 cursor-pointer"
              : "text-white cursor-pointer"
          }
          onClick={() => {
            setLoveSong(() => {
              try {
                const getLovedSong =
                  JSON.parse(localStorage.getItem("loveSong")) || [];

                if (getLovedSong.includes(detail?.id)) {
                  getLovedSong.splice(getLovedSong.indexOf(detail?.id), 1);
                  localStorage.setItem(
                    "loveSong",
                    JSON.stringify(getLovedSong)
                  );

                  setIsLove(false);
                } else {
                  getLovedSong.push(detail?.id);
                  localStorage.setItem(
                    "loveSong",
                    JSON.stringify(getLovedSong)
                  );
                  setIsLove(true);
                }
              } catch (error) {
                console.log(error);
              }
            });
          }}
        >
          <FaHeart />
        </div>
        <div className="text-center">
          <h1 className="text-lg font-bold">{detail?.title}</h1>
          <h3 className="font-light text-sm">{detail?.artist}</h3>
        </div>
        <div className="text-sky-300 cursor-pointer">
          <HiOutlineDotsHorizontal />
        </div>
      </div>

      <div>
        <MusicSlider player={player} property={property} />
      </div>

      <div>
        <MusicController
          player={player}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioId={Number(detail?.id)}
        />
      </div>

      {/* <div>
        <RatingBar />
      </div> */}
    </div>
  );
}

const MusicSlider = ({ player, property }) => {
  const [time, setTime] = useState({});
  const [currentTime, setCurrentTime] = useState({});
  const [sliderValue, setSliderValue] = useState(0);
  useEffect(() => {
    const minute = Math.floor(Number(property?.duration) / 60);
    const seconds = Math.floor(Number(property?.duration % 60));
    const currMinute = Math.floor(Number(property?.currentTime) / 60);
    const currSeconds = Math.floor(Number(property?.currentTime % 60));

    //total duration setup
    setTime({
      ...time,
      minute,
      seconds,
    });

    //setup current time display
    setCurrentTime({
      ...currentTime,
      currMinute,
      currSeconds,
    });
  }, [property]);

  useEffect(() => {
    if (property?.duration && property?.currentTime) {
      const percentage = (property.currentTime / property.duration) * 100;
      setSliderValue(Math.ceil(percentage));
    }
  }, [property?.currentTime]);

  //hanlde slider value on click
  function handleSliderClick(event) {
    setSliderValue(event.target.value);
    player.currentTime = (event.target.value / 100) * property?.duration;
  }

  return (
    <div className="w-[80%] mx-auto mt-4">
      <Slider
        max={100}
        defaultValue={0}
        aria-label="default"
        value={sliderValue}
        valueLabelDisplay="auto"
        onChange={(event) => handleSliderClick(event)}
      />
      <div className="flex items-center justify-between text-sm text-white">
        <span>
          {currentTime?.currMinute < 10
            ? "0" + currentTime?.currMinute
            : currentTime?.currMinute}
          :
          {currentTime?.currSeconds < 10
            ? "0" + currentTime?.currSeconds
            : currentTime?.currSeconds}
        </span>
        <span>
          {time?.minute < 10 ? "0" + time?.minute : time?.minute} :
          {time?.seconds < 10 ? "0" + time?.seconds : time?.seconds}
        </span>
      </div>
    </div>
  );
};

const MusicController = ({ player, isPlaying, setIsPlaying, audioId }) => {
  const { playlist, listIndex, setListIndex } = useContext(PlaylistContext);
  const { nowPlaying, setNowPlaying } = useContext(NowPlayingContext);
  function playAudio() {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  }

  //play next song if ends
  if (player?.currentTime == player?.duration) {
    setNowPlaying(playlist?.[listIndex + 1]);
    setListIndex(listIndex + 1);
  }

  useEffect(() => {}, []);

  function handleNextTrack() {
    const id = listIndex + 1;
    const len = playlist.length;
    if (len == id) {
      setListIndex(0);
      setNowPlaying(playlist[0]);
    } else {
      setListIndex(id);
      setNowPlaying(playlist[id]);
    }
  }

  function handlePrevTrack() {
    const id = listIndex - 1;

    const len = playlist.length;
    if (id < 0) {
      setListIndex(len - 1);
      setNowPlaying(playlist[len - 1]);
    } else {
      setListIndex(id);
      setNowPlaying(playlist[id]);
    }
  }
  return (
    <div className="text-3xl text-white flex items-center justify-center gap-4 mt-5">
      <div className="text-white cursor-pointer" onClick={handlePrevTrack}>
        <MdOutlineSkipPrevious />
      </div>
      <div className="text-white cursor-pointer" onClick={playAudio}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </div>
      <div className="text-white cursor-pointer" onClick={handleNextTrack}>
        <MdOutlineSkipNext />
      </div>
    </div>
  );
};

//rating bar
const RatingBar = ({ rating = 3 }) => {
  return (
    <>
      <div className="flex items-center justify-center mt-3">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    </>
  );
};
