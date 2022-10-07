import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      <div className="row">
        {posts.map((p) => {
          return <div className="col-md-4" key={p._id}>
            <Post post={p} />
          </div>
        })}
      </div>
    </div>
  );
}
