import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";


const Navbar = () => {
  const {data} = useFetch(`/hotels?fromAdmin=${true}`)
  const { user, dispatch } = useContext(AuthContext);
  const [showDropdow,setShowDropdown] = useState(false)
  const [openModal,setOpenModal] = useState(false)
  const [hotelId,setHotelId] = useState("")

  const navigate = useNavigate()

   const handleLogout = async() => {
       await axios.delete(`/auth/logout`)
       localStorage.removeItem("userId")
       dispatch({type: "LOGOUT"})
   }

   const handleReserve = () => {
    setOpenModal(false)
    setShowDropdown(false)
      navigate(`/bookings/order/${user._id}/${hotelId}`)
   }

   useEffect(() => {
     setHotelId(data[0]?._id)
   }, [data])
  
  return (
    <>
   
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <img className="logo" src="/assets/imgs/donnybookw.png" alt="logo" />
        </Link>
        {user ? <div className="userInfoCont">
          <span onClick={() => setShowDropdown(!showDropdow)}>
            <img className="navbarImage" src={user.img} alt="profile img"/>
            </span>
            <button className="navButton" onClick={handleLogout}>Logout</button>
            <div className={`navbardropdown ${showDropdow ? "active" : null}`}>
              <div className="dropdownwrapper">
               <button onClick={() => {
                setOpenModal(true)
                setShowDropdown(false)
                }
              } className="dropdownBtn" type="button">Reservations</button>
              </div>
            </div>
          </div>: (
          <div className="navItems">
            <a href="/login" className="navButton">Login</a>
            <a href="/register" className="navButton">Register</a>
          </div>
        )}
      </div>
    </div>

{openModal && 
  <div className="navModal">
    
    <div className="nContainer">
      <span  className="nClose"
        onClick={() => setOpenModal(false)}>

      <FontAwesomeIcon
        icon={faXmark}
       
      />
      </span>
      <span>Select Hotel:</span>
      
       
          <select className="hotelSelect" onChange={(e) => setHotelId(e.target.value)}>
            {data?.map(each => (

            <option value={each._id} key={each._id}>{each.name} {" "} {each.city}</option>
            ))}
          </select>
        
     
      <button onClick={handleReserve} className="nButton">
        Goto Reservation!
      </button>
    </div>
  </div>}
  </>
  );
};

export default Navbar;
