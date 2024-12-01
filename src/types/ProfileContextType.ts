import React from "react";
import { Profile } from "./Profile";

export interface ProfileContextType {
    profile: Profile | null;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  }