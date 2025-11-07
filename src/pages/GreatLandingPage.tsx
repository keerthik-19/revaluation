import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import PropertySearchForm from '../components/PropertySearchForm';
import '../styles/GreatLandingPage.css';
import { useState } from 'react';

const GreatLandingPage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! 👋 Have questions about renovations? I'm here to help." }
  ]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { type: 'user', text: input }]);
    
    setTimeout(() => {
      let response = '';
      const lower = input.toLowerCase();
      
      if (lower.includes('cost') || lower.includes('price') || lower.includes('much')) {
        response = "It's completely free! Just enter your address and you'll see which renovations actually add value vs. which ones don't.";
      } else if (lower.includes('work') || lower.includes('how')) {
        response = "Simple: 1) Enter your property address 2) See renovation options with real ROI data 3) Make informed decisions. Takes 30 seconds!";
      } else if (lower.includes('data') || lower.includes('accurate')) {
        response = "We analyze real market data, comparable sales, and local trends to show you exactly how much value each renovation adds to YOUR specific property.";
      } else if (lower.includes('contractor')) {
        response = "After you see which renovations make sense, we can connect you with vetted contractors. But first, let's make sure you're spending on the right things!";
      } else {
        response = "Great question! Try checking your property to see personalized renovation recommendations with real ROI numbers. It's free and takes 30 seconds.";
      }
      
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 500);
    
    setInput('');
  };

  return (
    <div className="great-landing">
      {/* Header */}
      <header className="header">
        <div className="header-top">
          <div className="nav-left">
            <button className="nav-item" onClick={() => navigate('/tool')}>Analyze</button>
            <button className="nav-item" onClick={() => navigate('/ai-renovation')}>Renovate</button>
            <button className="nav-item" onClick={() => navigate('/dashboard')}>Projects</button>
          </div>
          <div className="brand" onClick={() => navigate('/')}>
            <Logo width={60} height={60} />
            <span className="brand-name">Assemble</span>
          </div>
          <div className="nav-right">
            <button className="nav-item" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="nav-item-signin" onClick={() => navigate('/dashboard')}>Sign in</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80" 
            alt="Beautiful home" 
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-problem">
            <p>Wondering if that kitchen remodel will actually pay off?</p>
          </div>
          <h1 className="hero-title">
            Stop guessing. Know exactly what<br />your renovation will be worth.
          </h1>
          <p className="hero-subtitle">
            Get instant ROI for any home improvement — kitchen, bathroom, pool, you name it.
            See real numbers based on YOUR property, not generic estimates.
          </p>
          
          <div className="hero-search">
            <PropertySearchForm 
              onSearchStart={() => console.log('Search started')}
              onSearchComplete={(results) => console.log('Results:', results)}
              onSearchError={(error) => console.error('Error:', error)}
            />
          </div>
          <p className="hero-cta-text">Enter your address. Takes 30 seconds. It's free.</p>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <div className="how-it-works-container">
          <h2>How it works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop" alt="Home search" />
              </div>
              <div className="step-number">1</div>
              <h3>Enter your address</h3>
              <p>We analyze your property's current value</p>
            </div>
            <div className="step-card">
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" alt="ROI analysis" />
              </div>
              <div className="step-number">2</div>
              <h3>See renovation options</h3>
              <p>Get ROI for kitchen, bathroom, pool, and more</p>
            </div>
            <div className="step-card">
              <div className="step-image">
                <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop" alt="Smart decisions" />
              </div>
              <div className="step-number">3</div>
              <h3>Make smart decisions</h3>
              <p>Know which projects add value to your home</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-prop">
        <div className="value-prop-container">
          <h2>Here's what you get</h2>
          <div className="value-cards">
            <div className="value-card">
              <div className="card-illustration">
                <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop" alt="Get accurate ROI" />
              </div>
              <h3>Know before you spend</h3>
              <p>That $50k kitchen remodel? You'll know if it adds $50k or $20k to your home value. No more guessing, no more regrets.</p>
            </div>
            <div className="value-card">
              <div className="card-illustration">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" alt="Real data" />
              </div>
              <h3>🎯 Real numbers, not averages</h3>
              <p>Forget generic online calculators. We analyze YOUR neighborhood, YOUR property type, YOUR local market.</p>
            </div>
            <div className="value-card">
              <div className="card-illustration">
                <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop" alt="Smart choices" />
              </div>
              <h3>Stop wasting money</h3>
              <p>Stop spending on renovations that lose value. Focus on what actually makes your home worth more.</p>
            </div>
          </div>
          <div className="value-cta">
            <button className="cta-button" onClick={() => navigate('/tool')}>Check Your Property Now →</button>
            <p className="cta-subtext">Free. No credit card. Results in 30 seconds.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p>© 2025 Assemble. Make smarter renovation decisions.</p>
        </div>
      </footer>

      {/* Chatbot */}
      <div className={`chatbot ${chatOpen ? 'open' : ''}`}>
        {chatOpen ? (
          <div className="chat-window">
            <div className="chat-header">
              <div>
                <div className="chat-title">Ask us anything</div>
                <div className="chat-status">Usually replies instantly</div>
              </div>
              <button className="chat-close" onClick={() => setChatOpen(false)}>✕</button>
            </div>
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.type}`}>
                  {msg.type === 'bot' && <div className="chat-avatar">🏠</div>}
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="chat-input-area">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="chat-send" onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <button className="chat-bubble-btn" onClick={() => setChatOpen(true)}>
            <span className="chat-icon">💬</span>
            <span className="chat-text">Questions?</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default GreatLandingPage;
