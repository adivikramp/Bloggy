/* --------------------------------------------- Get existing posts --------------------------------------------- */
const getPosts = async () => {
  const response = await fetch("http://localhost:5000/api/posts");
  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

/* --------------------------------------------- Get user's existing posts --------------------------------------------- */
const getUserPosts = async () => {
  const response = await fetch("http://localhost:5000/api/posts/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

/* --------------------------------------------- Create new post --------------------------------------------- */
const createPost = async (title, body) => {
  if (!title || !body) {
    throw Error("all fields are required");
  }

  const response = await fetch("http://localhost:5000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

/* --------------------------------------------- Delete a post --------------------------------------------- */
const deletePost = async (_id) => {
  const response = await fetch(`http://localhost:5000/api/posts/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

/* --------------------------------------------- Update a post --------------------------------------------- */
const updatePost = async (_id, title, body) => {
  if (!title || !body) {
    throw Error("All fields are required");
  }

  const response = await fetch(`http://localhost:5000/api/posts/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  return data;
};

export { getPosts, getUserPosts, createPost, deletePost, updatePost };
