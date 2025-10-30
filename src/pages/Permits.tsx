import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Permit {
  id: string;
  projectName: string;
  permitType: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  submittedDate: string;
  expiryDate?: string;
  permitNumber?: string;
  address: string;
}

const Permits: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved'>('all');
  const [showNewPermitForm, setShowNewPermitForm] = useState(false);

  const mockPermits: Permit[] = [
    {
      id: '1',
      projectName: 'Kitchen Renovation - Smith Residence',
      permitType: 'Building Permit',
      status: 'approved',
      submittedDate: '2024-10-01',
      expiryDate: '2025-10-01',
      permitNumber: 'BP-2024-1234',
      address: '123 Main St, Boston, MA'
    },
    {
      id: '2',
      projectName: 'Bathroom Remodel - Wilson Home',
      permitType: 'Plumbing Permit',
      status: 'pending',
      submittedDate: '2024-10-20',
      address: '456 Oak Ave, Cambridge, MA'
    },
    {
      id: '3',
      projectName: 'Home Addition - Davis Property',
      permitType: 'Electrical Permit',
      status: 'approved',
      submittedDate: '2024-09-15',
      expiryDate: '2025-09-15',
      permitNumber: 'EP-2024-5678',
      address: '789 Pine Rd, Somerville, MA'
    }
  ];

  const filteredPermits = mockPermits.filter(permit => {
    if (activeTab === 'all') return true;
    return permit.status === activeTab;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved': return 'status-badge approved';
      case 'pending': return 'status-badge pending';
      case 'rejected': return 'status-badge rejected';
      case 'expired': return 'status-badge expired';
      default: return 'status-badge';
    }
  };

  return (
    <div className="permits-page">
      <nav className="page-nav">
        <div className="nav-brand">
          <h2>Assemble</h2>
        </div>
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
      </nav>

      <div className="permits-container">
        <div className="permits-header">
          <div>
            <h1>Permits Management</h1>
            <p>Track and manage construction permits for your projects</p>
          </div>
          <button 
            onClick={() => setShowNewPermitForm(true)}
            className="new-permit-btn"
          >
            + New Permit Application
          </button>
        </div>

        <div className="permits-tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Permits ({mockPermits.length})
          </button>
          <button 
            className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({mockPermits.filter(p => p.status === 'pending').length})
          </button>
          <button 
            className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Approved ({mockPermits.filter(p => p.status === 'approved').length})
          </button>
        </div>

        <div className="permits-list">
          {filteredPermits.map(permit => (
            <div key={permit.id} className="permit-card">
              <div className="permit-main">
                <div className="permit-info">
                  <div className="permit-header-row">
                    <h3>{permit.projectName}</h3>
                    <span className={getStatusBadgeClass(permit.status)}>
                      {permit.status.charAt(0).toUpperCase() + permit.status.slice(1)}
                    </span>
                  </div>
                  <p className="permit-type">{permit.permitType}</p>
                  <p className="permit-address">{permit.address}</p>
                  
                  <div className="permit-dates">
                    <div className="date-item">
                      <span className="date-label">Submitted:</span>
                      <span className="date-value">{permit.submittedDate}</span>
                    </div>
                    {permit.expiryDate && (
                      <div className="date-item">
                        <span className="date-label">Expires:</span>
                        <span className="date-value">{permit.expiryDate}</span>
                      </div>
                    )}
                    {permit.permitNumber && (
                      <div className="date-item">
                        <span className="date-label">Permit #:</span>
                        <span className="date-value">{permit.permitNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="permit-actions">
                <button className="action-btn view-btn">View Details</button>
                {permit.status === 'approved' && (
                  <button className="action-btn download-btn">Download PDF</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {showNewPermitForm && (
          <div className="modal-overlay" onClick={() => setShowNewPermitForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>New Permit Application</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowNewPermitForm(false)}
                >
                  ×
                </button>
              </div>
              <form className="permit-form">
                <div className="form-group">
                  <label>Project Name</label>
                  <input type="text" placeholder="Enter project name" />
                </div>
                <div className="form-group">
                  <label>Permit Type</label>
                  <select>
                    <option value="">Select permit type</option>
                    <option value="building">Building Permit</option>
                    <option value="electrical">Electrical Permit</option>
                    <option value="plumbing">Plumbing Permit</option>
                    <option value="mechanical">Mechanical Permit</option>
                    <option value="demolition">Demolition Permit</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Property Address</label>
                  <input type="text" placeholder="Enter property address" />
                </div>
                <div className="form-group">
                  <label>Description of Work</label>
                  <textarea rows={4} placeholder="Describe the work to be done"></textarea>
                </div>
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowNewPermitForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Permits;
