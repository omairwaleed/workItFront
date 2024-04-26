import UserCard from "./UserCard";
import styles from "../navigation/screens/applicants.module.css";
import Accordion from "react-bootstrap/Accordion";
import ApplicantStatus from "./ApplicantStatus";

const ApplicantsList = ({ applicants, type, id, setAlert }) => {
  const pendingApps = applicants.filter(({ status }) => status === "Pending");
  const acceptedApps = applicants.filter(({ status }) => status === "Accepted");
  const RejectedApps = applicants.filter(({ status }) => status === "Rejected");

  return (
    <>
      <h2>{pendingApps?.length} Applicataints Found!</h2>
      <div className={styles.users}>
        {pendingApps.map((app) => (
          <UserCard
            type={type}
            setAlert={setAlert}
            key={app.name + app.email}
            id={id}
            {...app}
          />
        ))}
      </div>

      <Accordion defaultActiveKey="0" className={styles.accordion}>
        {acceptedApps.length > 0 && (
          <Accordion.Item eventKey="1" className={styles.accordionItemAccept}>
            <Accordion.Header>Accepted Applicataints</Accordion.Header>
            {acceptedApps.map((app) => (
              <Accordion.Body key={app.userid}>
                <ApplicantStatus {...app} />
              </Accordion.Body>
            ))}
          </Accordion.Item>
        )}
        {RejectedApps.length > 0 && (
          <Accordion.Item eventKey="2" className={styles.accordionItemReject}>
            <Accordion.Header>Rejected Applicataints</Accordion.Header>
            {RejectedApps.map((app) => (
              <Accordion.Body key={app.userid}>
                <ApplicantStatus {...app} />
              </Accordion.Body>
            ))}
          </Accordion.Item>
        )}
      </Accordion>
    </>
  );
};
export default ApplicantsList;
