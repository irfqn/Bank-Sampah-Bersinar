import bankBersinarLogo from "../../assets/img/bank-bersinar-logo.png";
// import solarPhone from "./assets/img/solar_phone-bold.png";
import solarPhone from "../../assets/img/solar_phone-bold.png";
import linkedinLogo from "../../assets/img/mdi_linkedin.png";
import instagramLogo from "../../assets/img/mdi_instagram (1).png";
import { Button } from "./button";
import "../HeroHeader.css";

const HeroHeader = () => {
  return (
    <>
      <nav>
        <img src={bankBersinarLogo} className="logo" />
        <ul className="ulHeader">
          <li>
            <a href="#">
              <img src={solarPhone} alt="" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={linkedinLogo} alt="" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={instagramLogo} alt="" />
            </a>
          </li>
        </ul>
        <Button className="button" href="http://localhost:5173/login">
          Log In
        </Button>
      </nav>
    </>
  );
};

export default HeroHeader;
