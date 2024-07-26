import Layout from "../../components/Layout";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/blogs/${id}`)
        .then((response) => setPost(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <Layout>
      <h1>{post.title}</h1>
      <p>{post.author}</p>
      <p>{new Date(post.publishedDate).toLocaleDateString()}</p>
      <p>{post.content}</p>
      <Link href="/blog">
        <a>Back to Blog</a>
      </Link>
    </Layout>
  );
};

export default BlogDetail;
