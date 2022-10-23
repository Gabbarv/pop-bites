import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link,useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import blogimg from "../../images/lblog.jpg"
import userimg from "../../images/user.png"
import Recentpost from "../../components/recentposts/Recentpost";
import "./blog.css";

function Blog(){

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const [recentposts,setRecentpost] = useState([])
    const { user } = useContext(Context);
    const [updatemode,setUpdateMode] = useState(false);
    const PF = `/images/${post.photo}`;
    const navigate = useNavigate();
    useEffect(() => {
        const getPost = async () => {
          const res = await axios.get("/api/posts/" + path);
          const rec =   await axios.get("/api/posts/recentpost");
          setPost(res.data);
          setRecentpost(rec.data);
        };
        getPost();
      }, [post]);

      const handleDelete = async () => {
        try {
          await axios.delete(`/api/posts/${post._id}`, {
            data: { username: user.username },
          });
          window.location.replace("/");
        } catch (err) {}
      };




    return(
        <div className="main">
            <div className="blog-page">
            <div className="blog-title">
             <h1>{post.title}</h1>
            </div>
                <div className="blog-page-top">
                <img src={PF} />
                <div className="blog-info">
                    <div className="user-img">
                        <img src={userimg} />
                    </div>
                    <div className="user-info">
                    <i class="icon bi bi-person"></i>
                    <span className="user-i">By  <Link to={`/?user=${post.username}`} className="link">
               {post.username}
            </Link></span><br/>
                    <i class="icon bi bi-calendar3"></i>
                    <span className="user-i">Published on {new Date(post.createdAt).toDateString()}</span>
                    </div>
                   { post.username === user?.username && (<div className="blogpageaction" >
                        <Link to={`/write/${post.title}`}><i
                  className="blogpageicon far fa-edit"
                
                ></i></Link>
                
                <i
                  className="blogpageicon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>)}
                    
                </div>
                </div>
                <div className="blog-content">
                    <p>{post.desc}</p>
                </div>
               
            </div>
            <Recentpost recentposts = {recentposts}/>

            
        </div>
    )
}

export default Blog;