import Card from "react-bootstrap/Card";
const ApplicantStatus = ({ name, email, mobilenumber, city, country }) => {
  return (
    <Card>
      <Card.Body>
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
      </Card.Body>
    </Card>
  );
};
export default ApplicantStatus;
