import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from "../app/mainSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function SingleUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user, error, isLoading, refetch } = useGetUserQuery(id);
  const [updateUserProfile, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserProfileMutation();

  const [editMode, setEditMode] = useState(true);
  const [showPasswordField, setShowPasswordField] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }).unwrap();
      setEditMode(false);
      setShowPasswordField(false);
      refetch();

      // navigate home on success
      navigate("/");
    } catch {}
  };

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error loading user. Please try again later.</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridfirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="firstName" placeholder={user.firstName} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridlastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="lastName" placeholder={user.lastName} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridemail">
        <Form.Label>email</Form.Label>
        <Form.Control placeholder={user.email} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGr">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder={user.password} />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridmpg">
          <Form.Label>Miles per gallon</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridgasTank">
          <Form.Label>How many gallons of gas</Form.Label>
        </Form.Group>
        {/* 
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group> */}
      </Row>

      {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
