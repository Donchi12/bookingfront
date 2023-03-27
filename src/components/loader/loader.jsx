import { Hypnosis } from "react-cssfx-loading";
import "./loader.css"

function Loader() {
  return (
    <div className="loader">
        
        <div className="loader-wrapper">

        <Hypnosis className='loader' color="#ff6600" width="130px" height="130px" duration="3s" />
       
        </div>
    </div>
  )
}

export default Loader