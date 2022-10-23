import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const {blogId} = useParams();
  const [postId,setPostId] = useState();

    const fetchpost = async () => {

      const res = await axios.get(`/api/posts/${blogId}`);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCategory(res.data.category);
      setPostId(res.data._id)
      

    }
  
    useEffect(() => {
      if(blogId){
        fetchpost();
      }
      },[])

  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      category
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (err) { }
    }
    try {
     if(blogId){
      await axios.put(`/api/posts/${postId}`,newPost);
      navigate(`/blog/${blogId}`, { replace: true });
     } else {
      const resone = await axios.post("/api/posts", newPost);
      navigate(`/blog/${resone.data.title}`, { replace: true });

     }
        
        
    } catch (err) { }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <p className="addImage">Add Image</p>
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="writeFormGroup"><input
          type="text"
          placeholder="Title"
          className="writeInput"
          autoFocus={true}
          value={title}
          onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="writeFormGroup"><input
          type="text"
          placeholder="Category"
          className="writeInput"
          value={category}
          onChange={e => setCategory(e.target.value)} />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          {blogId ? 'Update' : 'Publish'}
        </button>
      </form>
    </div>
  );
}
