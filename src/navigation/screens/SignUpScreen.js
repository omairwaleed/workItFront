import React, { useState, useEffect } from "react";
import fbIcon from "../../assets/fb-icon.png";
import LinkedinIcon from "../../assets/Linkedin-icon.png";
import googleIcon from "../../assets/google-icon.png";
import mypoly from "../../assets/mypoly.png";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import TextBox from "../../components/TextBox";
import DropDown from "../../components/DropDown";
import { useNavigate } from "react-router-dom";
import { CompanySizes, CompanyCategories } from "../../data/DropDownData";
import { getAllCountries, getAllCitiesInCountry } from "../../utilities/getCountriesAndCities";
import "react-dropdown/style.css";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("user");
  const [error, setError] = useState();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [companyCategory, setCompanyCategory] = useState("");
  
  const [cities, setCities] = useState([{}]);
  const [countries, setCountries] = useState([{}]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handelSubmit = async (e) => {
    if (!name) {
      setError("Please Enter your " + selectedOption + " name");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please Enter Valid " + selectedOption + " email");
      return;
    }
    if (!password) {
      setError("Please Enter Valid password");
      return;
    }
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        mobileNumber,
        country,
        city,
        companySize,
        selectedOption,
        companyCategory,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      console.log("every thing is ok");
      setError();
      navigate("/login");
      //redirected to the login page
    }
    if (!response.ok) {
      console.log(json);
      setError(json.error);
      console.log("every thing is not ok");
    }
  };

  const refrechCities = async () => {
    setCities(await getAllCitiesInCountry(country))
  }
  const refrechCountries = async () => {
    setCountries(await getAllCountries())
  }

  useEffect(() => {
    refrechCountries();
    refrechCities();
  }, [country]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setMobileNumber("");
    setCountry("");
    setCity("");
    setCompanySize("");
    setCompanyCategory("");
  }, [selectedOption]);

  return (
    <div className="body">
      <div className="parent d-flex ">
        <div className="left d-flex justify-content-center flex-column p-5 gap-4 mt-4 ">
          <div className="my_h1_size">Create Account</div>
          <div className="logos d-flex justify-content-center align-items-center gap-2  ">
            <a href="./" className="facebook ">
              <img src={fbIcon} width="40" alt="" />
            </a>
            <a href="./" className="gmail">
              <img src={googleIcon} width="40" alt="" />
            </a>
            <a href="./" className="linkedin">
              <img src={LinkedinIcon} width="40" alt="" />
            </a>
          </div>
          <div className="checkbox_container d-flex justify-content-center align-items-center  gap-4 mb-3  ">
            <div className="check d-flex gap-1 ">
              <input
                className="checkmark"
                type="radio"
                value="user"
                checked={selectedOption === "user"}
                onChange={handleOptionChange}
              />
              <span>User</span>
            </div>
            <div className="check d-flex gap-1">
              <input
                className="checkmark"
                type="radio"
                value="company"
                checked={selectedOption === "company"}
                onChange={handleOptionChange}
              />
              <span>Company</span>
            </div>
            <div className="check d-flex gap-1">
              <input
                className="checkmark"
                type="radio"
                value="university"
                checked={selectedOption === "university"}
                onChange={handleOptionChange}
              />
              <span>University</span>
            </div>
          </div>

          <div className="box d-flex flex-column gap-3 justify-content-center align-items-center ">
            <TextBox
              className="text_input"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextBox
              className="text_input"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextBox
              className="text_input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {selectedOption === "user" && (
              <TextBox
                type="text"
                placeholder="Mobile Number"
                className="text_input"
                onChange={(e) => setMobileNumber(e.target.value)}
                value={mobileNumber}
              />
            )}

            <DropDown
              data={countries}
              placeholder="select country"
              className="text_input"
              state={country}
              setState={setCountry}
            />

            <DropDown
              data={cities}
              placeholder="select City"
              className="text_input"
              state={city}
              setState={setCity}
            />

            {selectedOption === "company" && (
              <DropDown
                data={CompanySizes}
                state={companySize}
                setState={setCompanySize}
                placeholder="company size"
                className="text_input"
              />
            )}

            {selectedOption === "company" && (
              <DropDown
                data={CompanyCategories}
                state={companyCategory}
                setState={setCompanyCategory}
                placeholder="Company category"
                needIndex={true}
              />
            )}

            {error && <p style={{ maxWidth: '480px' }} className="error">{error}</p>}
          </div>

          <div className="button_box d-flex justify-content-center align-items-center mt-4">
            <Button buttonContent="JOIN NOW" onClick={handelSubmit} />
          </div>

          {/* LOGIN */}

          <Link className="having_acc" to={"/login"}>  {/*having_acc */}
            already have an account?
          </Link>
        </div>

        <div className="right">
          <div className="col-md-10">
            <div className="journey">
              <p className="carousel-caption">START YOUR JOURNEY !</p>
              <div className="carousel-caption">
                register now to use all of site features
              </div>
              <Link to={"/login"}>
                <Button buttonContent="LOGIN" />
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

export default SignUpScreen;
