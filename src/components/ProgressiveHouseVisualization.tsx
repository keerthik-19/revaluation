import { useState } from 'react';
import BeforeAfterModal from './BeforeAfterModal';

interface HouseElement {
  id: string;
  name: string;
  completionThreshold: number; // week number
  description: string;
  completedDate?: string;
  beforeImage?: string;
  afterImage?: string;
}

interface HouseVisualizationProps {
  currentWeek: number;
  projectProgress?: number;
}

const ProgressiveHouseVisualization = ({ currentWeek }: HouseVisualizationProps) => {
  const [selectedElement, setSelectedElement] = useState<HouseElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine which parts of the house are visible based on progress
  const showFoundation = currentWeek >= 1;
  const showFraming = currentWeek >= 2;
  const showDrywall = currentWeek >= 3;
  const showFinishing = currentWeek >= 4;

  // Define clickable house elements with their data
  const houseElements: HouseElement[] = [
    {
      id: 'foundation',
      name: 'Foundation',
      completionThreshold: 1,
      description: 'Concrete foundation poured and cured. Site preparation completed with proper grading and drainage systems installed.',
      completedDate: 'November 1, 2024',
      beforeImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop'
    },
    {
      id: 'walls',
      name: 'Walls & Framing',
      completionThreshold: 2,
      description: 'All wall framing completed with support beams and structural elements installed. Passed framing inspection.',
      completedDate: 'November 8, 2024',
      beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=300&fit=crop'
    },
    {
      id: 'windows',
      name: 'Windows',
      completionThreshold: 3,
      description: 'Energy-efficient double-pane windows installed. All window frames properly sealed and insulated.',
      completedDate: 'November 15, 2024',
      beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop'
    },
    {
      id: 'door',
      name: 'Door',
      completionThreshold: 3,
      description: 'Main entry door installed with proper weatherproofing and security features.',
      completedDate: 'November 16, 2024',
      beforeImage: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=400&h=300&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=400&h=300&fit=crop'
    },
    {
      id: 'roof',
      name: 'Roof',
      completionThreshold: 4,
      description: 'Roof structure complete with shingles, underlayment, and proper ventilation systems installed.',
      completedDate: currentWeek >= 4 ? 'November 25, 2024' : undefined,
      beforeImage: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'
    }
  ];

  const handleElementClick = (element: HouseElement) => {
    if (currentWeek >= element.completionThreshold) {
      setSelectedElement(element);
      setIsModalOpen(true);
    }
  };

  const getElementStatus = (element: HouseElement): 'completed' | 'in-progress' | 'upcoming' => {
    if (currentWeek > element.completionThreshold) return 'completed';
    if (currentWeek === element.completionThreshold) return 'in-progress';
    return 'upcoming';
  };


  return (
    <div className="house-visualization-container">
      {/* Visual House Representation - Full Width */}
      <div className="house-diagram bg-gradient-to-b from-sky-100 to-green-50 p-12 rounded-lg border-2 border-gray-300 relative h-[500px] flex items-end justify-center overflow-hidden">
        {/* Construction Site Base */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-800 to-green-600"></div>
        <div className="absolute bottom-16 left-0 right-0 h-3 bg-amber-900"></div>
        
        {/* House Assembly Container - Stack vertically from bottom */}
        <div className="relative flex flex-col items-center" style={{ marginBottom: '80px', perspective: '1000px' }}>
          {/* Roof (Finishing) - Slides down from top */}
          {showFinishing && (
            <div 
              className="roof-section cursor-pointer transition-all hover:brightness-110" 
              style={{ 
                animation: 'slideDownAssemble 1s ease-out forwards',
                animationDelay: '1.5s',
                opacity: 0,
                transform: 'translateY(-100px)',
                order: 1
              }}
              onClick={() => handleElementClick(houseElements.find(el => el.id === 'roof')!)}
              title="Click to view roof details"
            >
              <div 
                className="w-0 h-0 border-l-[150px] border-r-[150px] border-b-[75px] border-transparent relative"
                style={{ borderBottomColor: '#059669', marginBottom: '-5px' }}
              >
                <div className="absolute -bottom-1 -left-[150px] w-[300px] h-2 bg-green-700"></div>
              </div>
            </div>
          )}
            
          {/* Walls/Drywall - Rise up from foundation */}
          {showDrywall && (
            <div 
              className="wall-section cursor-pointer" 
              style={{ 
                animation: 'riseUpAssemble 1s ease-out forwards',
                animationDelay: '1s',
                opacity: 0,
                transform: 'translateY(100px) scaleY(0)',
                transformOrigin: 'bottom',
                order: 2
              }}
            >
              <div 
                className="w-[280px] h-[140px] relative transition-all hover:brightness-105"
                style={{ backgroundColor: '#F5F5DC', border: '4px solid #D4A574', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}
                onClick={() => handleElementClick(houseElements.find(el => el.id === 'walls')!)}
                title="Click to view wall details"
              >
                {/* Windows - Pop in after walls */}
                <div 
                  className="absolute top-6 left-10 w-14 h-14 bg-sky-200 border-3 border-gray-700 cursor-pointer hover:brightness-110 transition-all shadow-inner"
                  style={{ 
                    animation: 'popIn 0.5s ease-out forwards',
                    animationDelay: '2s',
                    opacity: 0,
                    transform: 'scale(0)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleElementClick(houseElements.find(el => el.id === 'windows')!);
                  }}
                  title="Click to view window details"
                >
                  {/* Window panes */}
                  <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
                    <div className="bg-white/50"></div>
                    <div className="bg-white/50"></div>
                    <div className="bg-white/50"></div>
                    <div className="bg-white/50"></div>
                  </div>
                </div>
                <div 
                  className="absolute top-6 right-10 w-14 h-14 bg-sky-200 border-3 border-gray-700 cursor-pointer hover:brightness-110 transition-all shadow-inner"
                  style={{ 
                    animation: 'popIn 0.5s ease-out forwards',
                    animationDelay: '2.2s',
                    opacity: 0,
                    transform: 'scale(0)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleElementClick(houseElements.find(el => el.id === 'windows')!);
                  }}
                  title="Click to view window details"
                >
                  {/* Window panes */}
                  <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
                    <div className="bg-white/50"></div>
                    <div className="bg-white/50"></div>
                    <div className="bg-white/50"></div>
                    <div className="bg-white/50"></div>
                  </div>
                </div>
                
                {/* Door - Swings open */}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-amber-900 border-3 border-amber-950 cursor-pointer hover:brightness-110 transition-all shadow-lg"
                  style={{ 
                    animation: 'swingIn 0.6s ease-out forwards',
                    animationDelay: '2.4s',
                    opacity: 0,
                    transformOrigin: 'left'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleElementClick(houseElements.find(el => el.id === 'door')!);
                  }}
                  title="Click to view door details"
                >
                  <div className="absolute top-1/2 right-3 w-2.5 h-2.5 bg-yellow-400 rounded-full shadow-md"></div>
                  {/* Door panels */}
                  <div className="absolute inset-2 border border-amber-800 m-1"></div>
                  <div className="absolute top-1/2 left-2 right-2 h-px bg-amber-800"></div>
                </div>
              </div>
            </div>
          )}
            
          {/* Framing Layer - Only shows if drywall not complete */}
          {showFraming && !showDrywall && (
            <div 
              className="framing-section cursor-pointer" 
              style={{ 
                animation: 'riseUpAssemble 1s ease-out forwards',
                animationDelay: '1s',
                opacity: 0,
                transform: 'translateY(100px) scaleY(0)',
                transformOrigin: 'bottom',
                order: 2
              }}
              onClick={() => handleElementClick(houseElements.find(el => el.id === 'walls')!)}
              title="Click to view framing details"
            >
              <div 
                className="w-[280px] h-[140px] relative border-4 bg-amber-50/20 transition-all hover:brightness-110"
                style={{ borderColor: '#D2691E', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
              >
                {/* Vertical studs */}
                <div className="absolute inset-0 flex justify-around p-3">
                  {[1, 2, 3, 4, 5, 6, 7].map(i => (
                    <div key={i} className="w-2 h-full" style={{ backgroundColor: '#D2691E' }}></div>
                  ))}
                </div>
                {/* Horizontal beams */}
                <div className="absolute top-0 left-0 right-0 h-2" style={{ backgroundColor: '#D2691E' }}></div>
                <div className="absolute bottom-0 left-0 right-0 h-2" style={{ backgroundColor: '#D2691E' }}></div>
                <div className="absolute top-1/2 left-0 right-0 h-2 transform -translate-y-1/2" style={{ backgroundColor: '#D2691E' }}></div>
              </div>
            </div>
          )}
            
          {/* Foundation - Drops down first */}
          {showFoundation && (
            <div 
              className="foundation-section cursor-pointer" 
              style={{ 
                animation: 'dropDown 0.8s ease-out forwards',
                animationDelay: '0.3s',
                opacity: 0,
                transform: 'translateY(-50px)',
                order: 3
              }}
              onClick={() => handleElementClick(houseElements.find(el => el.id === 'foundation')!)}
              title="Click to view foundation details"
            >
              <div 
                className="w-[300px] h-[50px] transition-all hover:brightness-110"
                style={{ 
                  backgroundColor: '#8B4513', 
                  border: '4px solid #654321',
                  boxShadow: '0 6px 15px rgba(0,0,0,0.4), inset 0 -2px 10px rgba(0,0,0,0.3)'
                }}
              >
                <div className="h-full flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-2 px-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                      <div 
                        key={i} 
                        className="w-4 h-4 bg-gray-600 rounded-sm"
                        style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Construction text indicator */}
        <div className="absolute top-6 left-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold shadow-lg" style={{ animation: 'pulse 2s ease-in-out infinite' }}>
          🏗️ Building Progress: Week {currentWeek} of 4
        </div>
        
        {/* Helper text */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-full">
            Click on house elements to see details
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes dropDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes riseUpAssemble {
          from {
            opacity: 0;
            transform: translateY(100px) scaleY(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) scaleY(1);
          }
        }
        
        @keyframes slideDownAssemble {
          from {
            opacity: 0;
            transform: translateY(-100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes swingIn {
          from {
            opacity: 0;
            transform: translateX(-50%) perspective(400px) rotateY(-90deg);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) perspective(400px) rotateY(0deg);
          }
        }
      `}</style>

      {/* Before/After Modal */}
      {selectedElement && (
        <BeforeAfterModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedElement(null);
          }}
          elementName={selectedElement.name}
          beforeImage={selectedElement.beforeImage}
          afterImage={selectedElement.afterImage}
          description={selectedElement.description}
          completedDate={selectedElement.completedDate}
          status={getElementStatus(selectedElement)}
        />
      )}
    </div>
  );
};

export default ProgressiveHouseVisualization;
