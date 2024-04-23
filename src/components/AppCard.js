import styles from "../navigation/screens/collegeview.module.css";

const AppCard = ({
  type,
  title,
  country,
  city,
  jobdescription,
  requiredskills,
  fundingpercentage,
}) => {
  return (
    <li>
      <h3>{title}</h3>
      <div className={styles.content}>
        {jobdescription && (
          <span className={styles.content_body}>
            <b>{type.slice(0, 1).toUpperCase() + type.slice(1)} Description:</b>{" "}
            {jobdescription}
          </span>
        )}
        {city && (
          <span className={styles.content_body}>
            <b>Location:</b> {`${city}, ${country}`}
          </span>
        )}
        {type === "scholarships" ? (
          <span className={styles.content_body}>
            <b>Funding:</b> {fundingpercentage}%
          </span>
        ) : (
          <span className={styles.content_body}>
            <b>Skills Needed:</b> {requiredskills}
          </span>
        )}
      </div>
    </li>
  );
};
export default AppCard;
