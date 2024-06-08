import React from "react";
import styles from "./previewStyle.module.css";
import scarab from "../../assets/scarab.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getAllCountries } from "../../utilities/getCountriesAndCities";
import ScholarshipCard from "../../components/ScholarshipCard";
import JobCard from "../../components/JobCard";
import InternCard from "../../components/InternCard";
import { Dropdown } from "react-bootstrap";
// 3ashan mohanned ya3rf ya8yr el styles

const PreviewScreen = () => {
  const [countries, setCountries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [type, setType] = useState("jobs");
  const [data, setData] = useState();
  const [renderedData, setRenderedData] = useState();
  console.log(renderedData);
  const [filteredData, setFilteredData] = useState();
  const [namesearchQuery, setnameSearchQuery] = useState("");
  const [countrysearchQuery, setCountrySearchQuery] = useState("");
  const [size, setSize] = useState();
  const [myUser, setMyUser] = useState();
  // console.log("countrysearchQuery", countrysearchQuery);
  // console.log("namesearchQuery", namesearchQuery);
  // console.log("filteredData", filteredData);
  // console.log("data", data);
  // console.log("size", size);
  // console.log("renderedData", renderedData);
  // console.log("type", type);

  const [selectedPage, setSelectedPage] = useState("");

  const navigate = useNavigate();

  const getData = async () => {
    let url;
    if (type === "jobs")
      url =
        "https://work-it-back-iua05b5k5-omair-waleeds-projects.vercel.app/api/job/allJobs/";
    else if (type === "scholarships")
      url =
        "https://work-it-back-iua05b5k5-omair-waleeds-projects.vercel.app/api/scholarship/allScholarships/";
    else
      url =
        "https://work-it-back-iua05b5k5-omair-waleeds-projects.vercel.app/api/internship/allInternships/";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log("server error");
      }

      const json = await response.json();
      setData(json);
      setFilteredData(json);
      setSize(json.length);
      //the json is an array of jobs joined with company
    } catch (error) {
      console.log(error);
    }
  };

  const refreshCountries = async () => {
    setCountries(await getAllCountries());
  };

  const handleNavigation = async (selectedPage) => {
    switch (selectedPage) {
      case "profile":
        navigate("/profile");
        break;
      case "applications":
        navigate("/test");
        break;
      case "settings":
        navigate("/test");
        break;
      case "home":
        navigate("/test");
        break;
      case "logout":
        localStorage.removeItem("user");
        navigate("/");
        break;
      default:
        // Handle other cases if needed
        break;
    }

    // console.log("check point up")
  };

  const filterData = () => {
    let filtered;
    let name =
      type === "jobs"
        ? "jobtitle"
        : type === "interns"
        ? "internshiptitle"
        : "scholarshiptitle";
    if (namesearchQuery && countrysearchQuery) {
      filtered = data.filter(
        (el) =>
          el[name]?.toLowerCase().includes(namesearchQuery.toLowerCase()) &&
          el.country?.toLowerCase().includes(countrysearchQuery.toLowerCase())
      );
    } else if (namesearchQuery) {
      filtered = data.filter((el) =>
        el[name]?.toLowerCase().includes(namesearchQuery.toLowerCase())
      );
    } else if (countrysearchQuery) {
      filtered = data.filter((el) =>
        el.country?.toLowerCase().includes(countrysearchQuery.toLowerCase())
      );
    } else {
      filtered = data;
    }
    setFilteredData(filtered);
    setRenderedData(filtered.slice(0, currentIndex * 8));
    setSize(filtered.length);
  };

  useEffect(() => {
    refreshCountries();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setMyUser(storedUser);
  }, []);

  useEffect(() => {
    getData();
    setCurrentIndex(1);
    setCountrySearchQuery("");
    setnameSearchQuery("");
  }, [type]);

  useEffect(() => {
    if (data) filterData();
  }, [namesearchQuery, countrysearchQuery]);

  useEffect(() => {
    if (filteredData) {
      setRenderedData(filteredData.slice(0, currentIndex * 8));
    }
  }, [filteredData, currentIndex]);

  return (
    <div className={styles.body}>
      <div className={styles.parent}>
        <header>
          <div className={styles.header_left}>
            <div className={styles.text}>WORK-IT!</div>
          </div>
          {!localStorage.getItem("user") && (
            <div className={styles.button_container}>
              <Link to={"/login"}>
                <button>LOGIN</button>
              </Link>
              <Link to={"/signup"}>
                <button>JOIN NOW</button>
              </Link>
            </div>
          )}
          {localStorage.getItem("user") && (
            <div style={{ display: "flex" }}>
              {myUser && (
                <div
                  style={{
                    flex: 1,
                    marginRight: "40px",
                    paddingTop: "10px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {JSON.parse(localStorage.getItem("user")).userType ==
                    "user" && <p>Hello, {myUser.user.name}</p>}
                  {JSON.parse(localStorage.getItem("user")).userType ==
                    "company" && (
                    <p>
                      Hello,{" "}
                      {
                        JSON.parse(localStorage.getItem("user")).user
                          .companyname
                      }
                    </p>
                  )}
                  {JSON.parse(localStorage.getItem("user")).userType ==
                    "university" && (
                    <p>
                      Hello,{" "}
                      {
                        JSON.parse(localStorage.getItem("user")).user
                          .universityname
                      }
                    </p>
                  )}
                </div>
              )}

              <div className={styles.button_container}>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary"
                    size="lg"
                    value={selectedPage}
                    onChange={(e) => handleNavigation(e.target.value)}
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    {JSON.parse(localStorage.getItem("user")).userType ==
                      "user" && (
                      <Dropdown.Item>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={"/profile"}
                        >
                          profile
                        </Link>
                      </Dropdown.Item>
                    )}

                    {JSON.parse(localStorage.getItem("user")).userType ==
                      "company" && (
                      <Dropdown.Item>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={"/companyProfile"}
                        >
                          profile
                        </Link>
                      </Dropdown.Item>
                    )}

                    {JSON.parse(localStorage.getItem("user")).userType ==
                      "university" && (
                      <Dropdown.Item>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={"/universityProfile"}
                        >
                          profile
                        </Link>
                      </Dropdown.Item>
                    )}

                    <Dropdown.Item>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={"/myapps"}
                      >
                        applications
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/");
                      }}
                    >
                      logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          )}
        </header>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className={styles.box}>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Search For Jobs"
                value={namesearchQuery}
                onChange={(e) => setnameSearchQuery(e.target.value)}
              ></input>
              <div>
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="location"
                list="location"
                value={countrysearchQuery}
                onChange={(e) => setCountrySearchQuery(e.target.value)}
              ></input>
              <datalist id="location">
                {countries.map((country, index) => (
                  <option key={index} value={country.value} />
                ))}
              </datalist>
            </div>
            {/* <div className={styles.category}>
              <div>
                <span>Category</span>
                <i className="fa-solid fa-caret-down"></i>
              </div>
            </div> */}
          </div>
        </div>

        <div className={styles.Jobs_int_sch}>
          <div className={styles.title}>
            <span
              className={`${styles.job_text} ${
                type === "jobs" && styles.selectedJobText
              }`}
            >
              <p onClick={() => setType("jobs")}>JOBS</p>
            </span>
            <span
              className={`${styles.job_text} ${
                type === "interns" && styles.selectedJobText
              }`}
            >
              <p onClick={() => setType("interns")}>INTERNSHIPS</p>
            </span>
            <span
              className={`${styles.job_text} ${
                type === "scholarships" && styles.selectedJobText
              }`}
            >
              <p onClick={() => setType("scholarships")}>SCHOLARSIHPS</p>
            </span>
          </div>
        </div>

        <div>
          <div className={styles.main}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {renderedData?.map((el, index) => {
                if (type === "jobs")
                  return (
                    <div style={{ flexBasis: "50%" }} key={index}>
                      <JobCard data={el} />
                    </div>
                  );
                else if (type === "scholarships")
                  return (
                    <div style={{ flexBasis: "50%" }} key={index}>
                      <ScholarshipCard data={el} />
                    </div>
                  );
                else
                  return (
                    <div style={{ flexBasis: "50%" }} key={index}>
                      <InternCard data={el} />
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
        {renderedData?.length !== size && (
          <div
            className={styles.show_more}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <p style={{ fontSize: 20, fontWeight: 800 }}>Show more</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewScreen;

/*, {
        method: "get",
        headers: {
          authorization:
            "n eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImlhdCI6MTcwODY5NTQ2OCwiZXhwIjoxNzA4NzgxODY4fQ.GN-S1mvwRHsG2O0LbTR7PAjlT8xNOXnIRMLypoYFASI",
        },
      }*/
