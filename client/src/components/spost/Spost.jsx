import { Link, useNavigate } from "react-router-dom";
import spost from "../../images/sblog.jpg";
import "./spost.css";

function Spost({post}){

    return (
        <div className="s-post-link">
        <Link to={`/blog/${post.title}`}> <div className="s-post">
        <div className="s-post-img">
            <img src={`http://localhost:5000/images/${post.photo}`}/>
            <div className="scategory"><h5>{post.category}</h5></div>
        </div>
        <div className="s-post-content">
            <h2>{post.title}</h2>
        </div>
    </div></Link>
    </div>
       
    )
}

export default Spost;