import { useEffect, useState } from "react";
import styles from "./collegeview.module.css";
import AppCard from "../../components/AppCard";
import { getAllCountries } from "../../utilities/getCountriesAndCities";
import Loader from "../../components/Loader";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Companyview() {
  const companyid = JSON.parse(localStorage?.getItem("user")).user.companyid;
  const [searchParams] = useSearchParams();

  const [countries, setCountries] = useState([]);
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState(data);
  const [namesearchQuery, setnameSearchQuery] = useState("");
  const [countrysearchQuery, setCountrySearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(
    searchParams.get("type") ? searchParams.get("type") : "jobs"
  );

  const filterByName = (data) => {
    const title = type === "jobs" ? "jobtitle" : "internshiptitle";
    return data?.filter((d) =>
      d[title]?.toLowerCase().includes(namesearchQuery.toLowerCase())
    );
  };

  const filterByCountry = (data) => {
    return data.filter((d) =>
      d.country.toLowerCase().includes(countrysearchQuery.toLowerCase())
    );
  };

  const getData = async () => {
    let url;
    if (type === "jobs") url = "api/job/allJobs/";
    else url = "api/internship/allInternships/";

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) console.log("server error");

      const json = await response.json();

      const myData = json.filter((d) => d.companyid === companyid);

      setData(myData);
      setFilteredData(myData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const refreshCountries = async () => {
      setCountries(await getAllCountries());
    };
    refreshCountries();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  useEffect(() => {
    if (namesearchQuery) setFilteredData(filterByName(data));
    else if (countrysearchQuery) setFilteredData(filterByCountry(data));
    else setFilteredData(data);
  }, [countrysearchQuery, namesearchQuery]);

  if (!companyid) return <Navigate to="/preview" />;
  return (
    <div className={styles.parent}>
      <Navbar />
      <div className={styles.collegebar}>
        <div style={styles.leftbar}>
          <div className={styles.box}>
            <div className={styles.search}>
              <input
                type="text"
                placeholder={`Search For ${type}`}
                value={namesearchQuery}
                onChange={(e) => {
                  setnameSearchQuery(e.target.value);
                  setCountrySearchQuery("");
                }}
              />
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
                onChange={(e) => {
                  setCountrySearchQuery(e.target.value);
                  setnameSearchQuery("");
                }}
              />
              <datalist id="location">
                {countries.map((country, index) => (
                  <option key={index} value={country.value} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        <div className={styles.rightbar}>
          <Link to="/add-intern" className="button-68 my_button" role="button">
            Add Intern
          </Link>
          <Link to="/add-job" className="button-68 my_button" role="button">
            Add Job
          </Link>
        </div>
      </div>

      {/* toggle button */}
      <div className={styles.collegeviewcb}>
        <div className={styles.checkbox}>
          <button
            className={`${styles.btnXX} ${
              type === "internships" && styles.active
            }`}
            onClick={() => {
              setType("internships");
              setnameSearchQuery("");
              setCountrySearchQuery("");
            }}
          >
            Internships
          </button>
        </div>
        <div className={styles.checkbox}>
          <button
            className={`${styles.btnXX} ${type === "jobs" && styles.active}`}
            onClick={() => {
              setType("jobs");
              setnameSearchQuery("");
              setCountrySearchQuery("");
            }}
          >
            Jobs
          </button>
        </div>
      </div>
      {loading && <Loader />}

      {!loading && (
        <ol>
          {filteredData?.map((d) => (
            <AppCard
              key={d.jobid || d.internshipid}
              type={type}
              title={d.jobtitle || d.internshiptitle}
              country={d.country}
              city={d.city}
              jobdescription={d.jobdescription}
              requiredskills={d.requiredskills}
            />
          ))}
        </ol>
      )}
    </div>
  );
}
