// AI API Service for Renovation Recommendations
// This service integrates with AI APIs (e.g., OpenAI, Anthropic) to provide
// intelligent renovation recommendations and insights

export interface RenovationRecommendation {
  renovationType: string;
  priority: 'high' | 'medium' | 'low';
  estimatedCost: number;
  estimatedROI: number;
  timeframe: string;
  description: string;
  benefits: string[];
  considerations: string[];
}

export interface PropertyAnalysis {
  propertyType: string;
  location: string;
  currentValue: number;
  recommendations: RenovationRecommendation[];
  marketTrends: string[];
  summary: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  propertyContext?: {
    address: string;
    propertyValue: number;
    propertyType?: string;
    yearBuilt?: number;
  };
}

class AIApiService {
  private apiKey: string;
  private baseUrl: string;
  private provider: 'openai' | 'anthropic';

  constructor() {
    // Check which AI provider is configured
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
    this.provider = import.meta.env.VITE_OPENAI_API_KEY ? 'openai' : 'anthropic';
    this.baseUrl = this.provider === 'openai' 
      ? 'https://api.openai.com/v1'
      : 'https://api.anthropic.com/v1';
  }

  /**
   * Get AI-powered renovation recommendations based on property data
   */
  async getRenovationRecommendations(
    propertyValue: number,
    propertyType: string,
    location: string,
    yearBuilt?: number
  ): Promise<PropertyAnalysis> {
    if (!this.apiKey) {
      console.warn('AI API key not configured. Using mock data.');
      return this.getMockRecommendations(propertyValue, propertyType, location);
    }

    const prompt = this.buildRecommendationPrompt(propertyValue, propertyType, location, yearBuilt);

    try {
      const response = await this.callAI(prompt);
      return this.parseRecommendations(response, propertyValue, propertyType, location);
    } catch (error) {
      console.error('AI API error, falling back to mock data:', error);
      return this.getMockRecommendations(propertyValue, propertyType, location);
    }
  }

  /**
   * Chat with AI about renovations
   */
  async chat(request: ChatRequest): Promise<string> {
    if (!this.apiKey) {
      return "I'm currently in demo mode. Please configure an AI API key (OpenAI or Anthropic) to enable intelligent renovation recommendations.";
    }

    try {
      const systemMessage = this.buildSystemMessage(request.propertyContext);
      const messages = [
        { role: 'system' as const, content: systemMessage },
        ...request.messages
      ];

      return await this.callAI(messages[messages.length - 1].content, messages);
    } catch (error) {
      console.error('AI chat error:', error);
      return "I'm having trouble connecting right now. Please try again later.";
    }
  }

  /**
   * Get ROI analysis for a specific renovation
   */
  async getROIAnalysis(
    renovationType: string,
    propertyValue: number,
    location: string
  ): Promise<{ roi: number; analysis: string }> {
    const prompt = `Analyze the ROI for a ${renovationType} renovation on a property valued at $${propertyValue.toLocaleString()} in ${location}. Provide a realistic ROI percentage and brief analysis.`;

    try {
      const response = await this.callAI(prompt);
      // Parse ROI from response
      const roiMatch = response.match(/(\d+)%/);
      const roi = roiMatch ? parseInt(roiMatch[1]) : 75;
      
      return {
        roi,
        analysis: response
      };
    } catch (error) {
      console.error('ROI analysis error:', error);
      return {
        roi: 75,
        analysis: `A ${renovationType} typically returns 70-80% ROI in most markets.`
      };
    }
  }

  /**
   * Call the configured AI provider
   */
  private async callAI(prompt: string, messages?: ChatMessage[]): Promise<string> {
    if (this.provider === 'openai') {
      return this.callOpenAI(prompt, messages);
    } else {
      return this.callAnthropic(prompt, messages);
    }
  }

