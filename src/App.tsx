import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LandingPage from './pages/LandingPage';
import HomeownerPage from './pages/HomeownerPage';
import EstimateResults from './pages/EstimateResults';
import GuidedFlow from './pages/GuidedFlow';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/homeowner" element={<HomeownerPage />} />
            <Route path="/estimate-results" element={<EstimateResults />} />
            <Route path="/guided-flow" element={<GuidedFlow />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
