import React, { useState } from "react";
import initialUserData from "../data/userData";
import "./Profile.css"

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordBox, setShowPasswordBox] = useState(false);

  const username = localStorage.getItem("username") || "";
  const users = initialUserData.find((user) => user.name === username);
  const matchedUser = users ? users : { id: null };

  const [profileData, setProfileData] = useState({
    fullName: matchedUser.name || "",
    email: matchedUser.email || "",
    joinedOn: matchedUser.date || "",
    address: matchedUser.location || "",
    phone: matchedUser.phone || "",
    department: matchedUser.department || "",
    status: matchedUser.status || "Active",
    profileImage: matchedUser.profilePicture || "",
    github: matchedUser.github || "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      alert("Profile updated successfully!");
      localStorage.setItem("userProfile", JSON.stringify(profileData));
    }
    setIsEditing((prev) => !prev);
  };

  const togglePasswordBox = () => {
    setShowPasswordBox((prev) => !prev);
  };

  const handleProfileImageChange = () => {
    const newImageUrl = prompt("Enter a new profile image URL:");
    if (newImageUrl) {
      setProfileData((prevData) => ({
        ...prevData,
        profileImage: newImageUrl,
      }));
    }
  };

  const handleSubmitPassword = () => {
    if (!passwords.oldPassword || !passwords.newPassword) {
      alert("Please fill in both fields.");
      return;
    }
    alert("Password changed successfully.");
    setPasswords({ oldPassword: "", newPassword: "" });
    setShowPasswordBox(false);
  };

  const fieldLabels = {
    fullName: "Full Name",
    email: "Email",
    joinedOn: "Joined On",
    address: "Address",
    phone: "Phone",
    department: "Department",
    github: "GitHub",
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Profile</h1>
        <div className="profile-left">
          <img
            src={profileData.profileImage}
            alt="Profile"
            className="profile-image"
          />
          <button className="edit-photo-button" onClick={handleProfileImageChange}>
            Edit Photo
          </button>
        </div>

        <div className="profile-right">
          {isEditing ? (
            <>
              {Object.keys(fieldLabels).map((field) => (
                <div className="profile-info" key={field}>
                  <strong>{fieldLabels[field]}:</strong>
                  <input
                    type="text"
                    name={field}
                    value={profileData[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="profile-info">
                <strong>Status:</strong>
                <select
                  name="status"
                  value={profileData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <p className="profile-info">
                <strong>Full Name:</strong> {profileData.fullName}
              </p>
              <p className="profile-info">
                <strong>Email:</strong> {profileData.email}
              </p>
              <p className="profile-info">
                <strong>Joined On:</strong> {profileData.joinedOn}
              </p>
              <p className="profile-info">
                <strong>Address:</strong> {profileData.address}
              </p>
              <p className="profile-info">
                <strong>Phone:</strong> {profileData.phone}
              </p>
              <p className="profile-info">
                <strong>Department:</strong> {profileData.department}
              </p>
              <p className="profile-info">
                <strong>Status:</strong> {profileData.status}
              </p>
              <p className="profile-info">
                <strong>GitHub:</strong>{" "}
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  {profileData.github}
                </a>
              </p>
            </>
          )}

          <button className="edit-button" onClick={toggleEdit}>
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>

          <button className="change-password-button" onClick={togglePasswordBox}>
            Change Password
          </button>

          {showPasswordBox && (
            <div className="password-box">
              <div>
                <label>Old Password: </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div>
                <label>New Password:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <button className="submit-password" onClick={handleSubmitPassword}>
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
