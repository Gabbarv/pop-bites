import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Spost from "./Spost";
import Rposts from "../recentposts/Rposts";

function Suggestion({recentposts}){
    return(
        <div className="suggestion-post">
        <div className="recent-display">
<div className="recent-posts">
        <div className="recent-post-h">
            <h4>SUGGESTED POST</h4>
        </div>
        {recentposts.map(recentpost => <Rposts recentpost={recentpost}/>)}
           
              
 </div>
 </div>
 </div>
    )
  
}


export default Suggestion;