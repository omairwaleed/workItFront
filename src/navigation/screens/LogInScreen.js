import { useEffect, useState } from "react";
import fbIcon from "../../assets/fb-icon.png";
import LinkedinIcon from "../../assets/Linkedin-icon.png";
import googleIcon from "../../assets/google-icon.png";
import mypoly from "../../assets/mypoly.png";
import TextBox from "../../components/TextBox";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

const LogInScreen = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate(-1);
  }, []);

  const handelSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please Enter Valid email");
      return;
    }
    if (!password) {
      setError("Please Enter Valid Password");
      return;
    }
    const response = await fetch(
      "https://work-it-back.vercel.app/api/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();

    if (response.ok) {
      console.log("every thing is ok");
      setError();
      // console.log(json);
      localStorage.setItem("user", JSON.stringify(json));
      if (json.userType === "user") navigate("/preview");
      else if (json.userType === "company") navigate("/companyview");
      else if (json.userType === "university") navigate("/collegeview");
    }
    if (!response.ok) {
      // console.log(json);
      setError(json.error);
      // setEmptyFields(json.emptyFields);
    }
  };

  return (
    <div className="body">
      <div className="parent d-flex">
        <div className="left d-flex justify-content-center flex-column p-5 gap-4 mt-4 ">
          <div className="my_h1_size">Login</div>

          <div className="logos d-flex justify-content-center align-items-center gap-2  ">
            <a href="#" className="facebook ">
              <img src={fbIcon} width="40" alt="" />
            </a>
            <a href="#" className="gmail">
              <img src={googleIcon} width="40" alt="" />
            </a>
            <a href="#" className="linkedin">
              <img src={LinkedinIcon} width="40" alt="" />
            </a>
          </div>

          <div className="box d-flex flex-column gap-3 justify-content-center align-items-center ">
            <p className="error">{error}</p>
            <TextBox
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              // className={
              //   emptyFields.includes("email")
              //     ? "text_input_error"
              //     : "text_input"
              // }
              className="text_input"
            />
            <TextBox
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              // className={
              //   emptyFields.includes("password")
              //     ? "text_input_error"
              //     : "text_input"
              // }
              className="text_input"
            />
          </div>

          <div className="button_box d-flex justify-content-center align-items-center mt-2">
            <Button buttonContent="LOGIN" onClick={handelSubmit} />
          </div>
          <div className="d-flex flex-column gap-4 justify-content-center align-items-center mt-4">
            <a
              href="/"
              style={{
                textDecoration: "none",
                backgroundColor: "#d0dbe7",
                color: "#2a2c2e",
              }}
            >
              Forgot Your Password?
            </a>

            {/* REGISTRATION  */}
            <Link to={"/signUp"} className="registration">
              {" "}
              {/*registration */}
              REGISTER WITH US NOW!
            </Link>
          </div>
        </div>

        <div className="right">
          <div className="col-md-10">
            <div className="journey">
              <p className="carousel-caption">START YOUR JOURNEY !</p>
              <div className="carousel-caption">
                register now to use all of site features
              </div>
              <Link to={"/signUp"}>
                <Button buttonContent="JOIN NOW" />
              </Link>
            </div>
            <div className="image">
              <img src={mypoly} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInScreen;
