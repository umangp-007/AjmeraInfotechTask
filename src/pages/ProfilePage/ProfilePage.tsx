import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.scss";
import { useProfile } from "../../context/ProfileContext";

const ProfilePage: React.FC = () => {
  const { profile, setProfile } = useProfile();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/profiles`);
        setProfile(response.data);
        localStorage.setItem("profile", JSON.stringify(response.data));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) setError("No profile found.");
          else setError("Failed to fetch profile.");
        }
      }
    };

    if (!profile) fetchProfile();
  }, [profile, setProfile]);

  const handleDelete = async (id: any) => {
    const confirmed = window.confirm("Are you sure you want to delete the profile?");
    if (confirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/profiles/${id}`);
        setProfile(null);
        localStorage.removeItem("profile");
        alert("Profile deleted successfully!");
        navigate("/profile-form");
      } catch (err) {
        alert("Failed to delete profile.");
      }
    }
  };

  if (error) {
    return (
      <div className="profile-page">
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => navigate("/profile-form")}>
          Create Profile
        </button>
      </div>
    );
  }

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-page container">
      <h1>Profile Details</h1>
      <div className="profile-card">
        <h2>{profile.name}</h2>
        <p>Email: {profile.email}</p>
        {profile.age && <p>Age: {profile.age}</p>}
        <button className="btn btn-warning" onClick={() => navigate("/profile-form")}>
          Edit Profile
        </button>
        <button className="btn btn-danger" onClick={()=>handleDelete(profile.id)}>
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
