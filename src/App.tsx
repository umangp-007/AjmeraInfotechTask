// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ProfileFormPage from "./pages/ProfileFormPage";
// import ProfilePage from "./pages/ProfilePage";
// import NotFoundPage from "./pages/NotFoundPage";
// import { ProfileProvider } from "./context/ProfileContext";
// import Header from "./components/header/Header";

// const App: React.FC = () => {
//   return (
//     <ProfileProvider>
//       <Header />
//       <Router>
//         <Routes>
//           <Route path="/" element={<Navigate to="/profile-form" />} />
//           <Route path="/profile-form" element={<ProfileFormPage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </Router>
//     </ProfileProvider>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileFormPage from "./pages/ProfileFormPage/ProfileFormPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { ProfileProvider } from "./context/ProfileContext";
import Header from "./components/header/Header";
import ProfileDisplay from "./components/ProfileDisplay/ProfileDisplay";

const App: React.FC = () => {
  return (
    <Router>
      <ProfileProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/profile-form" element={<ProfileFormPage />} />
          <Route path="/profiles" element={<ProfileDisplay />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProfileProvider>
    </Router>
  );
};

export default App;
