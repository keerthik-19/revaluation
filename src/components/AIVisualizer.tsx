import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2, Sparkles } from 'lucide-react';

interface AIVisualizerProps {
  roomType?: string;
  propertyAddress?: string;
  title?: string;
}

export const AIVisualizer = ({ roomType = 'kitchen', propertyAddress, title = 'AI Renovation Visualizer' }: AIVisualizerProps) => {
  const [prompt, setPrompt] = useState(`Modern ${roomType} renovation with white cabinets, quartz countertops, and stainless steel appliances`);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      setError('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
      setLoading(false);
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
      setError(err.message || 'Failed to generate visualization. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border" style={{borderColor: '#000'}}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{color: '#000'}}>
          <Sparkles className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription style={{color: '#10B981'}}>
          Describe your dream renovation and see it visualized with AI
          {propertyAddress && ` for ${propertyAddress}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt" style={{color: '#10B981'}}>Describe your renovation vision</Label>
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Modern kitchen with white cabinets..."
            disabled={loading}
          />
        </div>

        <Button 
          onClick={generateImage} 
          disabled={loading || !prompt.trim()}
          className="w-full"
          size="lg"
          style={{backgroundColor: '#059669', color: 'white'}}
        >
          {loading ? (
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

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {imageUrl && (
          <div className="space-y-2">
            <div className="relative rounded-lg overflow-hidden border border-border">
              <img 
                src={imageUrl} 
                alt="AI Generated Renovation"
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs text-center" style={{color: '#10B981'}}>
              AI-generated visualization based on your description
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              style={{borderColor: '#10B981', color: '#10B981'}}
              onClick={() => {
                const link = document.createElement('a');
                link.href = imageUrl;
                link.download = 'renovation-visualization.png';
                link.click();
              }}
            >
              Download Image
            </Button>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <p className="text-xs" style={{color: '#10B981'}}>
            <strong>Tips for best results:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Be specific about materials (e.g., "marble countertops")</li>
              <li>Mention style preferences (e.g., "modern", "rustic", "minimalist")</li>
              <li>Include lighting details (e.g., "natural light", "pendant lights")</li>
              <li>Specify colors and finishes</li>
            </ul>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIVisualizer;
