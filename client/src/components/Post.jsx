const Post = ({ post, children }) => {
	const date = new Date(post.createdAt).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	return (
		<div className="group relative bg-slate-900/60 rounded-2xl border border-slate-800 p-5 flex flex-col gap-3 hover:border-slate-700 hover:bg-slate-900 transition-all hover:shadow-xl hover:shadow-black/30 overflow-hidden">
			{/* Subtle top accent line */}
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

			<div className="flex items-center justify-between">
				<span className="text-xs font-semibold text-amber-400/80 uppercase tracking-widest">
					{date}
				</span>
				{children && <div className="flex items-center gap-1">{children}</div>}
			</div>

			<div className="flex-1">
				<h3 className="text-base font-bold text-slate-50 leading-snug mb-2 line-clamp-2 group-hover:text-white transition-colors">
					{post.title}
				</h3>
				<p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
					{post.body}
				</p>
			</div>

			<div className="pt-1 border-t border-slate-800">
				<span className="text-xs text-slate-600">
					{post.body?.split(" ").length || 0} words
				</span>
			</div>
		</div>
	);
};

export { Post };
