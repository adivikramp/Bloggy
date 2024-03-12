import { useContext, useState } from "react";
import { createPost } from "../../controllers/postsController";
import Alert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../contexts/PostContext";

export default function Create() {
  // use Post Context
  const { posts, setPosts } = useContext(PostContext);

  // Error State
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    body: "",
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
      // Create new post
      const data = await createPost(formData.title, formData.body);
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
      <h1 className="title">Create Post</h1>

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
          Create
        </button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
}
