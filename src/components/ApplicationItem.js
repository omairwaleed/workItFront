import styles from "../navigation/screens/myapps.module.css";

const ApplicationItem = ({
  // jobid,
  // skills,
  applydate,
  status,
  type = "On site",

  jobtitle,
  companyname,
  country,
  city,
  avgReplyTime = 3,
}) => {
  return (
    <li>
      <h3>{jobtitle}</h3>
      <div className={styles.content}>
        <span className={styles.content_body}>{companyname}</span>
        <span className={styles.content_body}>
          {city && city + ","} {country} {type ? `(${type})` : null}
        </span>
        <span className={styles.content_body}>
          Applicant review time is typically {avgReplyTime} days
        </span>
        <span className={styles.content_body}>
          <div
            className={
              status === "Accepted"
                ? styles.statusaccepted
                : status === "Rejected"
                ? styles.statusnotaccepted
                : styles.statuspending
            }
          >
            {status}
          </div>
        </span>
        <p className={styles.applydate}>{applydate?.slice(0, 10)}</p>
      </div>
    </li>
  );
};
export default ApplicationItem;
