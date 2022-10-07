import { useEffect, useState } from "react";
// import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
// import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  var varpageNumber = pageNumber

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts" + search);
      setTotalPages(res.data.totalPages);
      setPosts(res.data.posts);
    };
    fetchPosts();
  }, [search, pageNumber]);

  const updatePage = (pageno) => {
    navigate(`/?page=${pageno}`, { replace: true });
  }

  const handleNext = () => {
    varpageNumber = varpageNumber + 1;
    setPageNumber(pageNumber => pageNumber + 1);
    updatePage(varpageNumber);
  }

  const handlePrevious = () => {
    varpageNumber = varpageNumber - 1;
    setPageNumber(pageNumber => pageNumber - 1);
    updatePage(varpageNumber);
  }

  return (
    <>
      {/* <Header /> */}
      <div className="container d-flex">
        <Posts posts={posts} />
        {/* <Sidebar /> */}
      </div>
      <div className="container d-flex justify-content-between mb-5">
        <button disabled={pageNumber <= 0} className="btn btn-primary" style={{backgroundColor: "#1d3557"}} onClick={handlePrevious}>&larr; Previous</button>
        <button disabled={pageNumber === (totalPages - 1)} className="btn btn-primary" style={{backgroundColor: "#1d3557"}} onClick={handleNext}>Next &rarr;</button>
      </div>
    </>
  );
}
