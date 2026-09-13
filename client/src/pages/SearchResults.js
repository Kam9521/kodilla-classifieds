import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchSearchResults, getAllAds } from "../redux/adsRedux";

import AdSummary from "../components/AdSummary";

const SearchResults = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(fetchSearchResults(searchPhrase));
  }, [dispatch, searchPhrase]);

  return (
    <div>
      <h1>Search results</h1>

      <p>
        Results for: <strong>{searchPhrase}</strong>
      </p>

      {ads.length === 0 ? (
        <p>No ads found.</p>
      ) : (
        <div>
          {ads.map((ad) => (
            <AdSummary key={ad._id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
