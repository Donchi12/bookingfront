import React from "react";
import useFetch from "../../hooks/useFetch";
import "./offers.css";

function Offers() {
  return (
    <div className="offer">
      <>
        <div className="offerItem">
          <div className="offer-desc">
            <h3>Escape for a while</h3>
            <p>Enjoy the freedom of a monthly stay on donnybook</p>
          </div>
          <img src="/assets/imgs/offer.jpeg" alt="" className="offerImg" />
          <div className="offerTitles">
            <a href="/offers">Discover Monthly Stay</a>
          </div>
        </div>

        <div className="offerItem">
          <div className="offer-desc">
            <h3>New year, new adventures</h3>
            <p>Save 15% or more when you book and stay before March 31, 2023</p>
          </div>
          <img src="/assets/imgs/offer1.jpeg" alt="" className="offerImg" />
          <div className="offerTitles">
            <a href="/offers">Find offer {new Date().getFullYear()}</a>
          </div>
        </div>
      </>
    </div>
  );
}

export default Offers;
