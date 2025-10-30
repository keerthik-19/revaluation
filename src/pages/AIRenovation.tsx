import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

interface RenovationResult {
  beforeImage: string;
  afterImage: string;
  timestamp: Date;
  style: string;
}

const AIRenovation: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [renovationStyle, setRenovationStyle] = useState<string>('modern');
  const [roomType, setRoomType] = useState<string>('kitchen');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<RenovationResult | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null); // Clear previous result
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAIRenovation = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);

    // Simulate API call to AI service (replace with actual API)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock AI-generated result (replace with actual API response)
    const mockResult: RenovationResult = {
      beforeImage: selectedImage,
      afterImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', // Replace with AI-generated image
      timestamp: new Date(),
      style: renovationStyle
    };

    setResult(mockResult);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setRenovationStyle('modern');
    setRoomType('kitchen');
  };

  return (
    <div className="ai-renovation-page">
      <nav className="page-nav">
        <div className="nav-brand">
          <h2>Assemble</h2>
        </div>
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
      </nav>

      <div className="ai-renovation-container">
        <div className="ai-header">
          <h1>AI Renovation Visualizer</h1>
          <p>Upload a photo of your space and see how it could look after renovation</p>
        </div>

        {!result ? (
          <div className="upload-section">
            <div className="upload-controls">
              <div className="control-group">
                <label>Room Type</label>
                <select 
                  value={roomType} 
                  onChange={(e) => setRoomType(e.target.value)}
                  className="room-select"
                >
                  <option value="kitchen">Kitchen</option>
                  <option value="bathroom">Bathroom</option>
                  <option value="living-room">Living Room</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="exterior">Exterior</option>
                </select>
              </div>

              <div className="control-group">
                <label>Renovation Style</label>
                <select 
                  value={renovationStyle} 
                  onChange={(e) => setRenovationStyle(e.target.value)}
                  className="style-select"
                >
                  <option value="modern">Modern</option>
                  <option value="contemporary">Contemporary</option>
                  <option value="traditional">Traditional</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="industrial">Industrial</option>
                  <option value="farmhouse">Farmhouse</option>
                </select>
              </div>
            </div>

            <div className="upload-area">
              {!selectedImage ? (
                <label className="upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                  <div className="upload-content">
                    <div className="upload-icon">+</div>
                    <h3>Upload a photo of your space</h3>
                    <p>Click or drag and drop an image here</p>
                    <span className="file-types">PNG, JPG up to 10MB</span>
                  </div>
                </label>
              ) : (
                <div className="image-preview">
                  <img src={selectedImage} alt="Uploaded space" />
                  <button onClick={handleReset} className="change-image-btn">
                    Change Image
                  </button>
                </div>
              )}
            </div>

            {selectedImage && (
              <button 
                onClick={generateAIRenovation} 
                disabled={isProcessing}
                className="generate-btn"
              >
                {isProcessing ? (
                  <>
                    <span className="spinner"></span>
                    Generating AI Renovation...
                  </>
                ) : (
                  'Generate AI Renovation'
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="results-section">
            <div className="comparison-view">
              <div className="image-container">
                <h3>Before</h3>
                <img src={result.beforeImage} alt="Before renovation" />
              </div>
              <div className="arrow-divider">→</div>
              <div className="image-container">
                <h3>After ({result.style})</h3>
                <img src={result.afterImage} alt="After renovation" />
              </div>
            </div>

            <div className="result-actions">
              <button onClick={handleReset} className="try-again-btn">
                Try Another Image
              </button>
              <button 
                onClick={() => {
                  // Save to project photos
                  navigate('/dashboard');
                }}
                className="save-btn"
              >
                Save to Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRenovation;
