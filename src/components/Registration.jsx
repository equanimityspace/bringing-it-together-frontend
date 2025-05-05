import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../app/mainSlice";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";

import InfoModal from "./Modal";

export default function Register() {
  const navigate = useNavigate();

  const [register, status] = useRegisterMutation();

  // Modal logic
  const [response, setResponse] = useState();
  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  // stores data from login form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // store form data as it is typed
  const update = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // submit login request
  const submit = async (e) => {
    try {
      e.preventDefault();
      const response = await register(formData);
      setResponse(response);

      // on successful login, return home
      if (response.error) {
        openModal();
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center vh-80">
      {show ? (
        <InfoModal
          show={show}
          hide={closeModal}
          heading="Error"
          body={response?.error.data}
        />
      ) : (
        <></>
      )}
      <Card className="w-50 mt-5">
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/register">
            <Nav.Item>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={update}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={update}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="johndoe@email.com"
                onChange={update}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={update}
              />
            </Form.Group>
            {!status?.isLoading ? (
              <Button variant="primary" type="submit">
                Submit
              </Button>
            ) : (
              <Button variant="primary" type="submit" disabled>
                Loading...
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
