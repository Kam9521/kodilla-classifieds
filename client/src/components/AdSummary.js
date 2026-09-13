import { Link } from "react-router-dom";

import { IMGS_URL } from "../config";

const AdSummary = ({ ad }) => {
  const imageName = ad.image?.replace("/uploads/", "");

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
      }}
    >
      {imageName && (
        <img
          src={`${IMGS_URL}${imageName}`}
          alt={ad.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
      )}

      <h2>{ad.title}</h2>

      <p>
        <strong>Location:</strong> {ad.location}
      </p>

      <p>
        <strong>Price:</strong> {ad.price}
      </p>

      <Link to={`/ads/${ad._id}`}>Read more</Link>
    </div>
  );
};

export default AdSummary;
