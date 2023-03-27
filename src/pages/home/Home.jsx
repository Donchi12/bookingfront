import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Offers from "../../components/offers/Offers";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {

  return (
    <div className="home">
      <Navbar /> 
      <Header/>
      <div className="homeContainer">

        <h1 className="homeTitle">Offers</h1>
       
        <Offers />
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests Featured</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
