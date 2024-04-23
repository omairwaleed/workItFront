import Modal from "react-bootstrap/Modal";

function Dialog({ show, title, body, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
}

export default Dialog;
