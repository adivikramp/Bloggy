import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Layout = () => {
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
			<header className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#080c14]/80 backdrop-blur-xl">
				<nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
					<Link to="/" className="flex items-center gap-2 group">
						<div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
							<i className="fa-solid fa-feather text-slate-900 text-xs"></i>
						</div>
						<span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
							Bloggy
						</span>
					</Link>

					{user.email ? (
						<div className="flex items-center gap-1">
							<Link title="New Post" to="/create" className="nav-link">
								<i className="fa-solid fa-plus"></i>
							</Link>
							<Link title="Dashboard" to="/dashboard" className="nav-link">
								<i className="fa-solid fa-user"></i>
							</Link>
							<button
								type="button"
								title="Logout"
								onClick={handleLogout}
								className="nav-link"
							>
								<i className="fa-solid fa-arrow-right-from-bracket"></i>
							</button>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<Link
								to="/login"
								className="text-sm text-slate-400 hover:text-slate-50 transition-colors px-3 py-1.5"
							>
								Login
							</Link>
							<Link
								to="/register"
								className="text-sm font-semibold bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 px-4 py-1.5 rounded-lg hover:from-amber-300 hover:to-orange-300 transition-all shadow-md shadow-amber-500/20"
							>
								Sign up
							</Link>
						</div>
					)}
				</nav>
			</header>

			<main className="max-w-6xl mx-auto px-6 py-10">
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
