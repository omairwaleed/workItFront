import { Button, Card } from "react-bootstrap";
import styles from "./userCard.module.css";
import defaultPP from "../assets/defaultPP.jpeg";
import { useRevalidator } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { MantineProvider, Button as mantainButton, Modal, Text, Group, Title, Divider } from '@mantine/core';
import '@mantine/core/styles.css';

const UserCard = ({ type, setAlert, id, userid, name, lastname, email, mobilenumber, country, city, cv, photo, prefjoblocation, yearsofexp, formattedavailabilitystart, englishlevel, concatinatedexpectedsalary, }) => {

  const [opened, { open, close }] = useDisclosure(false);

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
            <MantineProvider theme={{ colorScheme: 'light' }}>
              <div style={{ padding: '10px', paddingLeft: '42px'}}>
                <Modal
                  opened={opened}
                  onClose={close}
                  withCloseButton
                  title="Applicant Details"
                  centered
                  styles={{
                    modal: { backgroundColor: '#f8f9fa', borderRadius: '10px' },
                    title: { fontWeight: 'bold', fontSize: '20px' },
                  }}
                >
                  <Group direction="row" spacing="sm" style={{ padding: '20px' }}>
                    <Text><strong>English Level:</strong> {englishlevel}</Text>
                    <Text><strong>Years of Experience:</strong> {yearsofexp}</Text>
                    <Text><strong>Expected Salary:</strong> ${concatinatedexpectedsalary}</Text>
                    <Text><strong>Availability to Start:</strong> {formattedavailabilitystart}</Text>
                    <Text><strong>Preferred Job Location:</strong> {prefjoblocation}</Text>
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
                  </Group>
                </Modal>

                <Button onClick={open} style={{ backgroundColor: '#007bff', color: '#fff' }}>
                  View Details
                </Button>
              </div>
            </MantineProvider>

          ) : (
            <Card.Text className="text-danger">No CV</Card.Text>
          )}
          
          <div style={{ paddingLeft: '22px'}}>
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

        </div>
      </Card.Body>
    </Card>
  );
};
export default UserCard;
