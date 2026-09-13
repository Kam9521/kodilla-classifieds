import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchAds, getAllAds } from "../redux/adsRedux";
import AdSummary from "../components/AdSummary";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ads = useSelector(getAllAds);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    dispatch(fetchAds())
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const phrase = searchPhrase.trim();

    if (!phrase) {
      return;
    }

    navigate(`/search/${encodeURIComponent(phrase)}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ads</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "25px" }}>
        <input
          type="text"
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
          placeholder="Search ads..."
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && ads.length === 0 && <p>No ads available.</p>}

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

export default Home;
