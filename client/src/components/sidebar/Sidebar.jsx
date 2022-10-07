import { useContext } from "react";
import { Context } from "../../context/Context";
import "./sidebar.css";

export default function Sidebar() {
  const { user} = useContext(Context);

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

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img className="Image" src={PF} alt="..."/>
        <p>
          You are the admin.
        </p>
      </div>
    </div>
  );
}
