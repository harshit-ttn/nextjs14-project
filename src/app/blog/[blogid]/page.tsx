"use client";

import React, { useEffect, useState } from "react";
// import Layout from "../layout";
import { useRouter } from "next/router";

const BlogDetail: React.FC<any> = () => {
  const [postData, setPostData] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    fetch(`https://dummyapi.online/api/blogposts/${router?.query?.blogid}`)
      .then((response) => response.json())
      .then((data) => setPostData(data));
  }, [router?.query?.blogid]);

  return (
    // <Layout>
    <div>
      <h1>{postData.title}</h1>
      <p>Author: {postData.author}</p>
      <p>Date: {postData.date_published}</p>
      <p>{postData.content}</p>
      <button onClick={() => router.back()}>Back</button>
    </div>
    // </Layout>
  );
};

export default BlogDetail;
