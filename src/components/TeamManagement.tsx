import { Users, User, Wrench } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: 'Project Manager' | 'Sub Contractor';
  trade?: string;
  phone: string;
  email: string;
  status: 'active' | 'scheduled';
}

const TeamManagement = () => {
  const team: TeamMember[] = [
    {
      id: '1',
      name: 'Mike Johnson',
      role: 'Project Manager',
      phone: '(555) 111-2222',
      email: 'mike@construction.com',
      status: 'active'
    },
    {
      id: '2',
      name: 'Elite Framing Co',
      role: 'Sub Contractor',
      trade: 'Framing',
      phone: '(555) 222-3333',
      email: 'contact@eliteframing.com',
      status: 'active'
    },
    {
      id: '3',
      name: 'Master Electric',
      role: 'Sub Contractor',
      trade: 'Electrical',
      phone: '(555) 333-4444',
      email: 'info@masterelectric.com',
      status: 'active'
    },
    {
      id: '4',
      name: 'Premier Plumbing',
      role: 'Sub Contractor',
      trade: 'Plumbing',
      phone: '(555) 444-5555',
      email: 'service@premierplumb.com',
      status: 'scheduled'
    },
    {
      id: '5',
      name: 'Perfect Paint Co',
      role: 'Sub Contractor',
      trade: 'Painting',
      phone: '(555) 555-6666',
      email: 'jobs@perfectpaint.com',
      status: 'scheduled'
    },
    {
      id: '6',
      name: 'Lighting Solutions',
      role: 'Sub Contractor',
      trade: 'Lighting',
      phone: '(555) 666-7777',
      email: 'install@lightingsol.com',
      status: 'scheduled'
    },
    {
      id: '7',
      name: 'Roofing Pros',
      role: 'Sub Contractor',
      trade: 'Roofing',
      phone: '(555) 777-8888',
      email: 'work@roofingpros.com',
      status: 'active'
    }
  ];

  const projectManager = team.find(m => m.role === 'Project Manager');
  const subContractors = team.filter(m => m.role === 'Sub Contractor');

  return (
    <div className="team-management-container">
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-2" style={{color: '#10B981'}}>
          <Users className="w-6 h-6" />
          Project Team
        </h3>
        <p className="text-sm text-gray-600">Manage project manager and subcontractor assignments</p>
      </div>

      {/* Project Manager Section */}
      {projectManager && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 text-gray-700">Project Manager</h4>
          <div className="p-4 border-2 border-green-600 bg-green-50 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg" style={{color: '#059669'}}>{projectManager.name}</p>
                <p className="text-sm text-gray-600 mb-2">{projectManager.role}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <span className="ml-2 font-medium" style={{color: '#10B981'}}>{projectManager.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium" style={{color: '#10B981'}}>{projectManager.email}</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">
                Active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Subcontractors & Trades */}
      <div>
        <h4 className="text-sm font-semibold mb-3 text-gray-700">Subcontractors & Trades</h4>
        <div className="space-y-3">
          {subContractors.map((sub) => (
            <div 
              key={sub.id}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                sub.status === 'active' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  sub.status === 'active' ? 'bg-blue-600' : 'bg-gray-400'
                }`}>
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-base" style={{
                        color: sub.status === 'active' ? '#2563eb' : '#6b7280'
                      }}>
                        {sub.name}
                      </p>
                      {sub.trade && (
                        <p className="text-sm font-medium text-gray-600">{sub.trade}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      sub.status === 'active' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-400 text-white'
                    }`}>
                      {sub.status === 'active' ? 'Active' : 'Scheduled'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <span className="ml-1 font-medium text-gray-900">{sub.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-1 font-medium text-gray-900">{sub.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg text-center">
          <p className="text-xs font-medium text-blue-900 mb-1">Active Now</p>
          <p className="text-3xl font-bold text-blue-600">
            {team.filter(m => m.status === 'active').length}
          </p>
        </div>
        <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg text-center">
          <p className="text-xs font-medium text-gray-900 mb-1">Scheduled</p>
          <p className="text-3xl font-bold text-gray-600">
            {team.filter(m => m.status === 'scheduled').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
