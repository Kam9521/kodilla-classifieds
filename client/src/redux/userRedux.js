import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../config";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const getUser = (state) => state.user;
export const getIsLogged = (state) => Boolean(state.user);

export const loginUser = (login, password) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    const userResponse = await fetch(`${API_URL}/auth/user`, {
      credentials: "include",
    });

    if (!userResponse.ok) {
      throw new Error("Failed to get user data");
    }

    const user = await userResponse.json();

    dispatch(setUser(user));

    return user;
  };
};
export const fetchUser = () => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/auth/user`, {
      credentials: "include",
    });

    if (!response.ok) {
      dispatch(clearUser());
      return null;
    }

    const user = await response.json();

    dispatch(setUser(user));

    return user;
  };
};
export const logoutUser = () => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    dispatch(clearUser());
  };
};

export default userSlice.reducer;
