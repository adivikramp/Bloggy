import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { PostContext } from "../../contexts/PostContext";
import { updatePost } from "../../controllers/postsController";

const UpdatePostPage = () => {
	const { posts, setPosts } = useContext(PostContext);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { state } = useLocation();

	const [formData, setFormData] = useState({
		title: state.title,
		body: state.body,
	});

	const handleInput = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await updatePost(state._id, formData.title, formData.body);
			setPosts([...posts, data.post]);
			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="max-w-2xl mx-auto">
			<div className="mb-8">
				<h1 className="text-3xl font-extrabold text-slate-50 tracking-tight mb-1">
					Edit Post
				</h1>
				<p className="text-slate-500 text-sm">Make your changes below</p>
			</div>

			<div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-8">
				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					<div>
						<label htmlFor="title" className="label">
							Title
						</label>
						<input
							id="title"
							type="text"
							name="title"
							placeholder="Your post title..."
							className="input mb-0 text-lg font-semibold"
							value={formData.title}
							onChange={handleInput}
						/>
					</div>
					<div>
						<label htmlFor="body" className="label">
							Content
						</label>
						<textarea
							id="body"
							name="body"
							placeholder="Write your post here..."
							className="input mb-0 resize-none leading-relaxed"
							rows="10"
							value={formData.body}
							onChange={handleInput}
						/>
					</div>
					<button className="btn" type="submit">
						Save Changes
					</button>
				</form>

				{error && <Alert msg={error} />}
			</div>
		</div>
	);
};

export default UpdatePostPage;
