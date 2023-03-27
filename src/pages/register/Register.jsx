import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
import CountryDropdown from "../../components/CountryDropdown";
import Toast from "../../utils/Alert";
import { useState } from "react";
import { makeMultiRequest } from "../../utils/makeRequest";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: "",
    country: "",
    firstname: "",
    lastname: "",
    city: "",
    
    phone: ""
  });

  const [file, setFile] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkEmail = (username) => {
    if(
     username.includes("@gmail.com") || 
     username.includes("@hotmail.com") ||
     username.includes("@yahoomail.com")||
     username.includes("@")
    ) return true
    return false
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(checkEmail(credentials.username)) return Toast.error.fire({text: "Username must not contain @ or end with any domain"})
    setLoading(true);
    try {
      const res = await makeMultiRequest.post("/auth/register", {...credentials, file});
      setLoading(false);
      Toast.success
        .fire({
          text: res.data.message,
        })
        .then(() => navigate("/login"));
    } catch (err) {
      setLoading(false);
      Toast.error.fire({
        text: err.response.data.message,
      });
    }
  };

  return (
    <div className="register">
      <div className="lContainer">
        <form onSubmit={handleSubmit} className="lWrapper">
          <h1 className="register-title">Register</h1>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Firstname"
              name="firstname"
              onChange={handleChange}
              required
              className="lInput"
            />
            <input
              type="text"
              placeholder="Lastname "
              onChange={handleChange}
              required
              className="lInput"
              name="lastname"
            />
          </div>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder=" Email"
              name="email"
              onChange={handleChange}
              required
              className="lInput"
            />

            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
              className="lInput"
            />
          </div>
          <div className="input-wrapper">

            <input
              type="tel"
              placeholder=" PhoneNumber"
              name="phone"
              onChange={handleChange}
              required
              className="lInput"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
              className="lInput"
            />
          </div>
          <div className="input-wrapper">
            <CountryDropdown state={credentials} setState={setCredentials} />

            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={handleChange}
              required
              className="lInput"
            />
          </div>
          <div className="input-wrapper">
           
            <input
              type="file"
              placeholder="Photo"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="lInput"
            />
          </div>

          <div className="input-wrapper">
            <button disabled={loading} className="lButton">
             {loading ? "Submitting..." : "Register"}
            </button>
          </div>

          <div className="register-footer">
            <p>
              Already have account?<a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
