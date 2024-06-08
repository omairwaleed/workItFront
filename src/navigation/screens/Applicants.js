import { redirect, useLoaderData, useLocation } from "react-router-dom";
import styles from "./applicants.module.css";
import { useState } from "react";
import Modal from "../../components/Modal";
import ApplicantsList from "../../components/ApplicantsList";

export const loader = async ({ request, params }) => {
  const token = JSON.parse(localStorage?.getItem("user"))?.token;
  if (!token) return redirect("/login");

  try {
    const res = await fetch(`/api/${params.type}/${params.id}/getApplicaints/`);

    const json = await res.json();

    return json;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Applicants = () => {
  const [alert, setAlert] = useState(false);
  const {
    state: { id, type, title, skills },
  } = useLocation();
  const applicants = useLoaderData();
  console.log(applicants);
  console.log(id, type, title, skills);

  return (
    <main className={`container ${styles.main}`}>
      <h1>Applicants for {title}</h1>
      <p className={styles.skills}>required skills: {skills}</p>

      <section>
        {applicants === "No Applicataints Found!" ? (
          <h2>No Applicataints Found for this {type}!</h2>
        ) : (
          <ApplicantsList
            applicants={applicants}
            type={type}
            id={id}
            setAlert={setAlert}
          />
        )}
      </section>

      <Modal
        show={alert}
        handleClose={() => setAlert(false)}
        body={alert}
        title={"Application Verdict"}
      />
    </main>
  );
};
export default Applicants;
