import { configureStore } from "@reduxjs/toolkit";

import adsReducer from "./adsRedux";
import userReducer from "./userRedux";

const store = configureStore({
  reducer: {
    ads: adsReducer,
    user: userReducer,
  },
});

export default store;
