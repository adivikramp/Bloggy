import { useContext, useState } from "react";
import { updatePost } from "../../controllers/postsController";
import Alert from "../../components/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { PostContext } from "../../contexts/PostContext";

export default function Update() {
  // use Post Context
  const { posts, setPosts } = useContext(PostContext);

  // Error State
  const [error, setError] = useState(null);

  // Use navigate hook
  const navigate = useNavigate();

  // Use location hook
  const { state } = useLocation();

  // Form data state
  const [formData, setFormData] = useState({
    title: state.title,
    body: state.body,
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update a post
      const data = await updatePost(state._id, formData.title, formData.body);
      // Update post state
      setPosts([...posts, data.post]);
      // navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="title">Update Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          className="input"
          value={formData.title}
          onChange={handleInput}
          autoFocus
        />
        <textarea
          name="body"
          placeholder="Content"
          className="input"
          rows="6"
          value={formData.body}
          onChange={handleInput}
        />
        <button className="btn" type="submit">
          Update
        </button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
}
