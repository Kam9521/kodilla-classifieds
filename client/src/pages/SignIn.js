import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../redux/userRedux";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await dispatch(loginUser(login, password));
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Sign in</h1>

      {error && <p>{error}</p>}

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

        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
