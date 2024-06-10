import styles from "./profile.module.css";
import { FaPenToSquare } from "react-icons/fa6";
import { Suspense, useEffect, useState } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import DropDown from "../../components/DropDown";
import "react-dropdown/style.css";
import {
  getAllCountries,
  getAllCitiesInCountry,
} from "../../utilities/getCountriesAndCities";
import defaultPP from "../../assets/defaultPP.jpeg";
import Navbar from "../../components/Navbar";
import { CompanyCategories, CompanySizes } from "../../data/DropDownData";
import Loader from "../../components/Loader";

export const loader = async () => {
  const countries = await getAllCountries();
  const user = JSON.parse(localStorage.getItem("user"));

  return { company: user?.user, uType: user?.userType, countries };
};

const CompanyProfile = () => {
  const { company, uType, countries } = useLoaderData();
  console.log(company);

  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(company);
  const [Image, setImage] = useState({ file: null, url: null });
  const [dataImage, setDataImage] = useState({ file: null, url: null });
  const [profilePhoto, setProfilePhoto] = useState({ file: null, url: null });
  const [cities, setCities] = useState([{}]);
  const [country, setCountry] = useState(company?.companycountry);
  const [city, setCity] = useState(company?.companycity);
  const [companyCategory, setCompanyCategory] = useState(
    CompanyCategories.filter((con) => con.index === company?.categoryid)[0]
      ?.value
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (uType !== "company") return navigate("/preview");

    fetchCompany();
    fetchImage();
  }, []);

  useEffect(() => {
    refrechCities(country);
  }, [country]);

  useEffect(() => {
    setCompanyData((prevUserData) => [
      {
        ...prevUserData[0],
        companycountry: country,
        companycity: city,
      },
    ]);
  }, [country, city]);

  const fetchCompany = async () => {
    try {
      const localStrData = JSON.parse(localStorage.getItem("user"));
      const type = localStrData.userType;
      const response = await fetch(
        "https://work-it-back.vercel.app/api/company/companyDetails",
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
      setCompanyData(json);
    } catch (error) {
      console.error("Error fetching company data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handelSubmit = async () => {
    let imageUrl;
    try {
      if (Image.url != null) {
        imageUrl = await handleFileChange();
      }

      const localStrData = JSON.parse(localStorage.getItem("user"));
      const type = localStrData.userType;
      localStrData.user = companyData[0];
      localStrData.user.country = country;
      localStrData.user.city = city;
      localStrData.user.imageUrl = imageUrl ? imageUrl : companyData[0].logo;

      const response = await fetch(
        "https://work-it-back.vercel.app/api/company/editProfile",
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            authorization: "token: " + localStrData.token,
            type: type,
          },
          body: JSON.stringify({ companyData: localStrData.user }),
        }
      );
      const updatedUserDataString = JSON.stringify(localStrData);
      localStorage.setItem("user", updatedUserDataString);
      navigate("/companyview");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchImage = async () => {
    const localStrData = JSON.parse(localStorage.getItem("user"));
    const type = localStrData.userType;
    try {
      const response = await fetch(
        "https://work-it-back.vercel.app/api/company/gallery",
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
  const refrechCities = async (country) => {
    const newCities = await getAllCitiesInCountry(country);
    setCities(newCities);
    if (!company?.companycity) setCity(newCities[0]?.value);
  };

  useEffect(() => {
    setCompanyData((prevCompanyData) => [
      {
        ...prevCompanyData[0],
        categoryid: CompanyCategories.filter(
          (con) => con.value === companyCategory
        )[0].index,
      },
    ]);
  }, [companyCategory]);

  if (loading) return <Loader />;

  return (
    <div>
      <Navbar />
      <h2 className={styles.text} style={{ textAlign: "center" }}>
        EDIT YOUR COMPANY PROFILE
      </h2>
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
            <FaPenToSquare className="pen-icon" style={{ cursor: "pointer" }} />
            <input
              type="file"
              id="fileInput"
              accept="image/png, image/jpeg"
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
            placeholder="Company Name"
            defaultValue={companyData[0]?.companyname}
            onChange={(e) =>
              setCompanyData((prevUserData) => [
                { ...prevUserData[0], companyname: e.target.value },
              ])
            }
          />
        </div>
        <div className={styles.last_name}>
          <span className={styles.text}>Company size</span>
          {/* [x] from sizes, do the same with categories */}
          <select
            placeholder="Company Size"
            className="text_input"
            style={{
              border: "1px solid rgb(204, 204, 204)",
              width: "fit-content",
            }}
            defaultValue={companyData[0]?.company_size}
            onChange={(e) =>
              setCompanyData((prevUserData) => [
                { ...prevUserData[0], company_size: e.target.value },
              ])
            }
          >
            {CompanySizes?.map((s) => (
              <option key={s.index} value={s.value}>
                {s.value}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.email}>
          <span className={styles.text}>Email</span>
          <input
            type="text"
            placeholder="Company Email"
            value={companyData[0]?.companyemail}
            onChange={(e) =>
              setCompanyData((prevUserData) => [
                { ...prevUserData[0], companyemail: e.target.value },
              ])
            }
          />
        </div>
        <div className={styles.pass}>
          <span className={styles.text}>Password</span>
          <input type="password" placeholder="**********" disabled />
        </div>
        <div className={styles.phone}>
          <span className={styles.text}>Company category</span>
          <DropDown
            data={CompanyCategories}
            state={companyCategory}
            setState={setCompanyCategory}
            placeholder="Company category"
            className="text_input"
          />
        </div>
        <div className={styles.address}>
          <span className={styles.text}>Address</span>
          <div className={styles.address_inputs}>
            <Suspense fallback={<Loader />}>
              <DropDown
                data={countries}
                placeholder={company?.companycountry}
                className="text_input"
                state={country}
                setState={setCountry}
              />
              <DropDown
                data={cities}
                placeholder={company?.companycity}
                className="text_input"
                state={city}
                setState={setCity}
              />
            </Suspense>
          </div>
        </div>
        <div className={styles.save}>
          <button onClick={handelSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
