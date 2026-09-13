import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getIsLogged, getUser, logoutUser } from "../redux/userRedux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>

        {" | "}

        {isLogged ? (
          <>
            <span>Logged as: {user.login}</span>

            {" | "}

            <button type="button" onClick={handleLogout}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign in</Link>

            {" | "}

            <Link to="/signup">Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
