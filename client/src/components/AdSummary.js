import { Link } from "react-router-dom";

import { IMGS_URL } from "../config";

const AdSummary = ({ ad }) => {
  return (
    <div>
      <img
        src={`${IMGS_URL}${ad.image.replace("/uploads/", "")}`}
        alt={ad.title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      <h2>{ad.title}</h2>
      <p>{ad.location}</p>

      <Link to={`/ads/${ad._id}`}>Read more</Link>
    </div>
  );
};

export default AdSummary;
