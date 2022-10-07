import React, { useContext, useEffect, useState } from "react";
import "./Addreview.css";
import axios from "axios";
import { Context } from "../../context/Context";



function Addreview(){

    const {user} = useContext(Context);
    const userid =""
    const [moviename,setMoviename] = useState("");
    const [state,setState]= useState("");
    const [city,setCity] = useState("")
    const [theatername,setTheatername]=useState("")
    const [ticketprice,setTicketprice] = useState("")
    const [file,setFile] = useState("")
    const [ticketImg,setTicketImg]=useState("")
    const [status,setStatus] = useState(true);
    const [reviewsubmitted,setReviewsubmitted] = useState(false);
    const [error,setError]= useState(false);


   


    const handleSubmit = async(e) => {
        
        e.preventDefault();

        const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      
      try {
        await axios.post("/api/upload", data);
      } catch (err) {

       }
      
        
        const newReview = {
            moviename,
            state,
            city,
            theatername,
            ticketprice,
            userid: user._id,
            status,
            ticketImg: filename
            
        }
        try {
           const res = await axios.post("/api/addreview", newReview);
           setReviewsubmitted(true)
           setCity("")
           setFile("")
           setMoviename("")
           setState("")
           setTheatername("")
           setTicketprice("")
        } catch (err){
          setError(true)

        }
    }

  


    return (
        <>
        
       <div className="addreview">
       {reviewsubmitted && <span style={{ color: "green", marginTop: "10px" }}>Review Submitted!</span>  }
       {error && <span style={{ color: "red", marginTop: "10px" }}>Something Went Wrong!</span>}
         <span className="addTitle">Add Review</span>
         <form className="addreviewForm" onSubmit={handleSubmit}>
         <label>Movie Name</label>
        <input
          type="text"
          className="addreviewInput"
          placeholder="Enter Movie Name..."
          onChange={e => setMoviename(e.target.value)}
          required
          />
          <label>State</label>
        <input
          type="text"
          className="addreviewInput"
          placeholder="Enter your State..."
          onChange={e => setState(e.target.value)}
          required
          />
          <label>City</label>
        <input
          type="text"
          className="addreviewInput"
          placeholder="Enter your City..."
          onChange={e => setCity(e.target.value)}
          required
          />
          <label>Theater Name</label>
        <input
          type="text"
          className="addreviewInput"
          placeholder="Enter Theater Name..."
          onChange={e => setTheatername(e.target.value)}
          required
          />
          <label>Ticket Price</label>
        <input
          type="number"
          className="addreviewInput"
          placeholder="Enter Ticket Price..."
          onChange={e => setTicketprice(e.target.value)}
          required
          />
          <label>Ticket Image </label>
          <input
          type="file"
          className="addreviewInput"
          placeholder="Upload Ticket Image..."
          onChange={(e) => setFile(e.target.files[0])}
          required
          />

        <button className="addreviewButton" type="submit">Add Review</button>
         </form>
         
       </div>
       </>
    )
}

export default Addreview;