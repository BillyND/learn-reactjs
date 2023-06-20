import "./Home.css";
import videoHomePage from "../../assets/video-homePage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  // document.querySelector(".container-home").onClick = alert("ok")
  return (
    <div className="container-home">
      <video autoPlay muted loop className="video-home">
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="content-home">
        <h1>There's a better way to ask</h1>
        <p>
          You don't want to make a boring form. And your audience won't answer
          one. Create a typeform instead-and make everyone happy.
        </p>
        {isAuthenticated == false ? (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Get started - it's free
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/user");
            }}
          >
            Start now
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
