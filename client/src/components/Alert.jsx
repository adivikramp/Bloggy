const Alert = ({ msg }) => {
	return (
		<div className="flex items-center gap-3 bg-red-500/8 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mt-4 text-sm">
			<i className="fa-solid fa-circle-exclamation shrink-0"></i>
			<span>{msg}</span>
		</div>
	);
};

export { Alert };
