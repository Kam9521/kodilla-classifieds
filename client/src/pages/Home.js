import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAds, getAllAds } from "../redux/adsRedux";
import AdSummary from "../components/AdSummary";

const Home = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  return (
    <div>
      <h1>Ads</h1>

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
