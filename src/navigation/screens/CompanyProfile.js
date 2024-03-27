import styles from "./profile.module.css"
import { FaPenToSquare } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropDown from "../../components/DropDown";
import "react-dropdown/style.css";
import { getAllCountries, getAllCitiesInCountry } from "../../utilities/getCountriesAndCities";
import defaultPP from "../../assets/defaultPP.jpeg";


const CompanyProfile = () => {

    const [loading, setLoading] = useState(true);
    const [companyData, setCompanyData] = useState("");
    const [Image, setImage] = useState({ file: null, url: null });
    const [dataImage, setDataImage] = useState({ file: null, url: null });
    const [profilePhoto, setProfilePhoto] = useState({ file: null, url: null });
    const [countries, setCountries] = useState([{}]);
    const [cities, setCities] = useState([{}]);
    const [country, setCountry] = useState();
    const [city, setCity] = useState();

    useEffect(() => {
      fetchCompany();
      fetchImage();
    }, []);

    useEffect(() => {
      refrechCountries();
      refrechCities();
    }, [country]);

    useEffect(() => {
      if (!loading) {
        setCompanyData((prevUserData) => [
          { ...prevUserData[0], companycountry: country },
        ]);
        setCompanyData((prevUserData) => [
          { ...prevUserData[0], companycity: city },
        ]);
      }
    }, [country, city]);

    const navigate = useNavigate();

    const fetchCompany = async () => {
      try {
        const localStrData = JSON.parse(localStorage.getItem("user"));
        const type = localStrData.userType;
        const response = await fetch("api/company/companyDetails", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStrData.token,
            type: type,
          },
        });
        const json = await response.json();
        setCompanyData(json);
        setCountry(companyData[0].companycountry);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    const handelSubmit = async () => {
      try {
        if (Image.url != null) handleFileChange();

        const localStrData = JSON.parse(localStorage.getItem("user"));
        const type = localStrData.userType;

        const response = await fetch("/api/company/editProfile", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            authorization: "token: " + localStrData.token,
            type: type,
          },
          body: JSON.stringify({ companyData: companyData[0] }),
        });
        localStrData.user = companyData[0];
        const updatedUserDataString = JSON.stringify(localStrData);
        localStorage.setItem("user", updatedUserDataString);
        navigate("/preview");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchImage = async () => {
        const localStrData = JSON.parse(localStorage.getItem('user'));
        const type = localStrData.userType
        try {
            const response = await fetch("/api/company/gallery", {
                headers: {
                    authorization:
                        "token: " + localStrData.token,
                    'type': type,
                },
            });
            const data = await response.json();

            if (data.success) {

                if (data.images[0].logo)
                    setProfilePhoto(data.images[0]);
                else
                    setProfilePhoto({ logo: defaultPP });

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
            const localStrData = JSON.parse(localStorage.getItem('user'));
            const type = localStrData.userType
            const formData = new FormData();
            formData.append("image", dataImage);

            const response = await fetch("/api/company/uploadImage", {
                method: "POST",
                headers: {
                    authorization:
                        "token: " + localStrData.token,
                    'type': type,

                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Image uploaded successfully:", result.imageUrl);
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
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
                <span className={styles.text}>EDIT YOUR COMPANY PROFILE</span>
            </header>
            <div className={styles.main}>
                <div className={styles.user}>
                    <div
                        style={{
                            width: '150px',
                            height: '150px',
                            overflow: 'hidden',
                            borderRadius: '50%',
                        }}
                        className={styles.photo}>
                        {Image.url && <img
                            src={Image.url}
                            alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%',
                            }}
                        />}
                        {!Image.url && <img
                            src={profilePhoto.logo}
                            alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%',
                            }}
                        />}
                    </div>
                    <label htmlFor="fileInput" className="file-input-label" style={{ position: 'relative', overflow: 'hidden', width: 'fit-content' }}>
                        <FaPenToSquare className="pen-icon" style={{ cursor: 'pointer' }} />
                        <input
                            type="file"
                            id="fileInput"
                            className="file-input"
                            style={{
                                position: 'absolute',
                                opacity: 0,
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                cursor: 'pointer'
                            }}
                            onChange={(e) => handleImageChange(e)}
                        />
                    </label>
                </div>
                <div className={styles.first_name}>
                    <span className={styles.text}>Name</span>
                    <input
                        type="text"
                        placeholder={companyData[0].companyname}
                        value={companyData[0].companyname}
                        onChange={e => setCompanyData((prevUserData) => [{ ...prevUserData[0], companyname: e.target.value, },])}
                    />
                </div>
                <div className={styles.last_name}>
                    <span className={styles.text}>Company size</span>
                    <input
                        type="text"
                        placeholder={companyData[0].company_size}
                        value={companyData[0].company_size}
                        onChange={e => setCompanyData((prevUserData) => [{ ...prevUserData[0], company_size: e.target.value, },])}
                    />
                </div>
                <div className={styles.email}>
                    <span className={styles.text}>Email</span>
                    <input type="text"
                        placeholder={companyData[0].companyemail}
                        value={companyData[0].companyemail}
                        onChange={e => setCompanyData((prevUserData) => [{ ...prevUserData[0], companyemail: e.target.value, },])}

                    />
                </div>
                <div className={styles.pass}>
                    <span className={styles.text}>Password</span>
                    <input type="password" placeholder="********"
                    // onChange={e => setUserData((prevUserData) => [{ ...prevUserData[0], password: e.target.value, },])} 
                    />
                </div>
                <div className={styles.phone}>
                    <span className={styles.text}>Company category</span>
                    <input type="text"
                        placeholder={companyData[0].categoryname}
                        value={companyData[0].categoryname}
                    />
                </div>
                {/* ///////////////////////////////////////////////////////////////////// */}
                <div className={styles.address}>
                    <span className={styles.text}>Address</span>
                    <div className={styles.address_inputs}>

                        <DropDown
                            data={countries}
                            placeholder={companyData[0].companycountry}
                            className="text_input"
                            state={country}
                            setState={setCountry}
                        />

                        {/* <input type="text"
                            placeholder={companyData[0].companycountry}
                            value={companyData[0].companycountry}
                            onChange={e => setCompanyData((prevUserData) => [{ ...prevUserData[0], companycountry: e.target.value, },])}
                        /> */}

                        <DropDown
                            data={cities}
                            placeholder={companyData[0].companycity}
                            className="text_input"
                            state={city}
                            setState={setCity}
                        />

                        {/* <input type="text"
                            placeholder={companyData[0].companycity}
                            value={companyData[0].companycity}
                            onChange={e => setCompanyData((prevUserData) => [{ ...prevUserData[0], companycity: e.target.value, },])}

                        /> */}
                    </div>
                </div>
                {/* ///////////////////////////////////////////////////////////////////// */}
                <div className={styles.save}>
                    <button
                        onClick={handelSubmit}
                    >Save</button>
                </div>
            </div>
        </div>
    )
}

export default CompanyProfile;