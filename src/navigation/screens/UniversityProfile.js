import styles from "./profile.module.css";
import { FaPenToSquare } from "react-icons/fa6";
// import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropDown from "../../components/DropDown";
import "react-dropdown/style.css";
import {
  getAllCountries,
  getAllCitiesInCountry,
} from "../../utilities/getCountriesAndCities";
import defaultPP from "../../assets/defaultPP.jpeg";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

const UniversityProfile = () => {
  const university = JSON.parse(localStorage.getItem("user"))?.user;
  const [loading, setLoading] = useState(false);
  const [universityData, setUniversityData] = useState([university]);
  const [Image, setImage] = useState({ file: null, url: null });
  const [dataImage, setDataImage] = useState({ file: null, url: null });
  const [profilePhoto, setProfilePhoto] = useState({ file: null, url: null });
  const [countries, setCountries] = useState([{}]);
  const [cities, setCities] = useState([{}]);
  const [country, setCountry] = useState(university?.country);
  const [city, setCity] = useState(university?.city);
  const navigate = useNavigate();
  const [emailExist, setEmailExist] = useState(false);

  useEffect(() => {
    if (!university?.universityid) return navigate("/preview");

    fetchUniversity();
    fetchImage();
  }, []);

  useEffect(() => {
    refrechCountries();
    refrechCities(country);
  }, [country]);

  useEffect(() => {
    setUniversityData((prevUserData) => [
      { ...prevUserData[0], country: country, city: city },
    ]);
  }, [country, city]);

  const fetchUniversity = async () => {
    try {
      const localStrData = JSON.parse(localStorage.getItem("user"));
      const type = localStrData.userType;
      const response = await fetch(
        "https://work-it-back.vercel.app/api/university/universityDetails",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStrData.token,
            type: type,
          },
        }
      );
      const json = await response.json();
      setUniversityData(json);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handelSubmit = async () => {
    setLoading(true);
    try {
      let imageUrl;
      if (Image.url != null) {
        imageUrl = await handleFileChange();
      }
      const localStrData = JSON.parse(localStorage.getItem("user"));
      const type = localStrData.userType;
      localStrData.user = universityData[0];
      localStrData.user.country = country;
      localStrData.user.city = city;
      localStrData.user.imageUrl = imageUrl ? imageUrl : universityData[0].logo;

      const response = await fetch(
        "https://work-it-back.vercel.app/api/university/editProfile",
        // "http://localhost:5002/api/university/editProfile",

        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            authorization: "token: " + localStrData.token,
            type: type,
          },
          body: JSON.stringify({ universityData: localStrData.user }),
        }
      );

      const json = await response.json();

      if (json.error == "Email already exists") {
        setEmailExist(true);
      } else {
        setEmailExist(false);
        const updatedUserDataString = JSON.stringify(localStrData);
        localStorage.setItem("user", updatedUserDataString);
        navigate("/collegeview");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImage = async () => {
    const localStrData = JSON.parse(localStorage.getItem("user"));
    const type = localStrData.userType;
    try {
      const response = await fetch(
        "https://work-it-back.vercel.app/api/university/gallery",
        {
          headers: {
            authorization: "token: " + localStrData.token,
            type: type,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        if (data.images[0].logo) setProfilePhoto(data.images[0]);
        else setProfilePhoto({ logo: defaultPP });
      } else {
        console.error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImage({ file: file, url: url });
    }
    setDataImage(event.target.files[0]);
  };

  const handleFileChange = async () => {
    try {
      let imageURL;
      if (
        dataImage &&
        (dataImage.type === "image/png" ||
          dataImage.type === "image/jpg" ||
          dataImage.type === "image/jpeg")
      ) {
        const image = new FormData();
        image.append("file", dataImage);
        image.append("cloud_name", "dapnyieo6");
        image.append("upload_preset", "gyeiwufc");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dapnyieo6/image/upload",

          {
            method: "post",
            body: image,
          }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
        return imageURL;
      } else {
        alert("type should be png or jpg or jpeg ");
      }
    } catch (error) {
      console.error("Error while uploading image:", error);
    }
  };

  const refrechCountries = async () => {
    setCountries(await getAllCountries());
  };
  const refrechCities = async (country) => {
    const newCities = await getAllCitiesInCountry(country);
    setCities(newCities);
    if (!university?.city) setCity(newCities[0]?.value);
  };

  // if (loading) return <Loader />;

  return (
    <div>
      <Navbar />
      <h2 className={styles.text} style={{ textAlign: "center" }}>
        EDIT YOUR UNIVERSITY PROFILE
      </h2>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.main}>
          <div className={styles.user}>
            <div
              style={{
                width: "150px",
                height: "150px",
                overflow: "hidden",
                borderRadius: "50%",
              }}
              className={styles.photo}
            >
              {Image.url && (
                <img
                  src={Image.url}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              )}
              {!Image.url && (
                <img
                  src={profilePhoto.logo}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
            <label
              htmlFor="fileInput"
              className="file-input-label"
              style={{
                position: "relative",
                overflow: "hidden",
                width: "fit-content",
              }}
            >
              <FaPenToSquare
                className="pen-icon"
                style={{ cursor: "pointer" }}
              />
              <input
                accept="image/png, image/jpeg"
                type="file"
                id="fileInput"
                className="file-input"
                style={{
                  position: "absolute",
                  opacity: 0,
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                onChange={(e) => handleImageChange(e)}
              />
            </label>
          </div>
          <div className={styles.first_name}>
            <span className={styles.text}>Name</span>
            <input
              type="text"
              placeholder="University Name"
              value={universityData[0].universityname}
              onChange={(e) =>
                setUniversityData((prevUserData) => [
                  { ...prevUserData[0], universityname: e.target.value },
                ])
              }
            />
          </div>
          <div className={styles.last_name}>
            <span className={styles.text}>Contact email</span>
            <input
              type="text"
              placeholder="University Contact Email"
              value={universityData[0].contactemail}
              onChange={(e) =>
                setUniversityData((prevUserData) => [
                  { ...prevUserData[0], contactemail: e.target.value },
                ])
              }
            />
          </div>
          <div className={styles.email}>
            <span className={styles.text}>university email</span>
            <input
              type="text"
              placeholder="University Email"
              value={universityData[0].universityemail}
              onChange={(e) =>
                setUniversityData((prevUserData) => [
                  { ...prevUserData[0], universityemail: e.target.value },
                ])
              }
            />
            {emailExist ? <p className="error">Email already exists</p> : <></>}
          </div>
          <div className={styles.pass}>
            <span className={styles.text}>Password</span>
            <Link
              to="/changePassword"
              state={{
                oldPassword: universityData[0]?.password,
                type: "university",
              }}
              className={styles.save}
              style={{
                justifyContent: "normal",
                marginBottom: 0,
                textDecoration: "none",
              }}
            >
              <button>Change</button>
            </Link>
          </div>
          <div className={styles.address}>
            <span className={styles.text}>Address</span>
            <div className={styles.address_inputs}>
              <DropDown
                data={countries}
                placeholder={universityData[0].country}
                className="text_input"
                state={country}
                setState={setCountry}
              />

              <DropDown
                data={cities}
                placeholder={universityData[0].city}
                className="text_input"
                state={city}
                setState={setCity}
              />
            </div>
          </div>
          <div className={styles.save}>
            <button onClick={handelSubmit}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityProfile;
