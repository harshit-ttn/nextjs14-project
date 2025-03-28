"use client";

import React from "react";
import "@/styles/globals.css";
import MovieBlock from "@/components/MovieBlock";
import { drmDataList } from "@/utils/drmData";
import { nonDrmDataList } from "@/utils/nonDrmData";
import { liveDataList } from "@/utils/liveData";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ListPage: React.FC = () => {
  const listIndex = useSelector(
    (state: RootState) => state.homePage.contentListIndex
  );

  const contentData = [
    { name: "DRM Contents", dataArr: drmDataList },
    { name: "NON-DRM Contents", dataArr: nonDrmDataList },
    { name: "Live Contents", dataArr: liveDataList },
  ];

  return (
    <div className="list-page">
      <div className="background-shapes">
        <div className="left-circle"></div>
        <div className="right-circle"></div>
        <div className="bottom-triangle"></div>
        <div className="upper-triangle"></div>
      </div>

      <h1 className="content-title-heading">
        <span className="fancy">
          {contentData[listIndex]?.name || "Content"}
        </span>
      </h1>

      <div className="movie-block-container">
        {contentData[listIndex]?.dataArr?.map((item: any, index: any) => (
          <MovieBlock key={index} data={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
