import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import GoogleLoginBtn from "../../components/socialBtn/GoogleLoginBtn";
import FacebookLogins from "../../components/socialBtn/FacebookLogin";
import Toast from "../../utils/Alert";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    rememberMe: false
  });
 
  const [loading, setLoading] = useState(false)

  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, 
      [e.target.id]: e.target.checked? e.target.checked : e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true)
    try {
      const res = await axios.post("/auth/login", credentials);
        const {data, message} = res.data
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("userId", data._id)
      setLoading(false)
      Toast.success.fire({text:message }).then(() =>  navigate("/") )
    } catch (err) {
      setLoading(false)
      Toast.error.fire({text:err.response.data.message })
      
    }
  };


  return (
    <div className="login">
      <div className="lContainer">
      <form onSubmit={handleSubmit} className="lWrapper">
        <h1 className="login-title">Login</h1>
        <div className="input-wrapper">

        <input
          type="text"
          placeholder="Username or Email"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        </div>
        <div className="input-wrapper">

       
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        </div>
        <div className="input-wrapper check">
          <div>

          <input id="rememberMe"  type="checkbox" checked={credentials.rememberMe} onChange={() => setCredentials({...credentials, rememberMe: !credentials.rememberMe})}  /> <label style={{cursor: "pointer"}} htmlFor="rememberMe">Remember Me</label>
          </div>
          <p><a href="/resetPassword">Forgot password ?</a></p>
        </div>
        <div className="input-wrapper">
  
        <button disabled={loading}  className="lButton">
          Login
        </button>
      </div>
      <h4 className="or"><span><hr /></span> <b>OR</b> <span><hr /></span></h4>
      <div className="social-login">
      
        <GoogleLoginBtn />
        <FacebookLogins />
       
      </div>
      <div className="login-footer">
       <p>Don"t have account?<a href="/register">Register</a></p>
      </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
