import React, { useState } from "react";
import { useProfile } from "../../context/ProfileContext";
import { Profile } from "../../types/Profile";
import axios from "axios";
import "./ProfileForm.scss";

const ProfileForm: React.FC = () => {
  const { profile, setProfile } = useProfile();
  const [formData, setFormData] = useState<Profile>(
    profile || { name: "", email: "", age: "" }
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name || formData.name.length < 3) newErrors.name = "Name must be at least 3 characters.";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/profiles`, formData);
      setProfile(response.data);
      localStorage.setItem("profile", JSON.stringify(response.data));
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-control"
        />
        {errors.name && <small className="text-danger">{errors.name}</small>}
      </div>
      <div className="mb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="form-control"
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>
      <div className="mb-3">
        <label htmlFor="age">Age (optional)</label>
        <input
          type="number"
          id="age"
          value={formData.age || ""}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save Profile
      </button>
    </form>
  );
};

export default ProfileForm;
