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

  useEffect(() => {
    dispatch(fetchAds());
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
    <div>
      <h1>Ads</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
          placeholder="Search ads..."
        />

        <button type="submit">Search</button>
      </form>

      {ads.length === 0 ? (
        <p>No ads available.</p>
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

export default Home;
