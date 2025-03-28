"use client";

import React, { useEffect, useState, useRef } from "react";
import "@/styles/globals.css";
import VideoJSPlayer from "./videoplayer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import playIcon from "@/assets/images/play.svg";
import pauseIcon from "@/assets/images/pause.svg";
import { platformTvKeysMeth } from "@/constants/tvKey";

const Player: React.FC = () => {
  const playPauseRef = useRef<HTMLDivElement>(null);
  const [videoJsOptions, setVideoJsOptions] = useState({});
  const [videoNode, setVideoNode] = useState<any>(null);
  const [playerViewData, setPlayerViewData] = useState({
    playPauseState: "play",
  });
  const [isLoading, setIsLoading] = useState(true);

  const playBackUrlResponse = useSelector(
    (state: RootState) => state.videoPlayer.playBackUrlData
  );
  const playBackFormatResponse = useSelector(
    (state: RootState) => state.videoPlayer.playBackFormatData
  );
  const contentNameResponse = useSelector(
    (state: RootState) => state.videoPlayer.contentNameData
  );
  const drmDataResponse = useSelector(
    (state: RootState) => state.videoPlayer.drmData
  );

  useEffect(() => {
    playPauseRef.current?.focus();
  }, [videoJsOptions, isLoading]);

  const togglePlayPause = () => {
    if (playerViewData.playPauseState === "play") {
      videoNode?.current?.pause();
    } else {
      videoNode?.current?.play();
    }
    setPlayerViewData((prev) => ({
      ...prev,
      playPauseState: prev.playPauseState === "play" ? "pause" : "play",
    }));
  };

  const handleKeyEvents = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = platformTvKeysMeth();
    switch (e.keyCode) {
      case keys.KEY_ENTER:
      case keys.KEY_PLAY:
        videoNode?.current?.play();
        break;
      case keys.KEY_PAUSE:
        videoNode?.current?.pause();
        break;
      case keys.KEY_RETURN:
      case keys.KEY_BACK:
      case keys.KEY_STOP:
        window.history.back();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (playBackUrlResponse) {
      const isHLS = playBackUrlResponse.includes(".m3u8");
      const isDash = playBackFormatResponse.includes(".mpd");
      const licenseUrl = "https://widevine-proxy.drm.technology/proxy";

      let options: any = { src: playBackUrlResponse };

      if (isHLS || playBackFormatResponse === "VOD_HLS") {
        options.type = "application/x-mpegURL"; // HLS
      } else if (isDash || playBackFormatResponse === "VOD_DASH") {
        options.type = "application/dash+xml"; // DASH
      } else {
        options.type = "video/mp4"; // MP4
      }

      if (drmDataResponse) {
        options.keySystems = {
          "com.widevine.alpha": {
            url: drmDataResponse.license_url || licenseUrl,
            licenseHeaders: drmDataResponse.token
              ? {
                  "x-vudrm-token": drmDataResponse.token,
                  kid: drmDataResponse.kid,
                }
              : {},
          },
        };
      }

      setVideoJsOptions(options);
    }
  }, [playBackUrlResponse]);

  return (
    <div className="player-container">
      {!isLoading && <h2 className="player-title">{contentNameResponse}</h2>}

      <div className="player-main">
        <VideoJSPlayer
          options={videoJsOptions}
          setVideoNode={setVideoNode}
          playerViewData={playerViewData}
          setPlayerViewData={setPlayerViewData}
          setIsLoading={setIsLoading}
        />
      </div>

      {!isLoading && (
        <div className="player-controls">
          <div
            className="play-pause-container"
            ref={playPauseRef}
            tabIndex={0}
            onClick={togglePlayPause}
            onKeyDown={handleKeyEvents}
          >
            <img
              src={
                playerViewData.playPauseState === "play" ? playIcon : pauseIcon
              }
              alt="Play/Pause"
            />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loader-container">
          <img
            className="loader-image"
            src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
            alt="Loading..."
          />
        </div>
      )}
    </div>
  );
};

export default Player;
