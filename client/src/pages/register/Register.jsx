import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth, LoginCredentials } from "two-step-auth";

import "./register.css";


export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [otpverified,setOtpverified] = useState(false);
  const [showsendotp,setShowSendOtp] = useState(true);
  const [otpsent,setOtpSent] = useState(false);
  const [Otp,setOtp] = useState()
  const navigate = useNavigate();
  const [userOtp,setUserOtp] = useState();
  
  var wrongpasslength;
  var wrongpasslengthbtn;

  const sendOtp = (e) => {
    e.preventDefault();
    var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);



    const emailid = {
      email,
      Otp: otp
    }
    const res = axios.post("api/auth/sendOtp", emailid)

    setOtp(otp);
    setShowSendOtp(false);
    setOtpSent(true);
  }

  const verifyOtp
  = (e) => {
    e.preventDefault();
    if(Otp==userOtp){
      setOtpSent(false);
      setOtpverified(true)
  }
  else{
      setError(true);
      setOtpverified(false);
  }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && navigate("/adminlogin", { replace: true });
      setOtpverified(false);
    } catch (err) {
      setError(true);
    }
  };

  if (password.length >= 5) {
    wrongpasslength = "none"
    wrongpasslengthbtn = "inline"
  }
  else {
    wrongpasslength = "flex"
    wrongpasslengthbtn = "none"
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      {/* Otp form */}
      <form className="registerForm" onSubmit={sendOtp}>
      <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        {showsendotp && <button className="registerButton" type="submit">Send OTP</button>}
      </form>

      {/* verify otp form */}
    { otpsent && <> <form className="registerForm" onSubmit={verifyOtp}>
      <label>OTP</label>
        <input
          type="number"
          className="registerInput"
          placeholder="Enter OTP..."
          onChange={(e) => setUserOtp(e.target.value)}
        />
         <button className="registerButton" type="submit">Verify OTP</button>
      </form>
      </>}
      
      {/* submission form */}
      <form className="registerForm" onSubmit={handleSubmit}>
      
        
        
          { otpverified && <><label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <div id="passwordHelp" className="form-text" style={{ color: "red", display: `${wrongpasslength}` }}>Password length should be minimum of 5 digits.</div>
        <button className="registerButton" style={{display: `${wrongpasslengthbtn}` }} type="submit">
          Register
        </button>  </> 
}
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/adminlogin">
          Login
        </Link>
      </button>
    
      {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
    </div>
  );
}
