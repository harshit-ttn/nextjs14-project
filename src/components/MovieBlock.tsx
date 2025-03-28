"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { platformTvKeysMeth } from "@/constants/tvKey";
import { ROUTES } from "@/constants/routeConstant";
import {
  playBackUrl,
  playBackFormat,
  contentName,
  drmValues,
} from "@/slices/player-slice";
import { movieList } from "@/slices/home-slice";

type MovieBlockProps = {
  data: {
    playback_url: string;
    format: string;
    content_name: string;
    drmKeyValues: any;
    poster_url: string;
  };
  index: number;
};

const MovieBlock: React.FC<MovieBlockProps> = ({ data, index }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const movieBlockIndex = useSelector(
    (state: RootState) => state.homePage.movieListIndex
  );

  useEffect(() => {
    setSelectedIndex(movieBlockIndex ?? 0);
  }, [movieBlockIndex]);

  useEffect(() => {
    if (index === selectedIndex && divRef.current) {
      divRef.current.focus();
    }
  }, [selectedIndex, index]);

  const onClick = () => {
    dispatch(movieList(index));
    dispatch(playBackUrl(data.playback_url));
    dispatch(playBackFormat(data.format));
    dispatch(contentName(data.content_name));
    dispatch(drmValues(data.drmKeyValues));
    router.push(ROUTES.PLAYER);
  };

  const onFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    event.target.parentElement
      ?.querySelectorAll(".focus")
      ?.forEach((el) => el.classList.remove("focus"));
    event.target.classList.add("focus");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = platformTvKeysMeth();
    const element = e.target as HTMLElement;

    switch (e.keyCode) {
      case keys.KEY_RETURN:
      case keys.KEY_BACK:
        dispatch(movieList(0));
        router.back();
        break;

      case keys.KEY_UP:
        (element.parentElement?.children[index - 6] as HTMLElement)?.focus();
        break;

      case keys.KEY_DOWN:
        (element.parentElement?.children[index + 6] as HTMLElement)?.focus();
        break;

      case keys.KEY_RIGHT:
        (element.nextSibling as HTMLElement)?.focus();
        break;

      case keys.KEY_LEFT:
        (element.previousSibling as HTMLElement)?.focus();
        break;

      case keys.KEY_ENTER:
        onClick();
        break;

      default:
        break;
    }
  };

  return (
    <div
      ref={index === selectedIndex ? divRef : null}
      className="movie-block"
      onKeyDown={handleKeyDown}
      onClick={onClick}
      onFocus={onFocus}
      tabIndex={0}
    >
      <img className="poster" src={data.poster_url} alt="Movie Poster" />
      <div className="play-button">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4028/4028570.png"
          alt="Play Button"
        />
      </div>
    </div>
  );
};

export default MovieBlock;
