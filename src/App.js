// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import CitizenDashboard from "./components/CitizenDashboard";
import OfficialDashboard from "./components/OfficialDashboard";
import NGODashboard from "./components/NGODashboard";
import AvailableSchemes from "./components/AvailableSchemes";
import JobsAvailable from "./components/JobsAvailable";
import AgriculturalConnect from "./components/AgriculturalConnect";
import Projects from "./components/Projects";
import CrowdFunding from "./components/CrowdFunding";
import PendingApplications from "./components/PendingApplications";
import ProjectManagement from "./components/ProjectManagement";
import SchemeAdministration from "./components/SchemeAdministration";
import Collaboration from "./components/Collaboration";
import NGOCollaboration from "./components/NGOCollaboration";
import Programs from "./components/Programs";
import Chatbot from "./components/Chatbot";
import JobManagement from "./components/JobManagement";

const AppContent = () => {
  const location = useLocation();
  const showChatbot = location.pathname !== "/";

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard/citizen" element={<CitizenDashboard />} />
        <Route path="/dashboard/official" element={<OfficialDashboard />} />
        <Route path="/dashboard/ngo" element={<NGODashboard />} />
        <Route path="/schemes" element={<AvailableSchemes />} />
        <Route path="/jobs" element={<JobsAvailable />} />
        <Route path="/agriculture" element={<AgriculturalConnect />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/crowdfunding" element={<CrowdFunding />} />
        <Route path="/applications" element={<PendingApplications />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/scheme-admin" element={<SchemeAdministration />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/ngo-collaboration" element={<NGOCollaboration />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/job-management" element={<JobManagement />} />
      </Routes>
      {showChatbot && <Chatbot />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
