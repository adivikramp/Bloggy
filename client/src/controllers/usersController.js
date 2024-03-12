/* ---------- Login User ---------- */
const loginUser = async (email, password) => {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const response = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);

  return data;
};

/* ---------- Register User ---------- */
const registerUser = async (email, password, confirmPassword) => {
  if (!email || !password || !confirmPassword) {
    throw Error("All fields are required");
  }

  if (password !== confirmPassword) {
    throw Error("Passwords do not match");
  }

  const response = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);

  return data;
};

export { loginUser, registerUser };
