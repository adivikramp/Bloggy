import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Layout() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Confirm Logout")) {
      setUser({ email: null, posts: [] });
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      navigate("/");
    }
  };

  return (
    <>
      <header className="bg-indigo-500 text-white">
        <nav className="flex items-center justify-between p-4">
          <Link to="/" className="fa-solid fa-house-chimney nav-link"></Link>

          {user.email ? (
            <div className="flex items-center gap-2">
              <Link
                title="Create Post"
                to="/create"
                className="fa-solid fa-circle-plus nav-link"
              ></Link>
              <Link
                title="User Dashboard"
                to="dashboard"
                className="fa-solid fa-circle-user nav-link"
              ></Link>
              <button
                title="Logout"
                onClick={handleLogout}
                className="fa-solid fa-right-from-bracket nav-link"
              ></button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                title="Login"
                to="/login"
                className="fa-solid fa-right-to-bracket nav-link"
              ></Link>
              <Link
                title="Register"
                to="/register"
                className="fa-solid fa-user-plus nav-link"
              ></Link>
            </div>
          )}
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
