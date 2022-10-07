import React, { useContext, useEffect,useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import "./Reviews.css"


function Reviews(){

    const [reviews,setReviews] = useState();
    const {user} = useContext(Context);
    const fetchreviews = async () => {
        const res = await axios.get("/api/addreview");
        const data = res.data;
        const userReview = data.filter(item => item.userid === user._id);
        setReviews(userReview)
        
        
        
        
    };
    

    useEffect(() => fetchreviews()
        
    ,[])

    return(

        <div className="reviewtable">
            <table id="reviews">
                <tbody>
                <tr>
                    <th>Movie Name</th>
                    <th>Status</th>
                </tr>
                {reviews?.map(review => (
                    <tr>
                        <td>{review.moviename}</td>
                        <td>{review.status && "Accepted"}</td>
                    </tr>)
                )}
    
                
                </tbody>
            </table>
        </div>
    )
}

export default Reviews
