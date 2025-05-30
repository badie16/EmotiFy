"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

// Pages principales
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"

// Pages de catégories
import CoreLanding from "./pages/CoreLanding"
import BusinessLanding from "./pages/BusinessLanding"
import HealthyLanding from "./pages/HealthyLanding"

// Pages Core
import TextAnalysis from "./pages/TextAnalysis"
import VoiceAnalysis from "./pages/VoiceAnalysis"
import FaceAnalysis from "./pages/FaceAnalysis"
import ChatAnalysis from "./pages/ChatAnalysis"

// Pages Business
import BusinessDashboard from "./pages/BusinessDashboard"
import ClientAnalysis from "./pages/ClientAnalysis"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import SocialAnalysis from "./pages/SocialAnalysis"

// Pages Healthy
import MoodJournal from "./pages/MoodJournal"
import RelaxationSpace from "./pages/RelaxationSpace"
import HealthyDashboard from "./pages/HealthyDashboard"

// Autres pages
import Dashboard from "./pages/Dashboard"
import History from "./pages/History"
// import Profile from "./pages/Profile"

function App() {
  return (

    <div >
      <Header />
      <main>
        <Routes>
          {/* Pages principales */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Pages de catégories */}
          <Route path="/core" element={<CoreLanding />} />
          <Route path="/business" element={<BusinessLanding />} />
          <Route path="/healthy" element={<HealthyLanding />} />

          {/* Pages Core */}
          <Route path="/text" element={<TextAnalysis />} />
          <Route path="/voice" element={<VoiceAnalysis />} />
          <Route path="/face" element={<FaceAnalysis />} />
          <Route path="/chat" element={<ChatAnalysis />} />

          {/* Pages Business */}
          <Route path="/business/dashboard" element={<BusinessDashboard />} />
          <Route path="/business/client-analysis" element={<ClientAnalysis />} />
          <Route path="/business/employees" element={<EmployeeDashboard />} />
          <Route path="/social" element={<SocialAnalysis />} />

          {/* Pages Healthy */}
          <Route path="/healthy/mood-journal" element={<MoodJournal />} />
          <Route path="/healthy/relaxation" element={<RelaxationSpace />} />
          <Route path="/healthy/dashboard" element={<HealthyDashboard />} />

          {/* Autres pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          {/* <Route path="/profile" element={<Profile />} /> */}

          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>

  )
}

export default App
