import React from "react";
import styles from "../navigation/screens/previewStyle.module.css";
import scarab from "../assets/scarab.png";
import Button from "./Button";
import { Link } from "react-router-dom";
const JobCard = ({ data }) => {
  return (
    <div>
      <span className={styles.my_card} style={{ width: "100%" }}>
        <div className="d-flex justify-content-center align-items-center ">
          <img src={scarab} width="78" height="80" alt="" />
        </div>
        <div className={styles.content} style={{ width: "100%" }}>
          <span className={styles.content_title}>{data.jobtitle}</span>
          <span className={styles.content_body}>Scarab Agency</span>
          <span className={styles.content_body}>
            {data.city} , {data.country}
          </span>
          <Link style={{ width: "100%" }} to={"/details"} state={data}>
            <Button
              buttonContent="Show Details"
              className={styles.showMoreButton}
            />
          </Link>

          {/* <span className={styles.content_body}>
            Applicant review time is typically 4 days
          </span> */}
        </div>
      </span>
    </div>
  );
};

export default JobCard;
