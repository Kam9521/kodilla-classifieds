import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../config";
import { getIsLogged } from "../redux/userRedux";

const AdAdd = () => {
  const navigate = useNavigate();
  const isLogged = useSelector(getIsLogged);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("image", image);

    try {
      const response = await fetch(`${API_URL}/api/ads`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add ad");
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isLogged) {
    return null;
  }

  return (
    <div>
      <h1>Add ad</h1>

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
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button type="submit">Add ad</button>
      </form>
    </div>
  );
};

export default AdAdd;
