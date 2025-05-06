import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordBox, setShowPasswordBox] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: 'Nanthu',
    email: 'nanthu@gmail.com',
    joinedOn: '2022-03-25',
    address: '123 Main St, Hosur, India',
    phone: '1234567890',
    department: 'Engineering',
    status: 'Active',
    profileImage: 'https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
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
    setIsEditing((prev) => !prev);
  };

  const togglePasswordBox = () => {
    setShowPasswordBox((prev) => !prev);
  };

  const handleProfileImageChange = () => {
    const newImageUrl = prompt('Enter a new profile image URL:');
    if (newImageUrl) {
      setProfileData((prevData) => ({
        ...prevData,
        profileImage: newImageUrl,
      }));
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
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
              {['fullName', 'email', 'joinedOn', 'address', 'phone', 'department'].map((field) => (
                <div className="profile-info" key={field}>
                  <strong>{field.replace(/([A-Z])/g, ' $1')}: </strong>
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
                <select name="status" value={profileData.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <p className="profile-info"><strong>Full Name:</strong> {profileData.fullName}</p>
              <p className="profile-info"><strong>Email:</strong> {profileData.email}</p>
              <p className="profile-info"><strong>Joined On:</strong> {profileData.joinedOn}</p>
              <p className="profile-info"><strong>Address:</strong> {profileData.address}</p>
              <p className="profile-info"><strong>Phone:</strong> {profileData.phone}</p>
              <p className="profile-info"><strong>Department:</strong> {profileData.department}</p>
              <p className="profile-info"><strong>Status:</strong> {profileData.status}</p>
            </>
          )}

          <button className="edit-button" onClick={toggleEdit}>
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>

          <button className="change-password-button" onClick={togglePasswordBox}>
            Change Password
          </button>

          {showPasswordBox && (
            <div className="password-box">
              <div>
                <label>Old Password:</label>
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
              <button className="submit-password">Submit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
