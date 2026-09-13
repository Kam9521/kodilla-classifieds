import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "./adsRedux";

const store = configureStore({
  reducer: {
    ads: adsReducer,
  },
});

export default store;
