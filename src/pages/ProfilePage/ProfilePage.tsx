import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.scss";

interface Profile {
  id: number;
  name: string;
  email: string;
  age?: number;
}

const ProfilePage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/profiles`);
        setProfiles(response.data); 
        localStorage.setItem("profiles", JSON.stringify(response.data));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) setError("No profiles found.");
          else setError("Failed to fetch profiles.");
        }
      }
    };

    fetchProfiles();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this profile?");
    if (confirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/profiles/${id}`);
        setProfiles(profiles.filter(profile => profile.id !== id));
        alert("Profile deleted successfully!");
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

  if (profiles.length === 0) return <p>Loading...</p>;

  return (
    <div className="profile-page container">
      <h1>Profiles</h1>
      <div className="profile-list">
        {profiles.map(profile => (
          <div key={profile.id} className="profile-card">
            <h2>{profile.name}</h2>
            <p>Email: {profile.email}</p>
            {profile.age && <p>Age: {profile.age}</p>}
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/profile-form?id=${profile.id}`)}
            >
              Edit Profile
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete(profile.id)}>
              Delete Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
