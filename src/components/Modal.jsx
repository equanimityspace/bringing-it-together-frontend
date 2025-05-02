import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function InfoModal({ show, hide, heading, body }) {
  return (
    <>
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
