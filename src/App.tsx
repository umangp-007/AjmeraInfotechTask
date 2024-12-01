import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileFormPage from "./pages/ProfileFormPage/ProfileFormPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { ProfileProvider } from "./context/ProfileContext";
import Header from "./components/header/Header";
import ProfileDisplay from "./components/ProfileDisplay/ProfileDisplay";
import { ROUTES } from "./utils/constants";

const App: React.FC = () => {
  return (
    <Router>
      <ProfileProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path={ROUTES.FORM} element={<ProfileFormPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfileDisplay />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </ProfileProvider>
    </Router>
  );
};

export default App;
