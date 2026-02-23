import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { StudioPage } from './pages/StudioPage';

import { LibraryPage } from './pages/LibraryPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/settings" element={<div className="pt-32 text-center">Settings Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}
