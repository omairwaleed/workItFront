import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import styles from "./myapps.module.css";
import { Suspense, useEffect, useState } from "react";
import ApplicationItem from "../../components/ApplicationItem";
import { getAllCountries } from "../../utilities/getCountriesAndCities";
import FilterBtns from "../../components/FilterBtns";
import Loader from "../../components/Loader";
// jobTitle, companyName, city, country, status

export const loader = async ({ request, params }) => {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") ?? "job";
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await fetch(
      `https://work-it-back.vercel.app/api/${type}/apply/${user?.user?.userid}`
    );

    const json = await res.json();

    return json;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default function Myapps() {
  const initApps = useLoaderData();
  const [apps, setApps] = useState(initApps);
  const [countries, setCountries] = useState([]);
  const [filteredApps, setFilteredApps] = useState(apps);
  const [namesearchQuery, setnameSearchQuery] = useState("");
  const [countrysearchQuery, setCountrySearchQuery] = useState("");
  const [statusQuery, setStatusQuery] = useState("");
  const [type, setType] = useState("job");

  // console.log(apps);
  // console.log(filteredApps);

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem("user"))?.userType;
    if (user !== "user") return navigate("/preview");

    (async () => {
      setCountries(await getAllCountries());
    })();
  }, []);

  const filterByName = (data) => {
    return data?.filter((d) =>
      d[`${type}title`]?.toLowerCase().includes(namesearchQuery.toLowerCase())
    );
  };

  const filterByCountry = (data) => {
    return data.filter((d) =>
      d?.country?.toLowerCase().includes(countrysearchQuery.toLowerCase())
    );
  };

  const filterByStatus = (data) => {
    return data?.filter((d) =>
      d?.status?.toLowerCase().includes(statusQuery.toLowerCase())
    );
  };

  useEffect(() => {
    if (namesearchQuery) setFilteredApps(filterByName(apps));
    else if (countrysearchQuery) setFilteredApps(filterByCountry(apps));
    else if (statusQuery) setFilteredApps(filterByStatus(apps));
    else setFilteredApps(apps);
  }, [countrysearchQuery, namesearchQuery, statusQuery]);

  useEffect(() => {
    (async () => {
      const id = JSON.parse(localStorage.getItem("user"))?.user?.userid;
      const res = await fetch(
        `https://work-it-back.vercel.app/api/${type}/apply/${id}`
      );

      const json = await res.json();
      setApps(json);
      setFilteredApps(json);
    })();
  }, [type]);

  return (
    <>
      <Navbar />

      <div className={styles.box}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search By Name"
            value={namesearchQuery}
            onChange={(e) => {
              setnameSearchQuery(e.target.value);
              setCountrySearchQuery("");
              setStatusQuery("");
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
              setStatusQuery("");
            }}
          />
          <datalist id="location">
            {countries.map((country) => (
              <option key={country.value} value={country.value} />
            ))}
          </datalist>
        </div>

        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search By Status"
            list="status"
            value={statusQuery}
            onChange={(e) => {
              setStatusQuery(e.target.value);
              setCountrySearchQuery("");
              setnameSearchQuery("");
            }}
          />
          <datalist id="status">
            <option key={"Pending"} value={"Pending"} />
            <option key={"Accepted"} value={"Accepted"} />
            <option key={"Rejected"} value={"Rejected"} />
          </datalist>
          <div>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </div>
      </div>

      <div className={styles.filterBtns}>
        {["job", "internship", "scholarship"].map((n) => (
          <FilterBtns key={n} type={type} setType={setType} name={n} />
        ))}
      </div>

      <ol>
        <Suspense fallback={<Loader />}>
          {filteredApps?.map((app) => (
            <ApplicationItem
              key={app.jobid || app.internshipid || app.scholarshipid}
              applydate={app.applydate}
              skills={app.skills}
              status={app.status}
              jobtitle={
                app.jobtitle || app.internshiptitle || app.scholarshiptitle
              }
              companyname={app.companyname || app.universityname}
              country={app.country}
              city={app.city}
            />
          ))}
        </Suspense>
      </ol>
    </>
  );
}
