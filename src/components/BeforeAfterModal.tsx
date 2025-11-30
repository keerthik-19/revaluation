import { X } from 'lucide-react';
import { Button } from './ui/button';

interface BeforeAfterModalProps {
  isOpen: boolean;
  onClose: () => void;
  elementName: string;
  beforeImage?: string;
  afterImage?: string;
  description: string;
  completedDate?: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

const BeforeAfterModal = ({
  isOpen,
  onClose,
  elementName,
  beforeImage,
  afterImage,
  description,
  completedDate,
  status
}: BeforeAfterModalProps) => {
  if (!isOpen) return null;

  // Default placeholder images
  const defaultBefore = 'https://via.placeholder.com/400x300/cccccc/666666?text=Before';
  const defaultAfter = 'https://via.placeholder.com/400x300/10B981/ffffff?text=After';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold" style={{ color: '#10B981' }}>
            {elementName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" style={{ color: '#059669' }} />
          </button>
        </div>

        {/* Status Badge */}
        <div className="px-6 pt-4">
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
            status === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : status === 'in-progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {status === 'completed' ? '✓ Completed' : status === 'in-progress' ? 'In Progress' : 'Upcoming'}
          </span>
        </div>

        {/* Before/After Images */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700">Before</h3>
              <div className="relative rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-100">
                <img
                  src={beforeImage || defaultBefore}
                  alt={`${elementName} - Before`}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = defaultBefore;
                  }}
                />
              </div>
            </div>

            {/* After */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700">After</h3>
              <div className="relative rounded-lg overflow-hidden border-2 border-green-600 bg-gray-100">
                <img
                  src={afterImage || defaultAfter}
                  alt={`${elementName} - After`}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = defaultAfter;
                  }}
                />
                {status === 'completed' && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Done
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Details */}
        <div className="px-6 pb-6 space-y-4">
          {/* Description */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2" style={{ color: '#059669' }}>
              Progress Details
            </h4>
            <p className="text-gray-700">{description}</p>
          </div>

          {/* Timeline */}
          {completedDate && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-600">Completed Date:</span>
              <span className="text-base font-bold" style={{ color: '#10B981' }}>
                {completedDate}
              </span>
            </div>
          )}

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full"
            style={{ backgroundColor: '#059669', color: 'white' }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterModal;
