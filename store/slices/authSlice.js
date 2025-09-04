import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return { user: null, token: null, role: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { user: null, token: null, role: null };
  }
};

const initialState = loadState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } } // The payload only has user and token
    ) => {
      state.user = user;
      state.token = token;
      state.role = user.role;
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("authState", serializedState);
      } catch (err) {}
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      try {
        localStorage.removeItem("authState");
      } catch (err) {}
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
