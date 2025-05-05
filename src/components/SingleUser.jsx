import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserProfileMutation,
} from "../app/mainSlice";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="single-user">
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            {/* <label>
              <input
                type="checkbox"
                checked={showPasswordField}
                onChange={() => setShowPasswordField((prev) => !prev)}
              />
              Change Password
            </label> */}
            <label>Password: </label>
            {showPasswordField && (
              <input
                type="password"
                placeholder="New Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            )}
          </div>
          {updateError && (
            <p className="error">
              Failed to update: {updateError.data?.message || "Unknown error"}
            </p>
          )}
          <button type="submit" disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => {
              // setEditMode(false);
              // setShowPasswordField(false);
              navigate("/");
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-firstName">{user.firstName}</h5>
            <h5 className="card-lastName">{user.lastName}</h5>
            <h5 className="card-email">{user.email}</h5>
          </div>
        </div>
      )}
    </div>
  );
}
