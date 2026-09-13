import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchSearchResults, getAllAds } from "../redux/adsRedux";

import AdSummary from "../components/AdSummary";

const SearchResults = () => {
  const { searchPhrase } = useParams();

  const dispatch = useDispatch();

  const ads = useSelector(getAllAds);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    dispatch(fetchSearchResults(searchPhrase))
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, searchPhrase]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search results</h1>

      <p>
        Results for: <strong>{searchPhrase}</strong>
      </p>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && ads.length === 0 && <p>No ads found.</p>}

      {!loading && !error && ads.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {ads.map((ad) => (
            <AdSummary key={ad._id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
