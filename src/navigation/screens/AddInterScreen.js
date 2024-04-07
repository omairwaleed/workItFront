// post with  internshipTitle, country, city, salary, companyId, requiredSkills
import styles from "./addnew.module.css";
import { Form, redirect, useLoaderData, Navigate } from "react-router-dom";
import jobSvg from "../../assets/job.svg";
import { useEffect, useState } from "react";
import {
  getAllCitiesInCountry,
  getAllCountries,
} from "../../utilities/getCountriesAndCities";
import DropDown from "../../components/DropDown";

export const loader = async () => {
  const countries = await getAllCountries();

  return { countries };
};

export const action = async ({ request, params }) => {
  const id = JSON.parse(localStorage?.getItem("user"))?.user?.companyid;
  const formData = await request.formData();
  formData.append("companyId", id);

  try {
    const res = await fetch("/api/internship/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    return redirect(`/companyview?type=internships`);
  } catch (error) {
    console.log(error.message);
  }

  return null;
};

const AddInterScreen = () => {
  const { countries } = useLoaderData();
  const [cities, setCities] = useState([{}]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const refrechCities = async (country) => {
      setCities(await getAllCitiesInCountry(country));
    };

    refrechCities(country);
  }, [country]);

  if (!JSON.parse(localStorage?.getItem("user"))?.user?.companyid)
    return <Navigate to={"/preview"} />;

  return (
    <main className={styles.addPage}>
      <div className="container">
        <h1>Add New Internship</h1>

        <Form method="post">
          <div>
            <label htmlFor="internshipTitle">Title:</label>
            <input
              type="text"
              id="internshipTitle"
              name="internshipTitle"
              placeholder="Internship Title"
              required
            />
          </div>

          <div>
            <label htmlFor="salary">Salary:</label>
            <input
              type="text"
              id="salary"
              name="salary"
              placeholder="Salary"
              required
            />
          </div>

          <div>
            <label htmlFor="requiredSkills">Required Skills:</label>
            <input
              type="text"
              id="requiredSkills"
              name="requiredSkills"
              placeholder="Required Skills"
              required
            />
          </div>

          <div className={styles.address}>
            <span className={styles.text}>Address</span>
            <div className={styles.address_inputs}>
              <DropDown
                data={countries}
                placeholder="Job Location"
                className="text_input"
                state={country}
                setState={setCountry}
                name="country"
              />
              <DropDown
                data={cities}
                placeholder="Job Location"
                className="text_input"
                state={city}
                setState={setCity}
                name="city"
              />
            </div>
          </div>

          <button className="my_button" type="submit">
            Add Scholarship
          </button>
        </Form>

        <img
          src={jobSvg}
          className={styles.jobSvg}
          alt="job portal search illustration"
        />
      </div>
    </main>
  );
};
export default AddInterScreen;
