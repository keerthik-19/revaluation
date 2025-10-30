import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

const Dashboard: React.FC = () => {
  const { userType, project, setUserType } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  // Only redirect if user type is supplier (removed for homeowners)
  React.useEffect(() => {
    if (userType === 'supplier') {
      navigate('/');
    }
  }, [userType, navigate]);

  const mockActiveJobs = [
    { id: '1', clientName: 'John Smith', projectType: 'Kitchen Renovation', status: 'In Progress', deadline: '2024-04-15' },
    { id: '2', clientName: 'Emma Wilson', projectType: 'Bathroom Remodel', status: 'Planning', deadline: '2024-05-01' },
    { id: '3', clientName: 'Robert Davis', projectType: 'Living Room Update', status: 'Materials Ordered', deadline: '2024-04-30' }
  ];

  const handleUserTypeSwitch = (type: string) => {
    setUserType(type as any);
    setActiveTab('overview');
  };

  const renderHomeownerDashboard = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>{t('dashboard.title')}</h1>
        <p>{t('dashboard.subtitle')}</p>
      </div>

      {project ? (
        <div className="project-overview">
          <div className="project-main">
            <div className="project-card">
              <h2>{project.name}</h2>
              <div className="progress-section">
                <div className="progress-label">
                  <span>{t('dashboard.progress')}</span>
                  <span>{project.progress}% {t('dashboard.complete')}</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="budget-section">
                <h3>{t('dashboard.budgetRange')}</h3>
                <p className="budget-amount">{project.budgetRange}</p>
              </div>

              <div className="project-photos">
                <div className="photos-header">
                  <h3>{t('dashboard.progressPhotos')}</h3>
                  <span className="photo-count">{project.photos.length} {t('dashboard.photos')}</span>
                </div>
                {project.photos.length > 0 ? (
                  <div className="photo-grid">
                    {project.photos.map((photo, index) => (
                      <div key={index} className="photo-item">
                        <img 
                          src={photo} 
                          alt={`Progress ${index + 1}`} 
                          className="project-photo"
                        />
                        <div className="photo-overlay">
                          <span className="photo-label">
                            {index === 0 ? t('photos.before') : 
                             index === 1 ? t('photos.demolition') :
                             index === 2 ? t('photos.framing') :
                             `Step ${index + 1}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-photos">
                  <div className="upload-placeholder">
                      <div className="upload-icon">+</div>
                      <p>{t('photos.noPhotos')}</p>
                      <button className="upload-btn">{t('photos.uploadFirst')}</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="team-sidebar">
            <h3>{t('dashboard.yourTeam')}</h3>
            <div className="team-members">
              {project.assignedTeam.contractor && (
                <div className="team-member">
                  <div className="member-info">
                    <h4>{project.assignedTeam.contractor.name}</h4>
                    <p>{t('dashboard.contractor')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-project">
          <h2>{t('dashboard.welcome')}</h2>
          <p>{t('dashboard.getStarted')}</p>
          <button className="cta-button" onClick={() => navigate('/guided-flow')}>
            {t('dashboard.startNewProject')}
          </button>
        </div>
      )}
    </div>
  );

  const renderProfessionalDashboard = () => {
    return (
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>{t('dashboard.contractorDashboard')}</h1>
          <p>{t('dashboard.manageJobs')}</p>
        </div>

        <div className="dashboard-main">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>8</h3>
                  <p>Active Jobs</p>
                </div>
                <div className="stat-card">
                  <h3>$85K</h3>
                  <p>Revenue This Month</p>
                </div>
                <div className="stat-card">
                  <h3>4.9</h3>
                  <p>Average Rating</p>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {mockActiveJobs.map(job => (
                    <div key={job.id} className="activity-item">
                      <div className="activity-info">
                        <h4>{job.projectType}</h4>
                        <p>Client: {job.clientName}</p>
                        <span className="status">{job.status}</span>
                      </div>
                      <div className="activity-date">
                        <p>Due: {job.deadline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>Assemble</h2>
        </div>
        <div className="nav-links">
          {userType === 'homeowner' && (
            <button 
              onClick={() => navigate('/ai-renovation')}
              className="nav-link-btn"
            >
              AI Visualizer
            </button>
          )}
          {userType === 'contractor' && (
            <button 
              onClick={() => navigate('/permits')}
              className="nav-link-btn"
            >
              Permits
            </button>
          )}
          <button 
            onClick={() => navigate('/reminders')}
            className="nav-link-btn"
          >
            Reminders
          </button>
        </div>
        <div className="user-type-switcher">
          <select 
            value={userType} 
            onChange={(e) => handleUserTypeSwitch(e.target.value)}
            className="user-type-select"
          >
            {userType === 'homeowner' && <option value="homeowner">Homeowner</option>}
            <option value="contractor">Contractor</option>
          </select>
        </div>
      </nav>

      {userType === 'homeowner' ? renderHomeownerDashboard() : renderProfessionalDashboard()}
    </div>
  );
};

export default Dashboard;