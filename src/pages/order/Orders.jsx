
import {  useParams } from 'react-router-dom'
import Accord from '../../components/accord/Accord'
import Header from '../../components/header/Header'
import Loader from '../../components/loader/loader'
import Navbar from '../../components/navbar/Navbar'
import useFetch from '../../hooks/useFetch'
import { convertCurrency } from '../../utils/converter'
import "./orders.css"

function Orders() {
  const {id, hotelId} = useParams()
  const {data, loading} = useFetch(`/bookings/single/${id}?id=${hotelId}`)
 


if(loading){
  return <Loader />
}
  return (
    <div>
        <Navbar />
      <Header type="bookings" />
      <Accord title="Reservations" />
      {data?.length !== 0 ? data.map(single => (

      <div className='orderContainer' key={single?.booking?._id}>
       
        <div className="orderItem">
      <img src={single?.hotel?.photos[0]} alt="" className="oiImg" />
      <div className="oiDesc">
        <h1 className="oiTitle">{single?.hotel?.name}</h1>
        <span className="oiDistance">{single?.hotel?.distance}m from center</span>
       
        <span className="oiTaxiOp">Free airport taxi</span>
        <span className="oiSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="oiFeatures">{single?.hotel?.desc}</span>
        <span className="oiCancelOp">Free cancellation </span>
        <span className="oiCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
       
        {single?.hotel?.rating && <div className="oiRating">
          <span>Excellent</span>
          <button>{single?.hotel?.rating}</button>
        </div>}
        
          <span className="oiPrice">${single?.hotel?.cheapestPrice}</span>
          <span className="oiTaxOp">Includes taxes and fees</span>
          <span className="oiDistance">{single?.hotel?.address}</span>
          
        
      </div>
      <div className='oiRoomContent'>
        <div>

      <h1 className="oiTitle">Booked Rooms</h1>
      <div className="oiDetails">
       {single?.booking.bookedRoomsInfo?.map((each, idx) => (
         
        <div className="oiDetailTexts" key={idx + Date.now()}>
          <span className="oiRoomN">Room: {each?.roomNumber}</span>
          <span className="oiTaxOp">Title: {each.title}</span>
          <span className="oiDistance">price : {each.price}</span>
         
        </div>
       ))}
      </div>
      </div>
      <div>
         <h1 className="oiTitle">More Infomations</h1>
         <div className="oiDetailTexts" >
          <span className="oiRoomN">Total book: {single?.booking?.totalBookedRooms}</span>
          <span className="oiTaxOp">Nights : {single.booking?.totalNights}</span>
          <span className="oiDistance">Total Price : {convertCurrency(single?.booking?.totalPrice)}</span>
         
        </div>
       </div>
      
    </div>
       
      </div>
      </div>
      ) ) : 
      <div className='noReservation'>
        <h3>No reservation found</h3>
        </div>}
    </div>
  )
}

export default Orders