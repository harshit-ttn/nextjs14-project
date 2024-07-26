import Layout from "../components/Layout";
import BlogForm from "../components/BlogForm";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/blogs")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Layout>
      <h1>Blog Page</h1>
      <BlogForm />
      <div className="cards">
        {posts.map((post) => (
          <div key={post._id} className="card">
            <h2>{post.title}</h2>
            <p>{post.author}</p>
            <p>{new Date(post.publishedDate).toLocaleDateString()}</p>
            <p>{post.content.slice(0, 20)}...</p>
            <Link href={`/blog/${post._id}`}>
              <a>Read More</a>
            </Link>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        ))}
      </div>
    </Layout>
  );

  async function handleDelete(id) {
    try {
      await axios.delete(`/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error(error);
    }
  }
};

export default Blog;
