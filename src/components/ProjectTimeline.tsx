import { CheckCircle, Circle, Clock } from 'lucide-react';

interface TimelineWeek {
  week: number;
  phase: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
}

interface ProjectTimelineProps {
  currentWeek: number;
  totalWeeks?: number;
}

const ProjectTimeline = ({ currentWeek, totalWeeks = 4 }: ProjectTimelineProps) => {
  const weeks: TimelineWeek[] = [
    {
      week: 1,
      phase: 'Foundation',
      status: currentWeek > 1 ? 'completed' : currentWeek === 1 ? 'current' : 'upcoming',
      description: 'Site prep & foundation work'
    },
    {
      week: 2,
      phase: 'Framing/Structure',
      status: currentWeek > 2 ? 'completed' : currentWeek === 2 ? 'current' : 'upcoming',
      description: 'Framing & structural elements'
    },
    {
      week: 3,
      phase: 'Drywall & Systems',
      status: currentWeek > 3 ? 'completed' : currentWeek === 3 ? 'current' : 'upcoming',
      description: 'Drywall, electrical & plumbing'
    },
    {
      week: 4,
      phase: 'Finishing',
      status: currentWeek > 4 ? 'completed' : currentWeek === 4 ? 'current' : 'upcoming',
      description: 'Paint, fixtures & final touches'
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

  return (
    <div className="timeline-container">
      <h3 className="text-xl font-bold mb-6" style={{color: '#10B981'}}>
        Timeline: {totalWeeks} weeks
      </h3>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-green-600 transition-all duration-500"
            style={{ width: `${((currentWeek - 1) / (totalWeeks - 1)) * 100}%` }}
          />
        </div>

        {/* Timeline Weeks */}
        <div className="grid grid-cols-4 gap-4 relative">
          {weeks.map((week, index) => (
            <div 
              key={week.week} 
              className="flex flex-col items-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`relative z-10 bg-white p-2 rounded-full mb-3 transition-all duration-300 ${
                week.status === 'current' ? 'animate-pulse-soft' : ''
              }`}>
                {getStatusIcon(week.status)}
              </div>
              <div className={`text-center p-3 rounded-lg border-2 transition-all duration-500 hover:scale-105 ${
                week.status === 'completed' 
                  ? 'border-green-600 bg-green-50' 
                  : week.status === 'current'
                  ? 'border-blue-600 bg-blue-50 animate-pulse-soft'
                  : 'border-gray-300 bg-gray-50'
              }`}>
                <p className="text-sm font-semibold mb-1">Week {week.week}</p>
                <p className="font-bold text-base mb-1" style={{
                  color: week.status === 'completed' ? '#059669' : week.status === 'current' ? '#2563eb' : '#6b7280'
                }}>
                  {week.phase}
                </p>
                <p className="text-xs text-gray-600">{week.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
