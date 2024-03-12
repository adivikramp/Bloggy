/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../controllers/postsController";
import { PostContext } from "../../contexts/PostContext";
import Post from "../../components/Post";

export default function Home() {
  // Use post context
  const { posts, setPosts } = useContext(PostContext);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Grab all the posts on page load
  useEffect(() => {
    setTimeout(async () => {
      // Grab all posts
      const data = await getPosts();
      // Update posts state
      setPosts(data.posts);
      // Remove the loading
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="w-full">
      <h1 className="text-4xl font-bold m-4">Latest Posts</h1>

      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}

      <div className="flex w-full flex-wrap">
        {posts &&
          posts.map((post) => (
            <div className="flex w-1/5 m-2 h-60" key={post._id}>
              <Post post={post} />
            </div>
          ))}
      </div>
    </section>
  );
}
