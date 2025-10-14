import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

const Dashboard: React.FC = () => {
  const { userType, project, setUserType } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for different user types
  const mockClients: User[] = [
    { id: '1', name: 'John Smith', email: 'john@example.com', type: 'homeowner' },
    { id: '2', name: 'Emma Wilson', email: 'emma@example.com', type: 'homeowner' },
    { id: '3', name: 'Robert Davis', email: 'robert@example.com', type: 'homeowner' }
  ];

  const mockContractors: User[] = [
    { id: '4', name: 'David Rodriguez', email: 'david@example.com', type: 'contractor', specialty: 'Kitchen & Bathroom', verified: true },
    { id: '5', name: 'Lisa Thompson', email: 'lisa@example.com', type: 'contractor', specialty: 'Structural Work', verified: true }
  ];

  const mockSuppliers: User[] = [
    { id: '6', name: 'BuildMart Supply', email: 'info@buildmart.com', type: 'supplier', specialty: 'Building Materials' },
    { id: '7', name: 'Premium Fixtures', email: 'sales@premiumfixtures.com', type: 'supplier', specialty: 'Luxury Fixtures' }
  ];

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
        <h1>Your Project Dashboard</h1>
        <p>Track your renovation progress and connect with your team</p>
      </div>

      {project ? (
        <div className="project-overview">
          <div className="project-main">
            <div className="project-card">
              <h2>{project.name}</h2>
              <div className="progress-section">
                <div className="progress-label">
                  <span>Progress</span>
                  <span>{project.progress}% Complete</span>
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
                <h3>Budget Range</h3>
                <p className="budget-amount">{project.budgetRange}</p>
              </div>

              {project.photos.length > 0 && (
                <div className="project-photos">
                  <h3>Project Photos</h3>
                  <div className="photo-grid">
                    {project.photos.map((photo, index) => (
                      <img 
                        key={index} 
                        src={photo} 
                        alt={`Project ${index + 1}`} 
                        className="project-photo"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="team-sidebar">
            <h3>Your Team</h3>
            <div className="team-members">
              {project.assignedTeam.agent && (
                <div className="team-member">
                  <div className="member-info">
                    <h4>{project.assignedTeam.agent.name}</h4>
                    <p>Agent</p>
                  </div>
                </div>
              )}
              {project.assignedTeam.contractor && (
                <div className="team-member">
                  <div className="member-info">
                    <h4>{project.assignedTeam.contractor.name}</h4>
                    <p>Contractor</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="no-project">
          <h2>Welcome to Assemble!</h2>
          <p>Get started by creating your first project</p>
          <button className="cta-button" onClick={() => navigate('/guided-flow')}>
            Start New Project
          </button>
        </div>
      )}
    </div>
  );

  const renderProfessionalDashboard = () => {
    const isAgent = userType === 'agent';
    const isContractor = userType === 'contractor';

    return (
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>{userType === 'agent' ? 'Agent' : userType === 'contractor' ? 'Contractor' : 'Supplier'} Dashboard</h1>
          <p>Manage your {isAgent ? 'clients and projects' : isContractor ? 'active jobs' : 'deliveries and orders'}</p>
        </div>

        {isAgent && (
          <div className="dashboard-tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'clients' ? 'active' : ''}`}
              onClick={() => setActiveTab('clients')}
            >
              Clients
            </button>
            <button 
              className={`tab ${activeTab === 'contractors' ? 'active' : ''}`}
              onClick={() => setActiveTab('contractors')}
            >
              Contractors
            </button>
            <button 
              className={`tab ${activeTab === 'suppliers' ? 'active' : ''}`}
              onClick={() => setActiveTab('suppliers')}
            >
              Suppliers
            </button>
          </div>
        )}

        <div className="dashboard-main">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>{isAgent ? '12' : isContractor ? '8' : '15'}</h3>
                  <p>{isAgent ? 'Active Clients' : isContractor ? 'Active Jobs' : 'Pending Orders'}</p>
                </div>
                <div className="stat-card">
                  <h3>{isAgent ? '$450K' : isContractor ? '$85K' : '$125K'}</h3>
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

          {activeTab === 'clients' && (
            <div className="clients-section">
              <h3>Your Clients</h3>
              <div className="clients-grid">
                {mockClients.map(client => (
                  <div key={client.id} className="client-card">
                    <div className="client-info">
                      <h4>{client.name}</h4>
                      <p>{client.email}</p>
                    </div>
                    <button className="contact-button">Contact</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contractors' && (
            <div className="contractors-section">
              <h3>Your Network</h3>
              <div className="contractors-grid">
                {mockContractors.map(contractor => (
                  <div key={contractor.id} className="contractor-card">
                    <div className="contractor-info">
                      <h4>{contractor.name}</h4>
                      <p>{contractor.specialty}</p>
                      {contractor.verified && <span className="verified">✓ Verified</span>}
                    </div>
                    <button className="contact-button">Message</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'suppliers' && (
            <div className="suppliers-section">
              <h3>Supplier Network</h3>
              <div className="suppliers-grid">
                {mockSuppliers.map(supplier => (
                  <div key={supplier.id} className="supplier-card">
                    <div className="supplier-info">
                      <h4>{supplier.name}</h4>
                      <p>{supplier.specialty}</p>
                    </div>
                    <button className="contact-button">Order</button>
                  </div>
                ))}
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
        <div className="user-type-switcher">
          <select 
            value={userType} 
            onChange={(e) => handleUserTypeSwitch(e.target.value)}
            className="user-type-select"
          >
            <option value="homeowner">Homeowner</option>
            <option value="agent">Agent</option>
            <option value="contractor">Contractor</option>
            <option value="supplier">Supplier</option>
          </select>
        </div>
      </nav>

      {userType === 'homeowner' ? renderHomeownerDashboard() : renderProfessionalDashboard()}
    </div>
  );
};

export default Dashboard;