import styles from "./profile.module.css";
import { FaPenToSquare } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import {
  getAllCountries,
  getAllCitiesInCountry,
} from "../../utilities/getCountriesAndCities";
import DropDown from "../../components/DropDown";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { fetchImage, fetchUser } from "../../actions";
import Modal from "../../components/Modal";

export const loader = async ({ request, params }) => {
  const userData = await fetchUser();
  const profilePhoto = await fetchImage();
  console.log("here we are ", userData);

  return { userData, profilePhoto };
};

const Profile = () => {
  const { userData: user, profilePhoto } = useLoaderData();

  const [userData, setUserData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [Image, setImage] = useState({ file: null, url: null });
  const [dataImage, setDataImage] = useState();
  const [countries, setCountries] = useState([{}]);
  const [cities, setCities] = useState([{}]);
  const [country, setCountry] = useState(user[0]?.country || "Afghanistan");
  const [city, setCity] = useState(user[0]?.city || "Herat");
  const navigate = useNavigate();
  const [modal, setModal] = useState({ show: true });
  const [emailExist, setEmailExist] = useState(false);


  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))?.userType !== "user")
      return navigate("/preview");
  }, []);

  useEffect(() => {
    refrechCountries();
    refrechCities(country);
  }, [country]);

  useEffect(() => {
    setUserData((prevUserData) => [
      { ...prevUserData[0], country: country, city: city },
    ]);
  }, [country, city]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const localStrData = JSON.parse(localStorage.getItem("user"));
    const formData = Object.fromEntries(new FormData(e.target));
    const {
      user: { userid },
    } = localStrData;
    try {
      if (Image.url !== null) {
        const imageURL = await handleFileChange();
        formData.imageURL = imageURL;
      } else {
        formData.imageURL = userData[0].photo;
      }

      if (formData.cv.size) {
        const cvURl = await uploadCv({ cv: formData.cv });
        formData.cvURl = cvURl;
        formData.cvName = formData.cv.name;
      } else {
        formData.cvURl = userData[0].cv;
        formData.cvName = userData[0].cvname;
      } 

      const response = await fetch(
        "https://work-it-back.vercel.app/api/user/editProfile",
        // "http://localhost:5002/api/user/editProfile",
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            authorization: "token: " + localStrData.token,
            type: "user",
          },
          body: JSON.stringify({
            userData: {
              ...formData,
              userid: userid,
            },
          }),
        }
      );
      const json = await response.json();

      if(json.error == "Email already exists"){
        setEmailExist(true)
      }else{
        setEmailExist(false)
      }
      // //update token

      localStrData.user = { userid, ...formData };
      const updatedUserDataString = JSON.stringify(localStrData);
      localStorage.setItem("user", updatedUserDataString);

      // //redirect to preview
      if (response.ok) return navigate("/preview");
    } catch (error) {
      console.log("erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
      console.error("Errorrr:", error);
    } finally {
      console.log("++++++++++++++++++++++++++++++++")
      setLoading(false);
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
      console.error("Error while uploading image: ", error);
    }
  };
  const uploadCv = async ({ cv }) => {
    try {
      let cvURL;
      if (cv && cv.type === "application/pdf") {
        const file = new FormData();
        file.append("file", cv);
        file.append("cloud_name", "dapnyieo6");
        file.append("upload_preset", "swjjtdpv");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dapnyieo6/auto/upload",
          {
            method: "post",
            mode: "cors",
            body: file,
          }
        );
        const cvData = await response.json();
        cvURL = cvData.url.toString();
        return cvURL;
      } else {
        alert("type should be PDF ");
      }
    } catch (error) {
      console.error("Error while uploading image: ", error);
    }
  };
  const refrechCountries = async () => {
    setCountries(await getAllCountries());
  };
  const refrechCities = async (country) => {
    const newCities = await getAllCitiesInCountry(country);
    setCities(newCities);
    if (!userData[0]?.city) setCity(newCities[0]?.value);
  };

  const handleClose = () => {
    setModal({ show: false });
    navigate(`/`);
  };

  if (user?.error)
    return (
      <Modal
        show={modal}
        title={"Error"}
        body={"Your login session has been expired. Please login again."}
        handleClose={handleClose}
      />
    );

  return (
    <div>
      <Navbar />
      <h2 className={styles.text} style={{ textAlign: "center" }}>
        EDIT YOUR PROFILE
      </h2>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handelSubmit} className={styles.main}>
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
              <FaPenToSquare
                className="pen-icon"
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="fileInput"
                className="file-input"
                name="photo"
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
                placeholder={userData[0]?.name}
                value={userData[0]?.name}
                name="name"
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
                placeholder={userData[0]?.lastname}
                value={userData[0]?.lastname}
                name="lastname"
                onChange={(e) =>
                  setUserData((prevUserData) => [
                    { ...prevUserData[0], lastname: e.target.value },
                  ])
                }
              />
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className={styles.email}>
              <span className={styles.text}>
                CV{" "}
                {userData[0]?.cv ? (
                  <span
                    style={{ fontSize: 16, fontWeight: 400, marginLeft: 5 }}
                  >
                    your uploaded cv is {userData[0]?.cvname}
                  </span>
                ) : null}
              </span>
              <input type="file" accept="application/pdf" name="cv" />
            </div>
          )}
          <div className={styles.email}>
            <span className={styles.text}>Email</span>
            <input
              type="text"
              placeholder={userData[0]?.email}
              value={userData[0]?.email}
              name="email"
              onChange={(e) =>
                setUserData((prevUserData) => [
                  { ...prevUserData[0], email: e.target.value },
                ])
              }
            />
            {emailExist? (<p className="error">Email already exists</p>) : <></>}
          </div>
          
          
          <div className={styles.pass}>
            <span className={styles.text}>Password</span>
            <input
              type="password"
              placeholder="********"
              name="password"
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
              placeholder={userData[0]?.mobilenumber}
              value={userData[0]?.mobilenumber}
              name="mobilenumber"
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
                placeholder={userData[0]?.country}
                className="text_input"
                state={country}
                setState={setCountry}
                name={"country"}
              />
              <DropDown
                data={cities}
                placeholder={userData[0]?.city}
                className="text_input"
                state={city}
                setState={setCity}
                name={"city"}
              />
            </div>
          </div>
          <div className={styles.save}>
            <button>Save</button>
          </div>
        </form>
      )}
    </div>
  );
};
export default Profile;
