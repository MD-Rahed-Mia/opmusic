import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import PlayListProvider from "./useContext/PlaylistContext.jsx";
import NowPlayingProvider from "./useContext/NowPlaying.jsx";
import NavigatorBlockProvider from "./useContext/Navigator.jsx";
import LoveContextProvider from "./useContext/LoveContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlayListProvider>
      <NowPlayingProvider>
        <NavigatorBlockProvider>
          <LoveContextProvider>
            <App />
          </LoveContextProvider>
        </NavigatorBlockProvider>
      </NowPlayingProvider>
    </PlayListProvider>
  </React.StrictMode>
);
