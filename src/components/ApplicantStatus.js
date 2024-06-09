import Card from "react-bootstrap/Card";
import styles from "./applicantStatus.module.css";
import defaultPP from "../assets/defaultPP.jpeg";
import { Button } from "react-bootstrap";

const ApplicantStatus = ({
  name,
  email,
  mobilenumber,
  city,
  country,
  photo,
  cv,
}) => {
  return (
    <Card>
      <Card.Body>
        <div className={styles.wrapper}>
          <Card.Img src={photo ?? defaultPP} className={styles.img} />

          <div className={styles.info}>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {city}, {country}
            </Card.Subtitle>

            <Card.Link href={`mailto:${email}`} target="_blank">
              {email}
            </Card.Link>
            <Card.Link href={`https://wa.me/${mobilenumber}`} target="_blank">
              {mobilenumber}
            </Card.Link>
          </div>

          <Button
            style={{
              backgroundColor: "#d0dbe8",
              borderColor: "#d0dbe8",
              color: "black",
              fontWeight: "bold",
              marginInlineStart: "auto",
              textTransform: "capitalize",
            }}
            href={cv}
            target="_blank"
          >
            Click to show CV
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
export default ApplicantStatus;
