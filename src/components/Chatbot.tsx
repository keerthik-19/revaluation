import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! 👋 Welcome to Assemble. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses: { [key: string]: string } = {
    'hello': 'Hello! How can I assist you with your construction project today?',
    'hi': 'Hi there! What would you like to know about Assemble?',
    'pricing': 'We offer flexible pricing starting at $5/month for homeowners and $10/month for contractors. All plans include a 14-day free trial!',
    'features': 'Assemble offers client management, project scheduling, permit tracking, real-time updates, and direct communication between contractors and homeowners.',
    'contractor': 'For contractors, we provide tools for managing multiple clients, tracking permits, scheduling projects, and managing revenue analytics.',
    'homeowner': 'For homeowners, you can track your project progress, view property value estimates, communicate with your contractor, and access all project documents.',
    'demo': 'You can watch our demo by clicking the "Watch Demo" button on the homepage, or start a free trial to explore all features!',
    'contact': 'You can reach us at support@assemble.com or use the contact form on our website.',
    'help': 'I can help you with information about pricing, features, getting started, or answer any questions about Assemble!',
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Default response
    return "I'd be happy to help! You can ask me about our pricing, features, how to get started, or anything else about Assemble. For more specific questions, feel free to contact our support team!";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          style={{backgroundColor: '#059669', color: 'white'}}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b" style={{backgroundColor: '#059669'}}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <MessageCircle className="h-6 w-6" style={{color: '#059669'}} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Assemble Assistant</h3>
                <p className="text-xs text-white/80">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-white border border-border'
                      }`}
                      style={message.sender === 'user' ? {backgroundColor: '#059669', color: 'white'} : {}}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="px-4 py-2 border-t bg-background">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputMessage('Tell me about pricing');
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    style={{borderColor: '#10B981', color: '#10B981', fontSize: '11px'}}
                  >
                    💰 Pricing
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputMessage('What features do you offer?');
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    style={{borderColor: '#10B981', color: '#10B981', fontSize: '11px'}}
                  >
                    ⚡ Features
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputMessage('How do I get started?');
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    style={{borderColor: '#10B981', color: '#10B981', fontSize: '11px'}}
                  >
                    🚀 Get Started
                  </Button>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    size="icon"
                    style={{backgroundColor: '#059669', color: 'white'}}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default Chatbot;
