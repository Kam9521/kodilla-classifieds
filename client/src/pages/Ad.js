import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchAds, getAdById } from "../redux/adsRedux";
import { IMGS_URL } from "../config";

const Ad = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const ad = useSelector((state) => getAdById(state, id));

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  if (!ad) {
    return <p>Loading...</p>;
  }

  const imageName = ad.image?.replace("/uploads/", "");
  const avatarName = ad.author?.avatar?.replace("/uploads/", "");

  return (
    <div>
      <h1>{ad.title}</h1>

      {imageName && (
        <img
          src={`${IMGS_URL}${imageName}`}
          alt={ad.title}
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "400px",
            objectFit: "cover",
          }}
        />
      )}

      <p>
        <strong>Location:</strong> {ad.location}
      </p>
      <p>
        <strong>Price:</strong> {ad.price}
      </p>
      <p>
        <strong>Description:</strong> {ad.content}
      </p>

      <p>
        <strong>Published:</strong>{" "}
        {new Date(ad.publicationDate).toLocaleDateString()}
      </p>

      <hr />

      <h2>Seller</h2>

      {avatarName && (
        <img
          src={`${IMGS_URL}${avatarName}`}
          alt={ad.author.login}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      )}

      <p>
        <strong>Login:</strong> {ad.author?.login}
      </p>
      <p>
        <strong>Phone:</strong> {ad.author?.phone}
      </p>
    </div>
  );
};

export default Ad;
