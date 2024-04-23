// post with { fundingPercentage, scholarshipTitle, description, universityId }
import { useState } from "react";
import styles from "./addnew.module.css";
import { Form, redirect, Navigate } from "react-router-dom";
import jobSvg from "../../assets/job.svg";

export const action = async ({ request, params }) => {
  const id = JSON.parse(localStorage?.getItem("user"))?.user?.universityid;
  const formData = await request.formData();
  formData.append("universityId", id);
  formData.set(
    "fundingPercentage",
    parseInt(formData.get("fundingPercentage"))
  );

  try {
    const res = await fetch("/api/scholarship/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    return redirect(`/collegeview`);
  } catch (error) {
    console.log(error.message);
  }

  return null;
};

const AddScholarScreen = () => {
  const [fund, setFund] = useState(0);

  if (!JSON.parse(localStorage?.getItem("user"))?.user?.universityid)
    return <Navigate to={"/preview"} />;

  // [x] styles for bigger screens then copy to the rest

  return (
    <main className={styles.addPage}>
      <div className="container">
        <h1>Add New Scholarship</h1>

        <Form method="post">
          <div>
            <label htmlFor="scholarshipTitle">Title:</label>
            <input
              type="text"
              id="scholarshipTitle"
              name="scholarshipTitle"
              placeholder="Scholarship Title"
              required
            />
          </div>

          <div>
            <label htmlFor="fundingPercentage">Funding Amount:</label>
            <div className={styles.fund}>
              <input
                type="range"
                id="fundingPercentage"
                name="fundingPercentage"
                placeholder="Amount of Funding"
                min="0"
                max="100"
                value={fund}
                onChange={(e) => setFund(e.target.value)}
                required
              />
              <span>{fund}%</span>
            </div>
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Scholarship Description"
              required
            />
          </div>

          <button className="my_button" type="submit">
            Create Scholarship
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
export default AddScholarScreen;
