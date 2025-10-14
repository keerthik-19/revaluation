import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import type { User, Project } from '../types';

const GuidedFlow: React.FC = () => {
  const navigate = useNavigate();
  const { setProject, setUserType } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState<User | null>(null);
  const [selectedContractor, setSelectedContractor] = useState<User | null>(null);

  const mockAgents: User[] = [
    {
      id: '1',
      name: 'Keerthi Kumar',
      email: 'Keerthi@example.com',
      type: 'agent',
      rating: 4.9,
      specialty: 'Luxury Renovations'
    },
    {
      id: '2',
      name: 'Ryan Anderson',
      email: 'Ryan@example.com',
      type: 'agent',
      rating: 4.8,
      specialty: 'Modern Home Design'
    }
  ];

  const mockContractors: User[] = [
    {
      id: '3',
      name: 'David Rodriguez',
      email: 'david@example.com',
      type: 'contractor',
      specialty: 'Kitchen & Bathroom',
      verified: true
    },
    {
      id: '4',
      name: 'Lisa Thompson',
      email: 'lisa@example.com',
      type: 'contractor',
      specialty: 'Structural Work',
      verified: true
    }
  ];

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the flow and redirect to dashboard
      completeFlow();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeFlow();
  };

  const completeFlow = () => {
    // Set user as homeowner
    setUserType('homeowner');
    
    // Create a mock project
    const newProject: Project = {
      id: '1',
      name: 'Kitchen Renovation',
      progress: 15,
      budgetRange: '$25,000 - $35,000',
      photos: [],
      assignedTeam: {
        agent: selectedAgent || undefined,
        contractor: selectedContractor || undefined,
      }
    };
    
    setProject(newProject);
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>Meet Your Agent</h2>
              <p>Choose an agent who specializes in your type of project</p>
            </div>
            <div className="enhanced-profile-cards">
              {mockAgents.map((agent) => (
                <div 
                  key={agent.id} 
                  className={`enhanced-profile-card ${selectedAgent?.id === agent.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="profile-header">
                    <div className="profile-badge">
                      <span className="badge-text">Top Agent</span>
                    </div>
                  </div>
                  <div className="profile-details">
                    <h3 className="profile-name">{agent.name}</h3>
                    <div className="rating-enhanced">
                      <div className="stars-large">
                        {'★'.repeat(Math.floor(agent.rating || 0))}
                        {'☆'.repeat(5 - Math.floor(agent.rating || 0))}
                      </div>
                      <span className="rating-text">{agent.rating} • 127 reviews</span>
                    </div>
                    <p className="specialty-enhanced">{agent.specialty}</p>
                    <div className="profile-stats">
                      <div className="stat">
                        <span className="stat-number">15+</span>
                        <span className="stat-label">Years Experience</span>
                      </div>
                      <div className="stat">
                        <span className="stat-number">$2.5M+</span>
                        <span className="stat-label">Projects Completed</span>
                      </div>
                    </div>
                  </div>
                  <div className="selection-indicator">
                    {selectedAgent?.id === agent.id && (
                      <div className="selected-checkmark">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>Choose Your Contractor</h2>
              <p>Select a verified contractor for your renovation</p>
            </div>
            <div className="enhanced-profile-cards">
              {mockContractors.map((contractor) => (
                <div 
                  key={contractor.id} 
                  className={`enhanced-profile-card ${selectedContractor?.id === contractor.id ? 'selected' : ''}`}
                  onClick={() => setSelectedContractor(contractor)}
                >
                  <div className="profile-header">
                    <div className="profile-badge verified">
                      <span className="badge-text">Verified</span>
                    </div>
                  </div>
                  <div className="profile-details">
                    <h3 className="profile-name">{contractor.name}</h3>
                    <div className="contractor-specialties">
                      <span className="specialty-tag">{contractor.specialty}</span>
                    </div>
                    <div className="profile-stats">
                      <div className="stat">
                        <span className="stat-number">50+</span>
                        <span className="stat-label">Projects</span>
                      </div>
                      <div className="stat">
                        <span className="stat-number">4.8★</span>
                        <span className="stat-label">Rating</span>
                      </div>
                    </div>
                    <div className="contractor-highlights">
                      <span className="highlight">Licensed & Insured</span>
                      <span className="highlight">5-Year Warranty</span>
                    </div>
                  </div>
                  <div className="selection-indicator">
                    {selectedContractor?.id === contractor.id && (
                      <div className="selected-checkmark">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="step-content scheduling">
            <div className="step-header">
              <h2>Schedule Your Consultation</h2>
              <p>Book a time to discuss your project with your team</p>
            </div>
            <div className="scheduling-container">
              <div className="calendar-section">
                <div className="calendar-enhanced">
                  <div className="calendar-nav">
                    <button className="nav-btn">‹</button>
                    <h3 className="month-title">March 2024</h3>
                    <button className="nav-btn">›</button>
                  </div>
                  <div className="calendar-grid-enhanced">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="day-header">{day}</div>
                    ))}
                    {Array.from({length: 42}, (_, i) => {
                      const dayNumber = i - 6;
                      const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
                      const isAvailable = dayNumber > 0 && dayNumber <= 28 && dayNumber % 7 !== 0;
                      return (
                        <div 
                          key={i} 
                          className={`calendar-day-enhanced ${
                            isCurrentMonth ? 'current-month' : 'other-month'
                          } ${
                            isAvailable ? 'available' : 'unavailable'
                          }`}
                        >
                          {isCurrentMonth ? dayNumber : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="time-selection">
                <h4 className="time-title">Available Times</h4>
                <div className="time-slots-enhanced">
                  {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map(time => (
                    <button key={time} className="time-slot-enhanced">
                      <span className="time-text">{time}</span>
                      <span className="duration-text">60 min</span>
                    </button>
                  ))}
                </div>
                <div className="consultation-details">
                  <div className="detail-item">
                    <span className="detail-icon"></span>
                    <span>Meet with your agent & contractor</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon"></span>
                    <span>Review project scope & timeline</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon"></span>
                    <span>Discuss budget & financing options</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="guided-flow">
      <div className="flow-container">
        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
            />
          </div>
          <div className="step-indicators">
            {[0, 1, 2].map((step) => (
              <div 
                key={step} 
                className={`step-indicator ${currentStep >= step ? 'active' : ''}`}
              >
                {step + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="flow-content">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flow-navigation">
          <div className="nav-left">
            {currentStep > 0 && (
              <button className="nav-button secondary" onClick={handleBack}>
                Back
              </button>
            )}
          </div>
          <div className="nav-right">
            {currentStep === 2 && (
              <button className="nav-button secondary" onClick={handleSkip}>
                Skip
              </button>
            )}
            <button className="nav-button primary" onClick={handleNext}>
              {currentStep === 2 ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedFlow;