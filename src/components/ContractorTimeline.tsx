import { useState } from 'react';
import { CheckCircle, Circle, Clock, ChevronDown, ChevronUp, User } from 'lucide-react';

interface SubContractor {
  id: string;
  name: string;
  trade: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'upcoming';
}

interface TimelinePhase {
  week: number;
  phase: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  subs: SubContractor[];
}

interface ContractorTimelineProps {
  currentWeek: number;
  totalWeeks?: number;
  projectId?: string;
}

const ContractorTimeline = ({ currentWeek, totalWeeks = 4 }: ContractorTimelineProps) => {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(currentWeek);

  const phases: TimelinePhase[] = [
    {
      week: 1,
      phase: 'Foundation',
      status: currentWeek > 1 ? 'completed' : currentWeek === 1 ? 'current' : 'upcoming',
      description: 'Site prep & foundation work',
      subs: [
        { id: '1', name: 'ABC Excavation', trade: 'Excavation', progress: 100, status: currentWeek >= 1 ? 'completed' : 'upcoming' },
        { id: '2', name: 'Foundation Pro', trade: 'Concrete', progress: 100, status: currentWeek >= 1 ? 'completed' : 'upcoming' },
      ]
    },
    {
      week: 2,
      phase: 'Framing/Structure',
      status: currentWeek > 2 ? 'completed' : currentWeek === 2 ? 'current' : 'upcoming',
      description: 'Framing & structural elements',
      subs: [
        { id: '3', name: 'Elite Framing Co', trade: 'Framing', progress: currentWeek >= 2 ? 90 : 0, status: currentWeek > 2 ? 'completed' : currentWeek === 2 ? 'in-progress' : 'upcoming' },
        { id: '4', name: 'Structural Solutions', trade: 'Steel Work', progress: currentWeek >= 2 ? 85 : 0, status: currentWeek > 2 ? 'completed' : currentWeek === 2 ? 'in-progress' : 'upcoming' },
      ]
    },
    {
      week: 3,
      phase: 'Drywall & Systems',
      status: currentWeek > 3 ? 'completed' : currentWeek === 3 ? 'current' : 'upcoming',
      description: 'Drywall, electrical & plumbing',
      subs: [
        { id: '5', name: 'Quality Drywall', trade: 'Drywall', progress: currentWeek >= 3 ? 75 : 0, status: currentWeek > 3 ? 'completed' : currentWeek === 3 ? 'in-progress' : 'upcoming' },
        { id: '6', name: 'Master Electric', trade: 'Electrical', progress: currentWeek >= 3 ? 70 : 0, status: currentWeek > 3 ? 'completed' : currentWeek === 3 ? 'in-progress' : 'upcoming' },
        { id: '7', name: 'Premier Plumbing', trade: 'Plumbing', progress: currentWeek >= 3 ? 65 : 0, status: currentWeek > 3 ? 'completed' : currentWeek === 3 ? 'in-progress' : 'upcoming' },
      ]
    },
    {
      week: 4,
      phase: 'Finishing',
      status: currentWeek > 4 ? 'completed' : currentWeek === 4 ? 'current' : 'upcoming',
      description: 'Paint, fixtures & final touches',
      subs: [
        { id: '8', name: 'Perfect Paint Co', trade: 'Painting', progress: currentWeek >= 4 ? 40 : 0, status: currentWeek > 4 ? 'completed' : currentWeek === 4 ? 'in-progress' : 'upcoming' },
        { id: '9', name: 'Fixture Installers', trade: 'Fixtures', progress: currentWeek >= 4 ? 30 : 0, status: currentWeek > 4 ? 'completed' : currentWeek === 4 ? 'in-progress' : 'upcoming' },
        { id: '10', name: 'Clean Sweep', trade: 'Final Cleanup', progress: currentWeek >= 4 ? 20 : 0, status: currentWeek > 4 ? 'completed' : currentWeek === 4 ? 'in-progress' : 'upcoming' },
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'current':
        return <Clock className="w-6 h-6 text-blue-600 animate-pulse" />;
      default:
        return <Circle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getSubStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  const toggleWeek = (week: number) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  return (
    <div className="contractor-timeline-container">
      <h3 className="text-xl font-bold mb-6" style={{color: '#10B981'}}>
        Project Timeline: {totalWeeks} weeks
      </h3>
      
      <div className="relative">
        {/* Timeline Weeks */}
        <div className="space-y-4">
          {phases.map((phase) => (
            <div 
              key={phase.week} 
              className={`border-2 rounded-lg transition-all duration-300 relative ${
                phase.status === 'completed' 
                  ? 'border-green-600 bg-green-50' 
                  : phase.status === 'current'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              {/* Phase Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-white/50 transition-colors"
                onClick={() => toggleWeek(phase.week)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                      {getStatusIcon(phase.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-600">Week {phase.week}</span>
                        <span className="font-bold text-lg" style={{
                          color: phase.status === 'completed' ? '#059669' : phase.status === 'current' ? '#2563eb' : '#6b7280'
                        }}>
                          {phase.phase}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{phase.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{phase.subs.length} subcontractors assigned</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      phase.status === 'completed' 
                        ? 'bg-green-600 text-white' 
                        : phase.status === 'current'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-400 text-white'
                    }`}>
                      {phase.status === 'completed' ? 'Done' : phase.status === 'current' ? 'Active' : 'Pending'}
                    </span>
                    {expandedWeek === phase.week ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </div>
              </div>

              {/* Subcontractors List */}
              {expandedWeek === phase.week && (
                <div className="border-t-2 border-gray-200 bg-white p-4 space-y-3">
                  <h4 className="font-semibold text-sm mb-3" style={{color: '#059669'}}>
                    Subcontractors ({phase.subs.length})
                  </h4>
                  {phase.subs.map((sub) => (
                    <div 
                      key={sub.id}
                      className={`p-3 rounded-lg border-2 transition-all hover:shadow-md ${getSubStatusColor(sub.status)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <div>
                            <p className="font-semibold text-sm">{sub.name}</p>
                            <p className="text-xs opacity-75">{sub.trade}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold">{sub.progress}%</span>
                      </div>
                      {sub.progress > 0 && (
                        <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              sub.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
                            }`}
                            style={{ width: `${sub.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractorTimeline;
