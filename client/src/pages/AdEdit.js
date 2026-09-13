import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { API_URL } from "../config";
import { getIsLogged, getUser } from "../redux/userRedux";
import { getAdById } from "../redux/adsRedux";

const AdEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);
  const ad = useSelector((state) => getAdById(state, id));

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
      return;
    }

    if (ad && user && ad.author?._id !== user._id) {
      navigate("/");
      return;
    }

    if (ad) {
      setTitle(ad.title);
      setContent(ad.content);
      setPrice(ad.price);
      setLocation(ad.location);
    }
  }, [ad, isLogged, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("price", price);
    formData.append("location", location);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`${API_URL}/api/ads/${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update ad");
      }

      navigate(`/ads/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!ad) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Edit ad</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content">Description</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="image">New image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit">Save changes</button>
      </form>
    </div>
  );
};

export default AdEdit;
