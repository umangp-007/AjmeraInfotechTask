import React from "react";
import { useProfile } from "../../context/ProfileContext";

const ProfileDisplay: React.FC = () => {
  const { profile } = useProfile(); // Using the custom hook for type safety

  if (!profile) {
    return <p>No profile found. Please create one.</p>;
  }

  return (
    <div className="profile-display">
      <h2>{profile.name}</h2>
      <p>Email: {profile.email}</p>
      {profile.age && <p>Age: {profile.age}</p>}
    </div>
  );
};

export default ProfileDisplay;
