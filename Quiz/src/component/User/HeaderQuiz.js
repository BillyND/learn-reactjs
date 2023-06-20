import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function HeaderQuiz() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const navigate = useNavigate();
  const handleCLickHome = () => {
    setShow1(true);
    // navigate("/")
  };
  const handleCLickUser = () => {
    setShow2(true);
    // navigate("/")
  };
  return (
    <div className="headerQuiz">
      <>
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Back to Home Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure back to home page?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Allow
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Back to User Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure back to user page?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                navigate("/user");
              }}
            >
              Allow
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <Breadcrumb className="header-quiz">
        <Breadcrumb.Item onClick={() => handleCLickHome()}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => handleCLickUser()}>
          User
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default HeaderQuiz;
