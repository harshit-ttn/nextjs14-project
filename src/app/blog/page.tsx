"use client";

import React, { useEffect, useState } from "react";
// import Layout from "../layout";
import Link from "next/link";
import styles from "./page.module.css";

const Blog: React.FC<any> = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dummyapi.online/api/blogposts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    // <Layout>
    <div>
      <h1>Blog Page</h1>
      <div className={styles.blogList}>
        {posts.map((post: any) => (
          <div key={post.id} className={styles.card}>
            <h2>{post.title}</h2>
            <p>Author: {post.author}</p>
            <p>Date: {post.date_published}</p>
            <p>Summary: {post.content?.slice(0, 20)}...</p>
            <Link href={`/blog/${post.id}`}>
              <button>Read More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
    // </Layout>
  );
};

export default Blog;
