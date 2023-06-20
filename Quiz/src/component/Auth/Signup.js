import { useState } from "react";
import "./Auth.css";
import { postSignup } from "../services/apiService";
import { toast } from "react-toastify";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ImSpinner } from "react-icons/im";
import NProgress from "nprogress";
import Languages from "../Header/Languages";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isDelaySignup, setIsDelaySignup] = useState(false);
  const navigate = useNavigate();
  const handleSubmitSignup = async () => {
    //validate
    var isValidateEmail = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    // var isValidatePassword = password.match(
    //     /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    // );

    var isValidateUsername = username.match(
      /^([a-zA-Z0-9]|[-._](?![-._])){4,20}$/
    );
    if (!isValidateEmail) {
      toast.error("Invalid Email");
      isValidateEmail = false;
    } else {
      isValidateEmail = true;
    }

    // if (!isValidatePassword) {
    //     toast.error("Invalid Password")
    //     isValidatePassword = false
    // } else {
    //     isValidatePassword = true
    // }

    //call apis

    if (isValidateEmail == true && password.length >= 6) {
      setIsDelaySignup(true);
      NProgress.start();
      const dataSignup = await postSignup(email, username, password);
      if (dataSignup && dataSignup.EC != 0) {
        setIsDelaySignup(false);
        toast.error(dataSignup.EM);
        NProgress.done();
      }
      if (dataSignup && dataSignup.EC == 0) {
        toast.success(dataSignup.EM);
        setIsDelaySignup(false);
        NProgress.done();
        navigate("/login");
      }
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login-signup">
      <div className="header">
        <div className="header-content">
          <span>Already have an account?</span>
          <button className="btnLogin" onClick={() => handleLogin()}>
            Login
          </button>
          <Languages />
        </div>
      </div>
      <div className="title col-4 mx-auto">
        <h3>Quiz Test</h3>
      </div>
      <div className="wellcome col-4 mx-auto">Sign up and come on in</div>
      <div className="content form-group col-4  mx-auto">
        <label>Email (*)</label>
        <input
          type={"email"}
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password (*)</label>
        <input
          type={"password"}
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Username</label>
        <input
          type={"text"}
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* <div className="agreeSignup">
                    <input type={'checkbox'} className="agree checkbox signup" />I agree to Typeform’s Terms of Service, Privacy Policy and Data Processing Agreement.
                </div> */}
        <button
          className="btn btn-dark col-12"
          onClick={() => handleSubmitSignup()}
          disabled={isDelaySignup}
        >
          {isDelaySignup && <ImSpinner className="iconLoading" />}
          <span> Create my free account</span>
        </button>
        <div className="goToHomePage">
          <span
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            &#60;&#60;&#60; Go to home page
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
