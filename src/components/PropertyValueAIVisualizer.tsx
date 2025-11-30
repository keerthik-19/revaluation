import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2, Sparkles, TrendingUp, Home, Search } from 'lucide-react';
import { attomApiService, type PropertySearchRequest } from '../services/attomApi';

interface PropertyValueAIVisualizerProps {
  roomType?: string;
  title?: string;
  defaultAddress?: string;
}

export const PropertyValueAIVisualizer = ({ 
  roomType = 'kitchen', 
  title = 'Property Value & AI Visualizer',
  defaultAddress = ''
}: PropertyValueAIVisualizerProps) => {
  // Property value state
  const [addressInput, setAddressInput] = useState(defaultAddress);
  const [propertyData, setPropertyData] = useState<any>(null);
  const [isLoadingProperty, setIsLoadingProperty] = useState(false);
  const [propertyError, setPropertyError] = useState<string | null>(null);

  // AI Visualizer state
  const [selectedRoom, setSelectedRoom] = useState(roomType);
  const [prompt, setPrompt] = useState(`Modern ${roomType} renovation with white cabinets, quartz countertops, and stainless steel appliances`);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const roomOptions = [
    { value: 'house', label: 'Whole House' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'bathroom', label: 'Bathroom' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'living-room', label: 'Living Room' },
    { value: 'dining-room', label: 'Dining Room' },
    { value: 'basement', label: 'Basement' },
    { value: 'exterior', label: 'Exterior' },
  ];

  const handlePropertySearch = async () => {
    if (!addressInput.trim()) {
      setPropertyError('Please enter a property address');
      return;
    }

    setIsLoadingProperty(true);
    setPropertyError(null);

    try {
      const parts = addressInput.split(',').map(p => p.trim());
      const searchParams: PropertySearchRequest = {
        address: parts[0] || '',
        city: parts[1] || '',
        state: parts[2]?.split(' ')[0] || '',
        zip: parts[2]?.split(' ')[1] || ''
      };

      const data = await attomApiService.getPropertyValuation(searchParams);
      setPropertyData(data);
      setPropertyError(null);
    } catch (error) {
      console.error('Failed to load property data:', error);
      setPropertyError('Failed to fetch property data. Please check the address and try again.');
    } finally {
      setIsLoadingProperty(false);
    }
  };

  const generateImage = async () => {
    setLoadingAI(true);
    setAiError(null);
    
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      setAiError('OpenAI API key not configured.');
      setLoadingAI(false);
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: `Professional interior design photo: ${prompt}. Photorealistic, high-quality, well-lit, architectural photography style.`,
          n: 1,
          size: '1024x1024',
          quality: 'standard',
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate image');
      }

      const data = await response.json();
      setImageUrl(data.data[0].url);
    } catch (err: any) {
      console.error('AI Visualizer error:', err);
      setAiError(err.message || 'Failed to generate visualization.');
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <Card className="border h-full" style={{borderColor: '#000'}}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{color: 'black'}}>
          <TrendingUp className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription style={{color: 'black'}}>
          Track property value and visualize your renovation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Property Value Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base" style={{color: 'black'}}>Property Value</h3>
          
          {/* Address Input */}
          <div className="flex gap-2">
            <Input
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePropertySearch()}
              placeholder="Enter address (e.g., 123 Main St, City, State ZIP)"
              disabled={isLoadingProperty}
              className="flex-1"
            />
            <Button
              onClick={handlePropertySearch}
              disabled={isLoadingProperty}
              size="sm"
              style={{backgroundColor: '#059669', color: 'white'}}
            >
              {isLoadingProperty ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>

          {propertyError && (
            <p className="text-sm text-red-600">{propertyError}</p>
          )}

          {/* Property Values Display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Home className="h-4 w-4 text-gray-600" />
                <p className="text-xs text-gray-600">Current Value</p>
              </div>
              <p className="text-xl font-bold" style={{color: 'black'}}>
                {propertyData ? `$${propertyData.estimatedValue.toLocaleString()}` : '$425,000'}
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-2" style={{borderColor: '#10B981'}}>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4" style={{color: 'black'}} />
                <p className="text-xs" style={{color: 'black'}}>Post-Reno Value</p>
              </div>
              <p className="text-xl font-bold" style={{color: 'black'}}>
                $485,000
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-sm font-medium" style={{color: 'black'}}>Estimated Increase:</span>
            <span className="text-lg font-bold" style={{color: 'black'}}>$60,000 (+14.1%)</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" style={{borderColor: '#e5e7eb'}}></div>

        {/* AI Visualizer Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-base flex items-center gap-2" style={{color: 'black'}}>
            <Sparkles className="h-4 w-4" />
            AI Renovation Visualizer
          </h3>
          
          {/* Room Type Selector */}
          <div className="space-y-2">
            <Label htmlFor="room-selector" style={{color: 'black'}}>Select Room/Area</Label>
            <select
              id="room-selector"
              value={selectedRoom}
              onChange={(e) => {
                setSelectedRoom(e.target.value);
                setPrompt(`Modern ${e.target.value.replace('-', ' ')} renovation with updated fixtures and finishes`);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              disabled={loadingAI}
            >
              {roomOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ai-prompt" style={{color: 'black'}}>Describe your renovation vision</Label>
            <textarea
              id="ai-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Modern kitchen with white cabinets and marble countertops..."
              disabled={loadingAI}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <Button 
            onClick={generateImage} 
            disabled={loadingAI || !prompt.trim()}
            className="w-full"
            style={{backgroundColor: '#059669', color: 'white'}}
          >
            {loadingAI ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Visualize Renovation
              </>
            )}
          </Button>

          {aiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-xs text-red-600">{aiError}</p>
            </div>
          )}

          {imageUrl && (
            <div className="space-y-2">
              <div className="relative rounded-lg overflow-hidden border-2" style={{borderColor: '#10B981'}}>
                <img 
                  src={imageUrl} 
                  alt="AI Generated Renovation"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-xs text-center" style={{color: 'black'}}>
                AI-generated visualization
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyValueAIVisualizer;
