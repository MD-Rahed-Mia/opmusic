import { useContext, useEffect, useState } from "react";
import Nav from "../component/Nav";
import MusicPanel from "../component/MusicPanel";
import FooterMenu from "../component/FooterMenu";
import { NowPlayingContext } from "../useContext/NowPlaying";
import { PlaylistContext } from "../useContext/PlaylistContext";
import Layout from "./Layout";
import { NavigatorBlockContext } from "../useContext/Navigator";
import LoveSong from "../component/LoveSong";
import Playlist from "../component/Playlist";
import Search from "../component/Search";

export default function Home() {
  const { navigatorBlock, setNavigatorBlock } = useContext(
    NavigatorBlockContext
  );
  const { playlist, listIndex } = useContext(PlaylistContext);
  const { nowPlaying, setNowPlaying } = useContext(NowPlayingContext);

  useEffect(() => {
    if (playlist) {
      setNowPlaying(playlist[listIndex]);
    }
  }, [playlist]);

  return (
    <div>
      <section
        className="w-full min-h-[100vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0, 0.2), rgba(0,0,0, 0.2)), url(/images/background.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <main
          className="w-[300px] relative min-h-[600px] rounded-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(19,13,131,0.8953782196472339) 0%, rgba(73,34,161,0.9429972672662815) 96%)",
            backdropFilter: "revert-layer",
          }}
        >
          <Layout>
            <MusicPanel detail={nowPlaying} isActive={navigatorBlock} />

            {navigatorBlock === "loveSong" ? <LoveSong /> : ""}

            {navigatorBlock === "playlist" ? <Playlist /> : ""}
            {navigatorBlock === "search" ? <Search /> : ""}
          </Layout>
        </main>
      </section>
    </div>
  );
}
