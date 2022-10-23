import { Link, useNavigate } from "react-router-dom";
import limg from "../../images/lblog.jpg";
import "./largepost.css";



function Largepost({post}){
    return(
        <div className="b-post">
        <Link to={`/blog/${post.title}`}>  <div className="l-post">
        <div className="l-post-img">
         <img src={`/images/${post.photo}`}/>
         <div className="category"><h5>{post.category}</h5></div>
        </div>
        <div className="l-post-content">
         <h1>{post.title}</h1>
        </div>
        
    </div></Link>
    </div>
    )
}

export default Largepost;