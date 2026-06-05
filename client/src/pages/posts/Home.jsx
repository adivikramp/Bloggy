/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../components/Post";
import { PostContext } from "../../contexts/PostContext";
import { UserContext } from "../../contexts/UserContext";
import { getPosts } from "../../controllers/postsController";

const HomePage = () => {
	const { posts, setPosts } = useContext(PostContext);
	const { user } = useContext(UserContext);
	const [loading, setLoading] = useState(true);

	// biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
	useEffect(() => {
		setTimeout(async () => {
			const data = await getPosts();
			setPosts(data.posts);
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<section className="w-full">
			{/* Hero */}
			<div className="relative mb-16 py-16 text-center overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-b from-slate-900/80 to-transparent">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,191,36,0.08),transparent_70%)] pointer-events-none" />
				<div className="relative">
					<span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full mb-4">
						Open Publishing Platform
					</span>
					<h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-50 mb-4 leading-tight">
						Ideas worth
						<br />
						<span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
							sharing.
						</span>
					</h1>
					<p className="text-slate-400 text-lg max-w-md mx-auto mb-8">
						Read thoughts from writers around the world, or publish your own.
					</p>
					{!user.email && (
						<Link
							to="/register"
							className="inline-block bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 font-bold px-8 py-3 rounded-xl hover:from-amber-300 hover:to-orange-300 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
						>
							Start writing
						</Link>
					)}
					{user.email && (
						<Link
							to="/create"
							className="inline-block bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 font-bold px-8 py-3 rounded-xl hover:from-amber-300 hover:to-orange-300 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
						>
							+ New Post
						</Link>
					)}
				</div>
			</div>

			{/* Posts */}
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-bold text-slate-50">
					Latest Posts
					{!loading && posts?.length > 0 && (
						<span className="ml-2 text-sm font-normal text-slate-500">
							{posts.length} posts
						</span>
					)}
				</h2>
			</div>

			{loading && (
				<div className="flex justify-center py-24">
					<i className="fa-solid fa-spinner animate-spin text-3xl text-amber-400/60"></i>
				</div>
			)}

			{!loading && posts?.length === 0 && (
				<div className="text-center py-24 border border-dashed border-slate-800 rounded-2xl">
					<p className="text-slate-600 text-lg mb-2">No posts yet.</p>
					<Link
						to="/register"
						className="text-amber-400 hover:underline text-sm"
					>
						Be the first to write one →
					</Link>
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{posts?.map((post) => (
					<Post post={post} key={post._id} />
				))}
			</div>
		</section>
	);
};

export default HomePage;
