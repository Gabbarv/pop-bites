import { Link, useNavigate } from "react-router-dom";
import simg from "../../images/sblog.jpg"


function Rposts({recentpost}){


    var dateObj = new Date(recentpost.createdAt);
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
    return(

        <Link to={`/blog/${recentpost.title}`}> <div>
        <div className="recent-post">
       <div className="recent-post-img">
        <img src={`/images/${recentpost.photo}`}/>
       </div>
       <div className="recent-post-content">
        <h6>{recentpost.title}</h6>
        <div className="recent-c-d">
        <div className="category-recent">
            <p>{recentpost.category}</p>
        </div>
        <div className="date">
            <p>{day}/{month}/{year}</p>
        </div>
        </div>
       </div>
        </div>
        <hr/>
        </div> </Link>
    )
}

export default Rposts