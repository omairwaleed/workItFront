// post with  {jobTitle,country,city,salary,jobDescription,companyId,requiredSkills,}
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

  if (!JSON.parse(localStorage?.getItem("user"))?.user?.companyid)
    return redirect("/preview");

  return { countries };
};

export const action = async ({ request, params }) => {
  const id = JSON.parse(localStorage?.getItem("user"))?.user?.companyid;
  const formData = await request.formData();
  formData.append("companyId", id);

   const formDataObj = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value;
  });

  if (!formDataObj.salary) {
    formData.set("salary", "0");
  }
  
  try {
    const res = await fetch("https://work-it-back.vercel.app/api/job/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    return redirect(`/companyview?type=jobs`);
  } catch (error) {
    console.log(error.message);
  }

  return null;
};

const AddJobScreen = () => {
  const { countries } = useLoaderData();
  const [cities, setCities] = useState([{}]);
  const [country, setCountry] = useState("Afghanistan");
  const [city, setCity] = useState("Herat");

  console.log("add job");

  useEffect(() => {
    const refrechCities = async (country) => {
      const newCities = await getAllCitiesInCountry(country);
      setCities(newCities);
      setCity(newCities[0]?.value);
    };

    refrechCities(country);
  }, [country]);

  return (
    <main className={styles.addPage}>
      <div className="container">
        <h1>Add New Job</h1>

        <Form method="post">
          <div>
            <label htmlFor="jobTitle">Title:</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              placeholder="Job Title"
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
            />
          </div>

          <div>
            <label htmlFor="jobDescription">Description:</label>
            <textarea
              type="text"
              id="jobDescription"
              name="jobDescription"
              placeholder="Job Description"
              required
              maxLength={250}
            />
          </div>

          <div>
            <label htmlFor="requiredSkills">Required Skills:</label>
            <input
              type="text"
              id="requiredSkills"
              placeholder="Required Skills"
              name="requiredSkills"
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
            Create Job
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
export default AddJobScreen;
