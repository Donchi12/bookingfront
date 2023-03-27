import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./stripePayment.css";
import { convertCurrency } from "../../utils/converter";
import Toast from "../../utils/Alert";
import useFetch from "../../hooks/useFetch";

function StripePayment({ bookinInfo, setOpenPay, selectedRoomNumbers, dates, handleBook, hotelId }) {
  const { data } = useFetch(`/hotels/find/${hotelId}`);
  const parsedRooms = selectedRoomNumbers.map((each) => JSON.parse(each));
  const { user } = useContext(AuthContext);

  const stripe = useStripe();
  const elements = useElements();
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();

  const [cardState, setCardState] = useState({
    error: null,
    brand: null,
    disabled: "",
    isLoading: false,
  });

  const { error, brand, disabled, isLoading } = cardState;

  const total = bookinInfo.reduce((acc, init) => acc + init.totalBookPrice, 0);

  useEffect(() => {
    const getClientSecret = async () => {
      //api call
      try {
        const res = await axios.post(`/checkout/payment?amount=${total + 2 * 100}`);
        setSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    getClientSecret();
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCardState({ ...cardState, isLoading: true });
    try {
      const { paymentIntent } = await stripe.confirmCardPayment(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
    
      const {  amount, currency } = paymentIntent;
     // make requst for Order
      await handleBook()
      const res = await axios.post(`/bookings/create`, {
        bookings: bookinInfo,
        amount,
        parsedRooms,
        userId: user._id,
        hotelId: data._id,
        totalBookedDates: dates,
        payment_method: cardState?.elementType,
        currency,
      });
      setCardState({
        ...cardState,
        isLoading: false,
        disabled: false,
        error: null,
      });
      setOpenPay(false);
      Toast.success.fire({text: "Your reservation was successful"}).then(() => {
        navigate(`/bookings/order/${res.data.userId}/${hotelId}`, { replace: true });
      });
    } catch (err) {
      console.log(err)
      Toast.error.fire({ text: err.message });
      setCardState({ ...cardState, isLoading: false, error: err.message });
    }
  };

  const handleChange = (e) => {
    console.log(e)
    setCardState({
      ...cardState,
      error: e.error ? e.error.message : "",
      disabled: e.empty,
      brand: e.brand,
    });
  };

  return (
    <div className="payment">
      <div className="pContainer">
        <span className="pClose" onClick={() => setOpenPay(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </span>
        <span>
          <h2>Booking Summary </h2>
        </span>
        <div className="itemContainer">
          {parsedRooms?.map((item) => {
            return (
              <div className="pItem" key={item.room}>
                <div className="pInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rPrice">${item?.price}</div>
                  <div className="rMax">
                    Room Number: <b>{item.roomNumber}</b>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <hr className="hr" />
        <form className="pform " onSubmit={handleSubmit}>
          <div className="sumContainer">
            <div className="sumItem">
              <h3>Subtotal</h3>
              <span>{convertCurrency(total)}</span>
            </div>
            <div className="sumItem">
              <h4>Vat Rate</h4>
              <span>{convertCurrency(2)}</span>
            </div>
            <div>
              <div className="sumItem">
                <h4>Total Rooms</h4>
                <span>
                  {parsedRooms.length} For {dates.length} days
                </span>
              </div>
              <div className="sumItem">
                <h2>Total</h2>
                <h3>{convertCurrency(total + 2)}</h3>
              </div>
            </div>
          </div>
          <CardElement onChange={handleChange} />
          <div>
            <button
              disabled={!stripe || !elements || isLoading || disabled}
              className="pButton"
            >
              {isLoading ? "Loading..." : "Complete Your Booking"}
            </button>
            {error !== "" && <p className="stripeError">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default StripePayment;
