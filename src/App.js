import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Orders from "./pages/order/Orders";
import "./global.css"



function App() {
  const { user} = useContext(AuthContext);

  

  const stripe = loadStripe(
     "pk_test_51Jzl48IACXnVF0nB75Q5CtAy2vJ6hF09TbBHRPsWzlTIIQdwLFNMsaRaBaJZmmTZ21vHUVD0APy0sumntoh96ZJx00KycGGb8V"
    );

  const ProtectUser = ({ children }) => {
    if (!user) return <Navigate replace to="/login" />;

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={

          <Elements stripe={stripe}>
        <Hotel/>
        </Elements>
        }/>
        <Route
            path="/bookings/order/:id/:hotelId"
            element={
              <ProtectUser>
                <Orders />
              </ProtectUser>
            }
          />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
