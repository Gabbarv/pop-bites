import { useEffect, useState } from "react";
import Largepost from "../../components/largepost/Largepost";
import Recentpost from "../../components/recentposts/Recentpost";
import Spost from "../../components/spost/Spost";
import axios from "axios";

import "./Home.css";


function Home(){
       
    const [posts,setPosts] = useState([]);
    const [recentposts,setRecentpost] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const res =   await axios.get("/api/posts");
            const rec =   await axios.get("/api/posts/recentpost");

            
            setPosts(res.data.posts)
           setRecentpost(rec.data);
           
            
           
        }
        fetchPosts();
    },[])
   
   




    return(
//             <div className="main">
//                  <div class="row posts">
//     <div class="col-8 one">
//         <div className="row">
//             <div className="col-12">1</div>
//         </div>
//         <div className="row s-posts">
//             <div className="col-5 l-post">2</div>
//             <div className="col-5 r-post">3</div>
//         </div>
//     </div>
//     <div class="col-3 two" >col-4</div>
//   </div>
//             </div>


<div className="main">
    <div className="posts">
        {posts?.map((post,index) => ((index===0)?<Largepost post={post}/>:<Spost post={post}/>))}
    </div>
   <Recentpost recentposts = {recentposts}/>
    
</div>
    )

}


export default Home;