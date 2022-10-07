import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = `http://localhost:5000/images/${post.photo}`;
  return (
    <Link to={`/post/${post.title}`} className="link">
        <div className="card mx-3 my-4 post">
        {post.photo && <img className="postImg" src={PF} alt="" />}
        <div className="container">
          <div className="postInfo">
            <span className="postCat">{post.category}</span>
            <span className="postTitle">{post.title}</span>
            <span className="postDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          <p className="postDesc">{post.desc}</p>
        </div>
      </div>

      {/* <div className='my-3' >
        <div className="card">
          <img src={PF} className="card-img-top" style={{height: '240px'}} alt="..." />
          <div className="card-body postInfo">
            <h5 className="postCats">
              {post.categories.map((c) => (
                <span className="postCat">{c.name}</span>
              ))}
            </h5>
            <h5 className="card-title postTitle">{post.title}</h5>
            <p className="card-text postDate"><small className="text-muted"></small>{new Date(post.createdAt).toDateString()} </p>
            <p className="card-text postDesc">{post.desc}</p>
          </div>
        </div>
      </div> */}
    </Link>
  );
}
