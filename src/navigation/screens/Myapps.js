import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import styles from "./myapps.module.css";

export default function Myapps() {
  const user = JSON.parse(localStorage?.getItem("user"))?.userType;

  if (user !== "user") return <Navigate to="/preview" />;
  return (
    <body className={styles.body}>
      <div className={styles.parent}>
        <Navbar />

        <div className={styles.box}>
          <div className={styles.search}>
            <input type="text" placeholder="Search By Name"></input>
            <div>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className={styles.location}>
            <span>Location</span>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <div className={styles.category}>
            <span>Category</span>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <div className={styles.category}>
            <span>Status</span>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </div>

        <ol>
          <li>
            <h3>Senior Web Developer</h3>
            <div className={styles.content}>
              <span className={styles.content_body}>Scarab Agency</span>
              <span className={styles.content_body}>
                Alexandria, Egypt (Remotely)
              </span>
              <span className={styles.content_body}>
                Applicant review time is typically 4 days
              </span>
              <span className={styles.content_body}>
                <div className={styles.statuspending}>Pending</div>
              </span>
            </div>
          </li>
          <li>
            <h3>Senior Web Developer</h3>
            <div className={styles.content}>
              <span className={styles.content_body}>Scarab Agency</span>
              <span className={styles.content_body}>
                Alexandria, Egypt (Remotely)
              </span>
              <span className={styles.content_body}>
                Applicant review time is typically 4 days
              </span>
              <span className={styles.content_body}>
                <div className={styles.statusaccepted}>Accepted</div>div
              </span>
            </div>
          </li>
          <li>
            <h3>Senior Web Developer</h3>
            <div className={styles.content}>
              <span className={styles.content_body}>Scarab Agency</span>
              <span className={styles.content_body}>
                Alexandria, Egypt (Remotely)
              </span>
              <span className={styles.content_body}>
                Applicant review time is typically 4 days
              </span>
              <span className={styles.content_body}>
                <div className={styles.statusaccepted}>Accepted</div>
              </span>
            </div>
          </li>
          <li>
            <h3>Senior Web Developer</h3>
            <div className={styles.content}>
              <span className={styles.content_body}>Scarab Agency</span>
              <span className={styles.content_body}>
                Alexandria, Egypt (Remotely)
              </span>
              <span className={styles.content_body}>
                Applicant review time is typically 4 days
              </span>
              <span className={styles.content_body}>
                <div className={styles.statusnotaccepted}>Not Accepted</div>
              </span>
            </div>
          </li>
          <li>
            <h3>Senior Web Developer</h3>
            <div className={styles.content}>
              <span className={styles.content_body}>Scarab Agency</span>
              <span className={styles.content_body}>
                Alexandria, Egypt (Remotely)
              </span>
              <span className={styles.content_body}>
                Applicant review time is typically 4 days
              </span>
              <span className={styles.content_body}>
                <div className={styles.statusnotaccepted}>Not Accepted</div>
              </span>
            </div>
          </li>
        </ol>
      </div>
    </body>
  );
}
