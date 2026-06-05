import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./app.css";
import { PostProvider } from "./contexts/PostContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<PostProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</PostProvider>
	</React.StrictMode>,
);
