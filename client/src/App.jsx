import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import CreatePostPage from "./pages/posts/Create";
import HomePage from "./pages/posts/Home";
import UpdatePostPage from "./pages/posts/Update";
import DashboardPage from "./pages/users/Dashboard";
import LoginPage from "./pages/users/Login";
import RegisterPage from "./pages/users/Register";
import { AuthRoutes } from "./routes/AuthRoutes";
import { GuestRoutes } from "./routes/GuestRoutes";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />

					<Route element={<AuthRoutes />}>
						<Route path="dashboard" element={<DashboardPage />} />
						<Route path="create" element={<CreatePostPage />} />
						<Route path="update" element={<UpdatePostPage />} />
					</Route>

					<Route element={<GuestRoutes />}>
						<Route path="login" element={<LoginPage />} />
						<Route path="register" element={<RegisterPage />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
