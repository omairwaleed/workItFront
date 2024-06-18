import { useEffect, useState } from "react";
import styles from "./collegeview.module.css";
import AppCard from "../../components/AppCard";
import { getAllCountries } from "../../utilities/getCountriesAndCities";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

export default function Collegeview() {
  const [countries, setCountries] = useState([]);
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState(data);
  const [namesearchQuery, setnameSearchQuery] = useState("");
  const [countrysearchQuery, setCountrySearchQuery] = useState("");
  const [type, setType] = useState("scholarships");
  const [loading, setLoading] = useState(false);
  const universityid = JSON.parse(localStorage?.getItem("user"))?.user
    .universityid;
  const navigate = useNavigate();

  const filterByName = (data) => {
    // console.log(data);
    // scholarshiptitle
    if (type === "scholarships")
      return data.filter((d) =>
        d.scholarshiptitle.toLowerCase().includes(namesearchQuery.toLowerCase())
      );
  };

  const filterByCountry = (data) => {
    return data.filter((d) =>
      d.country.toLowerCase().includes(countrysearchQuery.toLowerCase())
    );
  };

  const getData = async () => {
    let url;
    if (type === "scholarships")
      url = "https://work-it-back.vercel.app/api/scholarship/allScholarships/";
    else url = "";

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) console.log("server error");

      const json = await response.json();

      const myData = json.filter((d) => d.universityid === universityid);

      setData(myData);
      setFilteredData(myData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!universityid) return navigate("/preview");

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

  return (
    <div className={styles.parent}>
      <Navbar />
      <div className={styles.collegebar}>
        <div style={styles.leftbar}>
          <div className={styles.box}>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Search For a Scholarship"
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
                placeholder="Search By Country"
                list="location"
                value={countrysearchQuery}
                onChange={(e) => {
                  setCountrySearchQuery(e.target.value);
                  setnameSearchQuery("");
                }}
              />
              <datalist id="location">
                {countries.map((country) => (
                  <option key={country.value} value={country.value} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        <div className={styles.rightbar}>
          <Link to="/add-scholar" className="button-68 my_button" role="button">
            Add Scholarship
          </Link>
        </div>
      </div>

      {/* toggle button */}
      <div className={styles.collegeviewcb}>
        <div className={styles.checkbox}>
          <button
            className={`${styles.btnXX} ${
              type === "scholarships" && styles.active
            }`}
            onClick={() => {
              setType("scholarships");
              setnameSearchQuery("");
              setCountrySearchQuery("");
            }}
          >
            Scholarships
          </button>
        </div>
      </div>

      {loading && <Loader />}

      {!loading && (
        <ol>
          {filteredData?.map((d) => (
            <AppCard
              key={d.scholarshipid}
              id={d.scholarshipid}
              type={type}
              title={d.scholarshiptitle}
              country={d.country}
              city={d.city}
              jobdescription={d.description}
              requiredskills={d.requiredskills}
              fundingpercentage={d.fundingpercentage}
              setLoading={setLoading}
              setData={setFilteredData}
            />
          ))}
        </ol>
      )}
    </div>
  );
}
