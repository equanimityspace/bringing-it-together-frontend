import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../app/mainSlice";
import { useState } from "react";

import InfoModal from "./Modal";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";

export default function Login() {
  const navigate = useNavigate();
  const [login, status] = useLoginMutation();

  // Modal logic
  const [response, setResponse] = useState();
  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  // stores data from login form
  const [formData, setFormData] = useState({
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
      const response = await login(formData);
      setResponse(response);

      // on successful login, return home
      if (response?.data) {
        navigate("/");
      } else {
        openModal();
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
          body={response?.error.data.message}
        />
      ) : (
        <></>
      )}
      <Card className="w-50 mt-5">
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/login">
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
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
