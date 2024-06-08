import styles from "./previewStyle.module.css";
import { useState, useEffect } from "react";
import { getAllCountries } from "../../utilities/getCountriesAndCities";
import ScholarshipCard from "../../components/ScholarshipCard";
import JobCard from "../../components/JobCard";
import InternCard from "../../components/InternCard";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
// 3ashan mohanned ya3rf ya8yr el styles

const PreviewScreen = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [renderedData, setRenderedData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [namesearchQuery, setnameSearchQuery] = useState("");
  const [countrysearchQuery, setCountrySearchQuery] = useState("");
  const [size, setSize] = useState();
  const [type, setType] = useState(
    searchParams.get("type")
      ? searchParams.get("type")
      : user?.userType === "university"
      ? "scholarships"
      : "jobs"
  );
  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);

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

      setSize(json.length);
      setData(json);

      // [x] filter json here
      if (user?.userType === "company")
        setFilteredData(
          json.filter((d) => d.companyid === user.user.companyid)
        );
      else if (user?.userType === "university")
        setFilteredData(
          json.filter((d) => d.universityid === user.user.universityid)
        );
      else setFilteredData(json);

      setLoading(false);

      //the json is an array of jobs joined with company
    } catch (error) {
      console.log(error);
    }
  };

  const refreshCountries = async () => {
    setCountries(await getAllCountries());
  };

  const filterByName = (data) => {
    const title =
      type === "jobs"
        ? "jobtitle"
        : type === "interns"
        ? "internshiptitle"
        : "scholarshiptitle";
    return data?.filter((d) =>
      d[title]?.toLowerCase().includes(namesearchQuery.toLowerCase())
    );
  };

  const filterByCountry = (data) => {
    return data.filter((d) =>
      d?.country?.toLowerCase().includes(countrysearchQuery.toLowerCase())
    );
  };
  const filterByBoth = (data) => {
    const title =
      type === "jobs"
        ? "jobtitle"
        : type === "interns"
        ? "internshiptitle"
        : "scholarshiptitle";

    return data.filter(
      (d) =>
        d?.country?.toLowerCase().includes(countrysearchQuery.toLowerCase()) &&
        d[title]?.toLowerCase().includes(namesearchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    if (user?.userType === "university") return navigate("/collegeview");

    if (user?.userType === "company") return navigate("/companyview");

    refreshCountries();
  }, []);

  useEffect(() => {
    getData();
    setCurrentIndex(1);
    setCountrySearchQuery("");
    setnameSearchQuery("");
  }, [type]);

  useEffect(() => {
    if (namesearchQuery && countrysearchQuery)
      setFilteredData(filterByBoth(filteredData));

    if (namesearchQuery && !countrysearchQuery)
      setFilteredData(filterByName(data));
    if (countrysearchQuery && !namesearchQuery)
      setFilteredData(filterByCountry(data));

    if (!namesearchQuery && !countrysearchQuery) setFilteredData(data);
  }, [countrysearchQuery, namesearchQuery]);

  useEffect(() => {
    setRenderedData(filteredData?.slice(0, currentIndex * 8));
  }, [filteredData, currentIndex]);

  return (
    <div className={styles.body}>
      <div className={styles.parent}>
        <Navbar />

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
          </div>
        </div>

        <div className={styles.Jobs_int_sch}>
          <div className={styles.title}>
            {!user ||
            user?.userType === "user" ||
            user?.userType === "company" ? (
              <span
                className={`${styles.job_text} ${
                  type === "jobs" && styles.selectedJobText
                }`}
              >
                <p
                  onClick={() => {
                    setType("jobs");
                    setSearchParams({ type: "jobs" });
                  }}
                >
                  JOBS
                </p>
              </span>
            ) : null}

            {!user ||
            user?.userType === "user" ||
            user?.userType === "company" ? (
              <span
                className={`${styles.job_text} ${
                  type === "interns" && styles.selectedJobText
                }`}
              >
                <p
                  onClick={() => {
                    setType("interns");
                    setSearchParams({ type: "interns" });
                  }}
                >
                  INTERNSHIPS
                </p>
              </span>
            ) : null}
            {!user ||
            user?.userType === "user" ||
            user?.userType === "university" ? (
              <span
                className={`${styles.job_text} ${
                  type === "scholarships" && styles.selectedJobText
                }`}
              >
                <p
                  onClick={() => {
                    setType("scholarships");
                    setSearchParams({ type: "scholarships" });
                  }}
                >
                  SCHOLARSIHPS
                </p>
              </span>
            ) : null}
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
                gap: 20,
              }}
            >
              {loading && <Loader />}

              {!loading &&
                renderedData?.map((el, index) => {
                  if (type === "jobs")
                    return (
                      <div key={index}>
                        <JobCard data={el} />
                      </div>
                    );
                  else if (type === "scholarships")
                    return (
                      <div key={index}>
                        <ScholarshipCard data={el} />
                      </div>
                    );
                  else
                    return (
                      <div key={index}>
                        <InternCard data={el} />
                      </div>
                    );
                })}
            </div>
          </div>
        </div>
        {renderedData?.length >= 8 && renderedData?.length !== size && (
          <div
            className={styles.show_more}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {/* [x] Show more */}
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
