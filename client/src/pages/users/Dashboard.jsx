/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getUserPosts } from "../../controllers/postsController";
import { UserContext } from "../../contexts/UserContext";
import Post from "../../components/Post";
import Alert from "../../components/Alert";
import Success from "../../components/Success";

export default function Dashboard() {
  // Use User Context
  const { user, setUser } = useContext(UserContext);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState(null);

  // Success state
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const { userPosts, email } = await getUserPosts();
      setUser({ email, posts: userPosts });
      setLoading(false);
    }, 1000);
  }, []);

  // Handle delete post
  const handleDelete = async (_id) => {
    try {
      confirm("Do you want to delete ?");
      // Delete the post
      const data = await deletePost(_id);
      setSuccess(data.success);
    } catch (error) {
      setError(error.message);
    }

    const newPosts = user.posts.filter((post) => post._id !== _id);
    setUser({ ...user, posts: newPosts });
  };

  return (
    <section>
      <p className="text-xl font-bold m-4">{user.email}</p>
      <h1 className="text-4xl font-bold m-4">User Dashboard</h1>

      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}

      {success && <Success msg={success} />}
      {error && <Alert msg={error} />}

      <div className="flex w-full flex-wrap">
        {user.posts &&
          user.posts.map((post) => (
            <div className="flex w-1/5 m-2 h-60" key={post._id}>
              <Post post={post}>
                <div className="flex items-center gap-2">
                  <Link
                    className="fa-solid fa-pen-to-square nav-link text-green-500 hover:bg-green-200"
                    title="Update"
                    state={post} // Send the posts to the Update page
                    to="/update"
                  ></Link>
                  <button
                    className="fa-solid fa-trash-can nav-link text-red-500 hover:bg-red-200"
                    title="Delete"
                    onClick={() => handleDelete(post._id)}
                  ></button>
                </div>
              </Post>
            </div>
          ))}
      </div>
    </section>
  );
}
