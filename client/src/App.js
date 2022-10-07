import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Addreview from "./pages/Addreview/Addreview";
import Reviews from "./pages/Reviewlist/Reviews";

function App() {
  const { user } = useContext(Context);
  document.body.style.backgroundColor = "#f1faee";
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={user ? <Home />  : <Register/>} />
        <Route exact path="/adminlogin" element={user ? <Home /> : <Login />} />
        <Route exact path="/write" element={user && user.isAdmin && <Write />} />
        <Route exact path="/addreview" element={user && !user.isAdmin && <Addreview/>}/>
        <Route exact path="/reviews"   element={user && !user.isAdmin && <Reviews/>}/>
        <Route exact path="/settings" element={user && <Settings />} />
        <Route exact path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
