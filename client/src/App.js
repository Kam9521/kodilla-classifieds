import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Ad from "./pages/Ad";
import AdAdd from "./pages/AdAdd";
import AdEdit from "./pages/AdEdit";
import SearchResults from "./pages/SearchResults";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { fetchUser } from "./redux/userRedux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads/:id" element={<Ad />} />
        <Route path="/ads/add" element={<AdAdd />} />
        <Route path="/ads/:id/edit" element={<AdEdit />} />
        <Route path="/search/:searchPhrase" element={<SearchResults />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
