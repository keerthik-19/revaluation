import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { TranslationProvider } from './context/TranslationContext';
import { LanguageProvider } from './context/LanguageContext';
import GeneralLanding from './pages/GeneralLanding';
import RoleSelectionNew from './pages/RoleSelectionNew';
import EnhancedHomeownerDashboard from './pages/EnhancedHomeownerDashboard';
import ContractorDashboard from './pages/ContractorDashboard';
import ContractorAuth from './pages/ContractorAuth';
import Permits from './pages/Permits';
import Tasks from './pages/Tasks';
import Revenue from './pages/Revenue';
import Calendar from './pages/Calendar';
import ContractorPermitsTracking from './pages/ContractorPermitsTracking';
import ClientManagement from './pages/ClientManagement';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <TranslationProvider>
        <UserProvider>
          <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<GeneralLanding />} />
              <Route path="/select-role" element={<RoleSelectionNew />} />
              <Route path="/contractor/auth" element={<ContractorAuth />} />
              <Route path="/contractor/dashboard" element={<ContractorDashboard />} />
              <Route path="/contractor/clients" element={<ClientManagement />} />
              <Route path="/contractor/permits" element={<Permits />} />
              <Route path="/contractor/permits-tracking" element={<ContractorPermitsTracking />} />
              <Route path="/contractor/tasks" element={<Tasks />} />
              <Route path="/contractor/revenue" element={<Revenue />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/homeowner/dashboard" element={<EnhancedHomeownerDashboard />} />
            </Routes>
          </div>
      </Router>
    </UserProvider>
  </TranslationProvider>
    </LanguageProvider>
  );
}

export default App;
