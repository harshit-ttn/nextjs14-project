"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { platformTvKeysMeth } from "@/constants/tvKey";
import { ROUTES } from "@/constants/routeConstant";
import { contentList } from "@/slices/home-slice";
import { RootState } from "@/store/store";

type WidgetBlockProps = {
  data: { heading: string; bgUrl: string };
  index: number;
  fromDrm?: boolean;
};

const WidgetBlock: React.FC<WidgetBlockProps> = ({ data, index, fromDrm }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const listIndex = useSelector<RootState, number>(
    (state) => state.homePage.contentListIndex
  );

  useEffect(() => {
    setCurrentIndex(listIndex ?? 0);
  }, [listIndex]);

  useEffect(() => {
    if (index === currentIndex) {
      divRef.current?.focus();
    }
  }, [currentIndex, index]);

  const onClick = () => {
    dispatch(contentList(index));
    router.push(ROUTES.LIST);
  };

  const onFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    event.preventDefault();
    const currentElement = event.target;
    if (currentElement?.parentElement) {
      Array.from(currentElement.parentElement.children).forEach((el) =>
        el.classList.remove("focus")
      );
      currentElement.classList.add("focus");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = platformTvKeysMeth();
    const element = e.target as HTMLElement;

    switch (e.keyCode) {
      case keys.KEY_RETURN:
      case keys.KEY_BACK:
        dispatch(contentList(0));
        router.back();
        break;

      case keys.KEY_UP:
        if (!fromDrm) {
          element.classList.remove("focus");
          const ele =
            element?.parentElement?.parentElement?.children?.[2]?.firstChild;
          if (ele) (ele as HTMLElement).focus();
        }
        break;

      case keys.KEY_DOWN:
        if (fromDrm) {
          element.classList.remove("focus");
          const ele =
            element?.parentElement?.parentElement?.children?.[4]?.firstChild;
          if (ele) (ele as HTMLElement).focus();
        }
        break;

      case keys.KEY_RIGHT:
        element.classList.remove("focus");
        element?.nextSibling && (element.nextSibling as HTMLElement).focus();
        break;

      case keys.KEY_LEFT:
        element.classList.remove("focus");
        element?.previousSibling &&
          (element.previousSibling as HTMLElement).focus();
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
      key={index}
      ref={index === currentIndex ? divRef : null}
      className="widget-block"
      onKeyDown={handleKeyDown}
      onClick={onClick}
      onFocus={onFocus}
      tabIndex={0}
    >
      <img className="content-poster" src={data.bgUrl} alt="Content Poster" />
      <h1 className="content-heading">{data.heading}</h1>
    </div>
  );
};

export default WidgetBlock;
