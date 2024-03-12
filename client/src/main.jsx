import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import UserProvider from "./contexts/UserContext.jsx";
import { PostProvider } from "./contexts/PostContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PostProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PostProvider>
  </React.StrictMode>
);
