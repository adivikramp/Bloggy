import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { UserContext } from "../../contexts/UserContext";
import { loginUser } from "../../controllers/usersController";

const LoginPage = () => {
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const [formData, setFormData] = useState({ email: "", password: "" });

	function handleInput(e) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await loginUser(formData.email, formData.password);
			setUser({ email: formData.email, posts: [] });
			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<section className="card">
			<div className="flex items-center gap-2 mb-8">
				<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
					<i className="fa-solid fa-feather text-slate-900 text-sm" />
				</div>
				<span className="text-xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
					Bloggy
				</span>
			</div>

			<h1 className="title">Welcome back</h1>
			<p className="text-slate-500 text-sm mb-6">Sign in to your account</p>

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="email" className="label">
						Email
					</label>
					<input
						id="email"
						type="email"
						name="email"
						placeholder="you@example.com"
						className="input mb-0"
						value={formData.email}
						onChange={handleInput}
					/>
				</div>
				<div className="mb-6">
					<label htmlFor="password" className="label">
						Password
					</label>
					<input
						id="password"
						type="password"
						name="password"
						placeholder="••••••••"
						className="input mb-0"
						value={formData.password}
						onChange={handleInput}
					/>
				</div>
				<button className="btn" type="submit">
					Sign in
				</button>
			</form>

			{error && <Alert msg={error} />}

			<p className="text-slate-600 text-sm text-center mt-6">
				No account?{" "}
				<Link
					to="/register"
					className="text-amber-400 hover:text-amber-300 transition-colors"
				>
					Create one →
				</Link>
			</p>
		</section>
	);
};

export default LoginPage;
