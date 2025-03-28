"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    player: any;
    videojs: any;
  }
}

interface VideoPlayerProps {
  options: any;
  setVideoNode: (node: any) => void;
  playerViewData: any;
  setPlayerViewData: (data: any) => void;
  setIsLoading: (loading: boolean) => void;
}

const VideoJSPlayer: React.FC<VideoPlayerProps> = ({
  options,
  setVideoNode,
  playerViewData,
  setPlayerViewData,
  setIsLoading,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let player: any;

  useEffect(() => {
    if (!window.videojs || !videoRef.current) return;

    player = window.videojs(videoRef.current, {
      controlBar: false,
      errorDisplay: false,
      textTrackSettings: false,
      bigPlayButton: false,
      loadingSpinner: false,
      posterImage: false,
      controls: true,
      autoplay: true,
    });

    window.player = player;
    setVideoNode(videoRef);

    // DRM Encrypted Media Extensions
    player.eme?.();
    player.src(options);
    bindPlayerEvents();

    return () => {
      player.dispose();
      setVideoNode(null);
      window.player = null;
    };
  }, [options?.src]);

  const bindPlayerEvents = () => {
    player.on("play", () =>
      setPlayerViewData((prev: any) => ({ ...prev, playPauseState: "play" }))
    );
    player.on("pause", () =>
      setPlayerViewData((prev: any) => ({ ...prev, playPauseState: "pause" }))
    );
    player.on("loadeddata", () => setIsLoading(false));
    player.on("seeking", () => setIsLoading(true));
    player.on("seeked", () => setIsLoading(false));
  };

  useEffect(() => {
    if (playerViewData.playPauseState === "play") {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [playerViewData.playPauseState]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-tech"></video>
    </div>
  );
};

export default VideoJSPlayer;
