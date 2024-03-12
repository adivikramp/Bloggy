import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import { registerUser } from "../../controllers/usersController";
import { UserContext } from "../../contexts/UserContext";

export default function Register() {
  // Use User Context
  const { setUser } = useContext(UserContext);

  // Use navigate Hook
  const navigate = useNavigate();

  //Error State
  const [error, setError] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input
  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Register the user
      await registerUser(
        formData.email,
        formData.password,
        formData.confirmPassword
      );
      // Update the user state
      setUser({
        email: formData.email,
        posts: [],
      });
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="card">
      <h1 className="title">Create your account</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="input"
          value={formData.email}
          onChange={handleInput}
          autoFocus
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input"
          value={formData.password}
          onChange={handleInput}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input"
          value={formData.confirmPassword}
          onChange={handleInput}
        />
        <button className="btn">Register</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
}
