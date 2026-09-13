import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../config";

const adsSlice = createSlice({
  name: "ads",
  initialState: [],
  reducers: {
    setAds: (state, action) => action.payload,
  },
});

export const { setAds } = adsSlice.actions;

export const getAllAds = (state) => state.ads;

export const getAdById = (state, id) => state.ads.find((ad) => ad._id === id);

export const fetchAds = () => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/api/ads`);

    if (!response.ok) {
      throw new Error("Failed to fetch ads");
    }

    const ads = await response.json();

    dispatch(setAds(ads));
  };
};
export const fetchSearchResults = (searchPhrase) => {
  return async (dispatch) => {
    const response = await fetch(
      `${API_URL}/api/ads/search/${encodeURIComponent(searchPhrase)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const ads = await response.json();

    dispatch(setAds(ads));
  };
};

export default adsSlice.reducer;
