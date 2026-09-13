import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { fetchAds, getAdById } from "../redux/adsRedux";
import { getUser } from "../redux/userRedux";
import { API_URL, IMGS_URL } from "../config";

const Ad = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ad = useSelector((state) => getAdById(state, id));
  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  if (!ad) {
    return <p>Loading...</p>;
  }

  const imageName = ad.image?.replace("/uploads/", "");
  const avatarName = ad.author?.avatar?.replace("/uploads/", "");

  const isOwner = user && ad.author?._id && user._id === ad.author._id;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ad?",
    );

    if (!confirmed) {
      return;
    }

    const response = await fetch(`${API_URL}/api/ads/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      alert("Failed to delete ad");
      return;
    }

    navigate("/");
  };

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

      {isOwner && (
        <div>
          <Link to={`/ads/${ad._id}/edit`}>Edit</Link>

          {" | "}

          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}

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