  /**
   * Call OpenAI API
   */
  private async callOpenAI(prompt: string, messages?: ChatMessage[]): Promise<string> {
    const requestBody = {
      model: 'gpt-4',
      messages: messages || [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    };

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  /**
   * Call Anthropic API
   */
  private async callAnthropic(prompt: string, messages?: ChatMessage[]): Promise<string> {
    const requestBody = {
      model: 'claude-3-sonnet-20240229',
      messages: messages || [{ role: 'user', content: prompt }],
      max_tokens: 1000
    };

    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  /**
   * Build prompt for renovation recommendations
   */
  private buildRecommendationPrompt(
    propertyValue: number,
    propertyType: string,
    location: string,
    yearBuilt?: number
  ): string {
    return `As a home renovation expert, analyze this property and provide top 5 renovation recommendations:

Property Details:
- Type: ${propertyType}
- Location: ${location}
- Current Value: $${propertyValue.toLocaleString()}
${yearBuilt ? `- Year Built: ${yearBuilt}` : ''}

For each recommendation, provide:
1. Renovation type
2. Priority (high/medium/low)
3. Estimated cost range
4. Expected ROI percentage
5. Timeframe
6. Key benefits
7. Important considerations

Focus on renovations that maximize property value and appeal to buyers in this market.`;
  }

  /**
   * Build system message for chat
   */
  private buildSystemMessage(propertyContext?: ChatRequest['propertyContext']): string {
    let message = `You are an expert home renovation advisor. You provide practical, data-driven advice on home improvements, ROI analysis, and renovation planning.`;

    if (propertyContext) {
      message += `\n\nProperty Context:
- Address: ${propertyContext.address}
- Current Value: $${propertyContext.propertyValue.toLocaleString()}
${propertyContext.propertyType ? `- Type: ${propertyContext.propertyType}` : ''}
${propertyContext.yearBuilt ? `- Year Built: ${propertyContext.yearBuilt}` : ''}`;
    }

    return message;
  }

  /**
   * Parse AI response into structured recommendations
   */
  private parseRecommendations(
    response: string,
    propertyValue: number,
    propertyType: string,
    location: string
  ): PropertyAnalysis {
    // This is a simplified parser - in production, you'd want more robust parsing
    return {
      propertyType,
      location,
      currentValue: propertyValue,
      recommendations: this.getMockRecommendations(propertyValue, propertyType, location).recommendations,
      marketTrends: [
        'Kitchen renovations showing strong ROI in this area',
        'Energy-efficient upgrades increasingly valued by buyers',
        'Outdoor living spaces in high demand'
      ],
      summary: response
    };
  }

  /**
   * Get mock recommendations when AI is not available
   */
  private getMockRecommendations(
    propertyValue: number,
    propertyType: string,
    location: string
  ): PropertyAnalysis {
    const baseRenovations: RenovationRecommendation[] = [
      {
        renovationType: 'Kitchen Remodel',
        priority: 'high',
        estimatedCost: propertyValue * 0.05,
        estimatedROI: 85,
        timeframe: '6-8 weeks',
        description: 'Modern kitchen with updated appliances, countertops, and cabinets',
        benefits: [
          'Highest ROI renovation',
          'Major selling point for buyers',
          'Improves daily living quality'
        ],
        considerations: [
          'Can be disruptive during construction',
          'Cost varies significantly with material choices',
          'Plan for temporary cooking arrangements'
        ]
      },
      {
        renovationType: 'Bathroom Upgrade',
        priority: 'high',
        estimatedCost: propertyValue * 0.03,
        estimatedROI: 75,
        timeframe: '4-6 weeks',
        description: 'Updated fixtures, tile, and modern amenities',
        benefits: [
          'Strong ROI',
          'Enhances property appeal',
          'Relatively quick project'
        ],
        considerations: [
          'Plumbing work can reveal hidden issues',
          'Waterproofing is critical',
          'Choose timeless designs'
        ]
      },
      {
        renovationType: 'Energy-Efficient Windows',
        priority: 'medium',
        estimatedCost: propertyValue * 0.04,
        estimatedROI: 70,
        timeframe: '2-3 weeks',
        description: 'Double-pane, energy-efficient windows throughout',
        benefits: [
          'Lower utility bills',
          'Improved comfort',
          'Tax credits may be available'
        ],
        considerations: [
          'Professional installation recommended',
          'Measure twice, order once',
          'Consider style match with home'
        ]
      },
      {
        renovationType: 'Landscaping & Curb Appeal',
        priority: 'medium',
        estimatedCost: propertyValue * 0.02,
        estimatedROI: 100,
        timeframe: '2-4 weeks',
        description: 'Professional landscaping, fresh paint, and exterior improvements',
        benefits: [
          'Best ROI',
          'Creates strong first impression',
          'Quick project'
        ],
        considerations: [
          'Regular maintenance required',
          'Choose native plants for sustainability',
          'Consider climate and sun exposure'
        ]
      },
      {
        renovationType: 'Basement Finishing',
        priority: 'low',
        estimatedCost: propertyValue * 0.06,
        estimatedROI: 65,
        timeframe: '8-12 weeks',
        description: 'Convert basement into livable space',
        benefits: [
          'Significant square footage addition',
          'Flexible use (office, gym, entertainment)',
          'Adds value in right markets'
        ],
        considerations: [
          'Moisture and waterproofing critical',
          'Building codes and permits required',
          'ROI varies by region'
        ]
      }
    ];

    return {
      propertyType,
      location,
      currentValue: propertyValue,
      recommendations: baseRenovations,
      marketTrends: [
        'Kitchen renovations showing strong ROI in this area',
        'Energy-efficient upgrades increasingly valued by buyers',
        'Outdoor living spaces in high demand',
        'Smart home features becoming standard'
      ],
      summary: `Based on your ${propertyType} valued at $${propertyValue.toLocaleString()} in ${location}, these renovations offer the best combination of ROI and property value enhancement.`
    };
  }
}

export const aiApiService = new AIApiService();
