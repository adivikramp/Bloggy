import { useState } from "react";

const Success = ({ msg }) => {
	const [show, setShow] = useState(true);

	setTimeout(() => setShow(false), 2000);

	return (
		<>
			{show && (
				<div className="flex items-center gap-3 bg-emerald-500/8 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl mt-4 mb-4 text-sm">
					<i className="fa-solid fa-circle-check shrink-0"></i>
					<span>{msg}</span>
				</div>
			)}
		</>
	);
};

export { Success };
