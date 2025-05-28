import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import NotFound from "./pages/NotFound"; 
const Home = lazy(() => import("./pages/Home"));
const TextAnalysis = lazy(() => import("./pages/TextAnalysis"));
const VoiceAnalysis = lazy(() => import("./pages/VoiceAnalysis"));
const FaceAnalysis = lazy(() => import("./pages/FaceAnalysis"));
const SocialAnalysis = lazy(() => import("./pages/SocialAnalysis"));
const ChatAnalysis = lazy(() => import("./pages/ChatAnalysis"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const History = lazy(() => import("./pages/History"));
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/text" element={<TextAnalysis />} />
            <Route path="/voice" element={<VoiceAnalysis />} />
            <Route path="/face" element={<FaceAnalysis />} />
            <Route path="/social" element={<SocialAnalysis />} />
            <Route path="/chat" element={<ChatAnalysis />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
