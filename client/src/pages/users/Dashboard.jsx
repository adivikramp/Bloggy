/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { Post } from "../../components/Post";
import { Success } from "../../components/Success";
import { UserContext } from "../../contexts/UserContext";
import { deletePost, getUserPosts } from "../../controllers/postsController";

const DashboardPage = () => {
	const { user, setUser } = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
	useEffect(() => {
		setTimeout(async () => {
			const { userPosts, email } = await getUserPosts();
			setUser({ email, posts: userPosts });
			setLoading(false);
		}, 1000);
	}, []);

	const handleDelete = async (_id) => {
		try {
			confirm("Do you want to delete?");
			const data = await deletePost(_id);
			setSuccess(data.success);
		} catch (error) {
			setError(error.message);
		}
		setUser({ ...user, posts: user.posts.filter((p) => p._id !== _id) });
	};

	return (
		<section>
			{/* Header */}
			<div className="flex items-start justify-between mb-10">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-900 text-xs font-bold">
							{user.email?.[0]?.toUpperCase()}
						</div>
						<span className="text-slate-400 text-sm">{user.email}</span>
					</div>
					<h1 className="text-3xl font-extrabold text-slate-50 tracking-tight">
						My Posts
					</h1>
					{!loading && (
						<p className="text-slate-600 text-sm mt-1">
							{user.posts?.length || 0} post
							{user.posts?.length !== 1 ? "s" : ""}
						</p>
					)}
				</div>
				<Link
					to="/create"
					className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 font-bold px-4 py-2 rounded-xl text-sm hover:from-amber-300 hover:to-orange-300 transition-all shadow-lg shadow-amber-500/20"
				>
					<i className="fa-solid fa-plus text-xs"></i>
					New Post
				</Link>
			</div>

			{success && <Success msg={success} />}
			{error && <Alert msg={error} />}

			{loading && (
				<div className="flex justify-center py-24">
					<i className="fa-solid fa-spinner animate-spin text-3xl text-amber-400/60"></i>
				</div>
			)}

			{!loading && user.posts?.length === 0 && (
				<div className="text-center py-24 border border-dashed border-slate-800 rounded-2xl">
					<p className="text-slate-600 text-lg mb-2">Nothing published yet.</p>
					<Link to="/create" className="text-amber-400 hover:underline text-sm">
						Write your first post →
					</Link>
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{user.posts?.map((post) => (
					<Post post={post} key={post._id}>
						<Link
							title="Edit"
							state={post}
							to="/update"
							className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-emerald-500/10 text-slate-600 hover:text-emerald-400 transition-all text-xs"
						>
							<i className="fa-solid fa-pen"></i>
						</Link>
						<button
							type="button"
							title="Delete"
							onClick={() => handleDelete(post._id)}
							className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 text-slate-600 hover:text-red-400 transition-all text-xs"
						>
							<i className="fa-solid fa-trash"></i>
						</button>
					</Post>
				))}
			</div>
		</section>
	);
};

export default DashboardPage;
