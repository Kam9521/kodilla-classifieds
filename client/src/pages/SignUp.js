import { useState } from "react";

import { API_URL } from "../config";

const SignUp = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const formData = new FormData();

    formData.append("login", login);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("avatar", avatar);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Registration successful. You can now sign in.");

      setLogin("");
      setPassword("");
      setPhone("");
      setAvatar(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Sign up</h1>

      {error && <p>{error}</p>}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Login</label>
          <input
            id="login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="avatar">Avatar</label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            required
          />
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUp;
