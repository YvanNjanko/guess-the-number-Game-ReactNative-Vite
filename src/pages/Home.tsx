import "../css/Home.css";
import image from "../assets/guess-the-number-removebg-preview.png";
import HomeButton from "../UI/Home_Button";
import dice from "../assets/dice-alt.svg";
import user from "../assets/users-alt.svg";
import setting from "../assets/settings.svg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <div className="home__icon">
        <img src={image} alt="" className="home__icon--image" />
      </div>
      <div className="home__menu">
        <Link to={"/play"}>
          <HomeButton message="Nouvelle partie" iconUrl={dice} />
        </Link>
        <Link to={"/difficulty"}>
          <HomeButton message="Difficulté" iconUrl={setting} />
        </Link>
        <Link to={"/classement"}>
          <HomeButton message="Classement" iconUrl={user} />
        </Link>
      </div>
    </div>
  );
}
