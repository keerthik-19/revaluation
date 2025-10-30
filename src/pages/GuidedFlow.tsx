import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTranslation } from '../context/TranslationContext';
import type { User, Project } from '../types';

const GuidedFlow: React.FC = () => {
  const navigate = useNavigate();
  const { setProject, setUserType } = useUser();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedContractor, setSelectedContractor] = useState<User | null>(null);
  
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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

  // Calendar utility functions
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateAvailable = (day: number) => {
    const today = new Date();
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    // Only allow future dates and exclude weekends for this demo
    return checkDate >= today && checkDate.getDay() !== 0 && checkDate.getDay() !== 6;
  };

  const handleDateSelect = (day: number) => {
    if (isDateAvailable(day)) {
      const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(selectedDate);
      setSelectedTime(null); // Reset time selection when date changes
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (currentStep < 1) {
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
    
    // Create appointment summary if date and time are selected
    const appointmentDetails = selectedDate && selectedTime 
      ? `Consultation scheduled for ${selectedDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        })} at ${selectedTime}`
      : 'Consultation to be scheduled';
    
    // Create a mock project with progress photos
    const newProject: Project = {
      id: '1',
      name: 'Kitchen Renovation',
      progress: 35,
      budgetRange: '$25,000 - $35,000',
      photos: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=faces', // Before - old kitchen
        'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=300&fit=crop&crop=faces', // Demolition phase
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=faces', // Framing work
      ],
      assignedTeam: {
        contractor: selectedContractor || undefined,
      }
    };
    
    setProject(newProject);
    
    // Log the appointment details for demo purposes
    if (selectedDate && selectedTime) {
      console.log('✅ Appointment scheduled:', appointmentDetails);
    }
    
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>{t('flow.chooseContractor')}</h2>
              <p>{t('flow.selectContractor')}</p>
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
      
      case 1:
        return (
          <div className="step-content scheduling">
            <div className="step-header">
              <h2>{t('flow.scheduleConsultation')}</h2>
              <p>{t('flow.bookTime')}</p>
            </div>
            <div className="scheduling-container">
              <div className="calendar-section">
                <div className="calendar-enhanced">
                  <div className="calendar-nav">
                    <button className="nav-btn" onClick={handlePrevMonth}>‹</button>
                    <h3 className="month-title">{getMonthName(currentDate)}</h3>
                    <button className="nav-btn" onClick={handleNextMonth}>›</button>
                  </div>
                  <div className="calendar-grid-enhanced">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="day-header">{day}</div>
                    ))}
                    {(() => {
                      const daysInMonth = getDaysInMonth(currentDate);
                      const firstDayOfWeek = getFirstDayOfMonth(currentDate);
                      const days = [];
                      
                      // Empty cells for days before month starts
                      for (let i = 0; i < firstDayOfWeek; i++) {
                        days.push(
                          <div key={`empty-${i}`} className="calendar-day-enhanced other-month">
                          </div>
                        );
                      }
                      
                      // Days of the month
                      for (let day = 1; day <= daysInMonth; day++) {
                        const isAvailable = isDateAvailable(day);
                        const isSelected = selectedDate && 
                          selectedDate.getDate() === day && 
                          selectedDate.getMonth() === currentDate.getMonth() &&
                          selectedDate.getFullYear() === currentDate.getFullYear();
                        
                        days.push(
                          <div 
                            key={day}
                            className={`calendar-day-enhanced current-month ${
                              isAvailable ? 'available' : 'unavailable'
                            } ${
                              isSelected ? 'selected' : ''
                            }`}
                            onClick={() => handleDateSelect(day)}
                            style={{ cursor: isAvailable ? 'pointer' : 'not-allowed' }}
                          >
                            {day}
                          </div>
                        );
                      }
                      
                      return days;
                    })()}
                  </div>
                </div>
              </div>
              
              <div className="time-selection">
                <h4 className="time-title">
                  {selectedDate 
                    ? `${t('flow.availableTimes')} for ${selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}` 
                    : t('flow.selectDate')
                  }
                </h4>
                <div className="time-slots-enhanced">
                  {selectedDate ? (
                    ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map(time => (
                      <button 
                        key={time} 
                        className={`time-slot-enhanced ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        <span className="time-text">{time}</span>
                        <span className="duration-text">{t('time.60min')}</span>
                      </button>
                    ))
                  ) : (
                    <div className="no-date-selected">
                      <p>Please select a date first to view available appointment times.</p>
                    </div>
                  )}
                </div>
                <div className="consultation-details">
                  <div className="detail-item">
                    <span className="detail-icon"></span>
                    <span>{t('time.meetTeam')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon"></span>
                    <span>{t('time.reviewScope')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon"></span>
                    <span>{t('time.discussBudget')}</span>
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
              style={{ width: `${((currentStep + 1) / 2) * 100}%` }}
            />
          </div>
          <div className="step-indicators">
            {[0, 1].map((step) => (
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
                {t('flow.back')}
              </button>
            )}
          </div>
          <div className="nav-right">
            {currentStep === 1 && (
              <button className="nav-button secondary" onClick={handleSkip}>
                {t('flow.skip')}
              </button>
            )}
            <button className="nav-button primary" onClick={handleNext}>
              {currentStep === 1 ? t('flow.completeSetup') : t('flow.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedFlow;