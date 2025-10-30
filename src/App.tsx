import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { TranslationProvider } from './context/TranslationContext';
import LandingPage from './pages/LandingPage';
import HomeownerPage from './pages/HomeownerPage';
import EstimateResults from './pages/EstimateResults';
import GuidedFlow from './pages/GuidedFlow';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/TestPage';
import PropertySearchPage from './pages/PropertySearchPage';
import Reminders from './pages/Reminders';
import AIRenovation from './pages/AIRenovation';
import Permits from './pages/Permits';
import './App.css';

function App() {
  return (
    <TranslationProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/search" element={<PropertySearchPage />} />
              <Route path="/homeowner" element={<HomeownerPage />} />
              <Route path="/estimate-results" element={<EstimateResults />} />
              <Route path="/guided-flow" element={<GuidedFlow />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reminders" element={<Reminders />} />
              <Route path="/ai-renovation" element={<AIRenovation />} />
              <Route path="/permits" element={<Permits />} />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </TranslationProvider>
  );
}

export default App;
