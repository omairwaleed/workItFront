import styles from "./profile.module.css";
import { FaPenToSquare } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCountries, getAllCitiesInCountry } from "../../utilities/getCountriesAndCities";
import DropDown from "../../components/DropDown";
import defaultPP from "../../assets/defaultPP.jpeg";


const Profile = () => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const [Image, setImage] = useState({ file: null, url: null });
  const [dataImage, setDataImage] = useState({ file: null, url: null });
  const [profilePhoto, setProfilePhoto] = useState({ file: null, url: null });

  const [countries, setCountries] = useState([{}]);
  const [cities, setCities] = useState([{}]);

  const [country, setCountry] = useState();
  const [city, setCity] = useState();

  const cvRef = useRef();

  useEffect(() => {
    fetchUser();
    fetchImage();
  }, []);

  useEffect(() => {
    refrechCountries();
    refrechCities();
  }, [country]);

  useEffect(() => {
    if (!loading) {
      setUserData((prevUserData) => [{ ...prevUserData[0], country: country, },])
      setUserData((prevUserData) => [{ ...prevUserData[0], city: city, },])
    }
  }, [country, city]);

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const localStrData = JSON.parse(localStorage.getItem("user"));
      const type = localStrData.userType;
      const response = await fetch("api/user/userDetails", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStrData.token,
          type: type,
        },
      });
      const json = await response.json();
      await setUserData(json);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handelSubmit = async () => {
    try {
      if (Image.url != null) {
        handleFileChange();
      }
      if (cvRef.current?.files.length) {
        uploadCv();
      }
      const localStrData = JSON.parse(localStorage.getItem("user"));
      const type = localStrData.userType;

      const response = await fetch("/api/user/editProfile", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: "token: " + localStrData.token,
          type: type,
        },
        body: JSON.stringify({ userData: userData[0] }),
      });
      //update token

      localStrData.user = userData[0];
      const updatedUserDataString = JSON.stringify(localStrData);
      localStorage.setItem("user", updatedUserDataString);

      //redirect to preview
      if(response.ok){
      navigate("/preview");
      }
    } catch (error) {
      console.error("Error:", error);    }
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
      const localStrData = JSON.parse(localStorage.getItem("user"));
      const type = localStrData.userType;
      const formData = new FormData();
      formData.append("image", dataImage);

      const response = await fetch("/api/user/uploadImage", {
        method: "POST",
        headers: {
          authorization: "token: " + localStrData.token,
          type: type,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully:");
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const fetchImage = async () => {
    const localStrData = JSON.parse(localStorage.getItem("user"));
    const type = localStrData.userType;
    try {
      const response = await fetch("/api/user/gallery", {
        headers: {
          authorization: "token: " + localStrData.token,
          type: type,
        },
      });
      const data = await response.json();

      if (data.success) {
        if (data.images[0].photo)
          setProfilePhoto(data.images[0]);
        else
          setProfilePhoto({ photo: defaultPP });
      } else {
        console.error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadCv = async () => {
    try {
      const localStrData = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();
      formData.set("cv", cvRef.current?.files[0]);
      formData.set("id", localStrData.user.userid);
      const response = await fetch("/api/user/uploadCv", {
        method: "POST",
        headers: {
          authorization: "token: " + localStrData.token,
        },
        body: formData,
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error while uploading cv ", error);
      return false;
    }
  };

  const refrechCountries = async () => {
    setCountries(await getAllCountries())
  }
  const refrechCities = async () => {
    setCities(await getAllCitiesInCountry(country))
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <header className={styles.header}>
        <span className={styles.text}>EDIT YOUR PROFILE</span>
      </header>
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
                alt="imagep"
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
                src={profilePhoto.photo}
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
            <FaPenToSquare className="pen-icon" style={{ cursor: "pointer" }} />
            <input
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
        <div className={styles.name}>
          <div className={styles.first_name}>
            <span className={styles.text}>First Name</span>
            <input
              type="text"
              placeholder={userData[0].name}
              value={userData[0].name}
              onChange={(e) =>
                setUserData((prevUserData) => [
                  { ...prevUserData[0], name: e.target.value },
                ])
              }
            />
          </div>
          <div className={styles.last_name}>
            <span className={styles.text}>Last Name</span>
            <input
              type="text"
              placeholder={userData[0].lastname}
              value={userData[0].lastname}
              onChange={(e) =>
                setUserData((prevUserData) => [
                  { ...prevUserData[0], lastname: e.target.value },
                ])
              }
            />
          </div>
        </div>
        <div className={styles.email}>
          <span className={styles.text}>
            CV{" "}
            {userData[0].cv ? (
              <span style={{ fontSize: 16, fontWeight: 400, marginLeft: 5 }}>
                your uploaded cv is {userData[0].cv.split("_").slice(1)}{" "}
              </span>
            ) : null}
          </span>
          <input type="file" ref={cvRef} />
        </div>
        <div className={styles.email}>
          <span className={styles.text}>Email</span>
          <input
            type="text"
            placeholder={userData[0].email}
            value={userData[0].email}
            onChange={(e) =>
              setUserData((prevUserData) => [
                { ...prevUserData[0], email: e.target.value },
              ])
            }
          />
        </div>
        <div className={styles.pass}>
          <span className={styles.text}>Password</span>
          <input
            type="password"
            placeholder="********"
            onChange={(e) =>
              setUserData((prevUserData) => [
                { ...prevUserData[0], password: e.target.value },
              ])
            }
          />
        </div>
        <div className={styles.phone}>
          <span className={styles.text}>Phone Number</span>
          <input
            type="text"
            placeholder={userData[0].mobilenumber}
            value={userData[0].mobilenumber}
            onChange={(e) =>
              setUserData((prevUserData) => [
                { ...prevUserData[0], mobilenumber: e.target.value },
              ])
            }
          />
        </div>
        <div className={styles.address}>
          <span className={styles.text}>Address</span>
          <div className={styles.address_inputs}>

            <DropDown
              data={countries}
              placeholder={userData[0].country}
              className="text_input"
              state={country}
              setState={setCountry}
            />

            {/* <input
              type="text"
              placeholder={userData[0].city}
              value={userData[0].city}
              onChange={(e) =>
                setUserData((prevUserData) => [
                  { ...prevUserData[0], city: e.target.value },
                ])
              }
            /> */}

            <DropDown
              data={cities}
              placeholder={userData[0].city}
              className="text_input"
              state={city}
              setState={setCity}
            />

            {/* <input
              type="text"
              placeholder={userData[0].country}
              value={userData[0].country}
              onChange={(e) =>
                setUserData((prevUserData) => [
                  { ...prevUserData[0], country: e.target.value },
                ])
              }
            /> */}
            {/* <input type="text" placeholder="ZIP Code (Optional)" /> */}
          </div>
        </div>
        <div className={styles.save}>
          <button onClick={handelSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
