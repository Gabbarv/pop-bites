import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import navlogo from "../../components/navlogo.png";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const [isAdmin, setisAdmin] = useState(false);
  
 
  
  

  
  
  var PF;
  if (user) {
    if (user.profilePic) {
      PF = `http://localhost:5000/images/${user.profilePic}`
    } else {
      PF = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    }
  } else {
    PF = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
  }

  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setText(event.target.value);
  }

  const handleSearch = () => {
    navigate(`/?search=${text}`, { replace: true });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    // <div className="top">
    //   <div className="topLeft">
    //     <h5>Blog App</h5>
    //   </div>
    //   <div className="topCenter">
    //     <ul className="topList">
    //       <li className="topListItem">
    //         <Link className="link" to="/">
    //           HOME
    //         </Link>
    //       </li>
    //       <li className="topListItem">
    //         <Link className="link" to="/">
    //           ABOUT
    //         </Link>
    //       </li>
    //       <li className="topListItem">
    //         <Link className="link" to="/write">
    //           WRITE
    //         </Link>
    //       </li>
    //       <li className="topListItem" onClick={handleLogout}>
    //         {user && "LOGOUT"}
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="topRight">
    //     {user ? (
    //       <Link to="/settings">
    //         <img className="topImg" src={PF} alt="" />
    //       </Link>
    //     ) : (
    //       <ul className="topList">
    //         <li className="topListItem">
    //           <Link className="link" to="/login">
    //             LOGIN
    //           </Link>
    //         </li>
    //         <li className="topListItem">
    //           <Link className="link" to="/register">
    //             REGISTER
    //           </Link>
    //         </li>
    //       </ul>
    //     )}
    //   </div>
    // </div>

    <div>
      <nav className="navbar fixed-top navbar-expand-lg" style={{ backgroundColor: "#e63946" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" style={{ color: "white" }} to="/"><img className="topLogo" src={navlogo} alt="" /><b>POP BITES</b></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">{user && user.isAdmin && <Link className="nav-link" to="/write">Write</Link> }</li>
              <li className="nav-item">{user && !user.isAdmin && <Link className="nav-link" to="/addreview">Add Review</Link> }</li>
              <li className="nav-item">{user && !user.isAdmin && <Link className="nav-link" to="/reviews">See Reviews</Link> }</li>
            </ul>
            
            <div className="search-box">
              <input type="text" className="search-input" value={text} onChange={handleOnChange} placeholder="Start Looking For Something!" />
              <button className="search-btn" onClick={handleSearch} style={{ border: "none" }}>
                <i className="fas fa-search"></i>
              </button>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item logout" onClick={handleLogout}>{user && "Logout"}</li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!user && <button style={{ backgroundColor: "#e63946", border: "none" }}>
                <Link className="link" to = "/register">Register</Link>
                <Link className="link" to="/adminlogin">Login</Link>
              </button>}
              <li className="nav-item">{user && <Link to="/settings"><img className="nav-link topImg" src={PF} alt="" /></Link>}</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
