import { Link } from "react-router-dom";
import styles from "../navigation/screens/collegeview.module.css";
import { MdDelete } from "react-icons/md";
const AppCard = ({
  id,
  type,
  title,
  country,
  city,
  jobdescription,
  requiredskills,
  fundingpercentage,
  setLoading,
  setData,
}) => {
  console.log(id, type);
  const deleteItem = async () => {
    setLoading(true);
    if (type === "scholarships") type = "scholarship";
    else if (type === "internships") type = "internship";
    else type = "job";
    try {
      const response = await fetch(
        `https://work-it-back.vercel.app/api/${type}/${id}`,
        {
          method: "Delete",
        }
      );
      if (!response.ok) {
        throw new Error();
      } else {
        const filter =
          type === "scholarship"
            ? "scholarshipid"
            : type === "internship"
            ? "internshipid"
            : "jobid";
        setData((prev) => prev.filter((el) => el[filter] !== id));
      }
    } catch (error) {
      alert(`error while deleting  ${type} please try agaian`);
    }
    setLoading(false);
  };
  return (
    <li>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h3>{title}</h3>

        <MdDelete
          onClick={() => {
            if (
              window.confirm(
                `are you sure to delete this ${
                  type === "scholarships"
                    ? "scholarship"
                    : type === "internships"
                    ? "internship"
                    : type
                } `
              )
            ) {
              deleteItem();
            }
          }}
          size={30}
          color="red"
          style={{ cursor: "pointer" }}
        />
      </div>

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

      <Link
        to={`/applicants/${type.slice(0, -1)}/${id}`}
        state={{
          id,
          title,
          type: type.slice(0, -1),
          skills: requiredskills,
        }}
        className={styles.seeAppsButton}
      >
        see Applicants
      </Link>
    </li>
  );
};
export default AppCard;
