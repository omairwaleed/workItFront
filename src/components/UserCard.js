import { Button, Card } from "react-bootstrap";
import styles from "./userCard.module.css";
import defaultPP from "../assets/defaultPP.jpeg";
import { useRevalidator } from "react-router-dom";

const UserCard = ({
  type,
  setAlert,
  id,
  userid,
  name,
  lastname,
  email,
  mobilenumber,
  country,
  city,
  cv,
  photo,
}) => {
  const revalidator = useRevalidator();

  const handleVerdict = async (verdict) => {
    try {
      const res = await fetch(
        `https://work-it-back.vercel.app/api/${type}/applyVerdict/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid, id, verdict }),
        }
      );
      const msg = await res.json();
      setAlert(msg);
      revalidator.revalidate();
    } catch (error) {
      console.log(error);
      setAlert(error.message);
    }
  };

  return (
    <Card style={{ boxShadow: "-1px 3px 18px #80808080" }}>
      <Card.Img variant="top" src={photo ?? defaultPP} className={styles.img} />
      <Card.Body className={styles.body}>
        <Card.Title className={styles.title}>
          {name} {lastname}
        </Card.Title>
        <Card.Text>Contact Email: {email}</Card.Text>
        <Card.Text>Mobile Number: {mobilenumber}</Card.Text>
        <Card.Text>
          Location: {city}, {country}
        </Card.Text>
        <div className={styles.footer}>
          {cv ? (
            <Button
              style={{
                backgroundColor: "#d0dbe8",
                borderColor: "#d0dbe8",
                color: "black",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              href={cv}
              target="_blank"
            >
              Click to show CV
            </Button>
          ) : (
            <Card.Text className="text-danger">No CV</Card.Text>
          )}
          <div className={styles.flex}>
            {/* [x] Accept and Reject functionality */}
            <Button variant="success" onClick={() => handleVerdict(true)}>
              Accept
            </Button>
            <Button variant="danger" onClick={() => handleVerdict(false)}>
              Reject
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export default UserCard;
