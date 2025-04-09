import { useLocation } from "react-router-dom";
import BannerImage from "../assets/Banner.png";

const Banner = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/" ||
      location.pathname === "/recipes" ||
      location.pathname === "/about-us" ? (
        <p
          style={{ backgroundImage: `url(${BannerImage})` }}
          className="bg-cover bg-center px-30 py-20 text-center text-xl font-bold text-white"
        >
          {" "}
          Be inspired, cook with passion and experience unforgettable moments at
          the table.
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Banner;
