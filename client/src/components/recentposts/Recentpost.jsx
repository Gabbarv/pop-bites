import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./recentpost.css";
import Suggestion from "../suggestion/Suggestion";

import Rposts from "./Rposts";

function Recentpost({recentposts}){


    

    return(
        <div>
        <div className="recent-display">
<div className="recent-posts">
        <div className="recent-post-h">
            <h4>RECENT POSTS</h4>
        </div>
        {recentposts.map(recentpost => <Rposts recentpost={recentpost}/>)}
           
              
 </div>
   
 </div>
 <Suggestion recentposts = {recentposts} />
 </div>
    )
}

export default Recentpost;