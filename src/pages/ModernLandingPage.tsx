import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/ModernLandingPage.css';

const ModernLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "AI-Powered Estimates",
      subtitle: "Get accurate renovation costs in seconds",
      icon: "🤖",
      detail: "Our AI analyzes millions of real renovation projects to give you the most accurate cost estimates—no waiting for contractors to call back."
    },
    {
      title: "Permit Intelligence",
      subtitle: "Never miss a deadline or requirement",
      icon: "📋",
      detail: "We track every permit requirement for your specific property and location. Get alerts, deadlines, and step-by-step guidance."
    },
    {
      title: "Vetted Contractors",
      subtitle: "Connect with trusted pros instantly",
      icon: "⭐",
      detail: "Skip the endless research. We've already vetted contractors based on quality, pricing, and reliability—just pick the best fit."
    }
  ];

  const stats = [
    { number: "180%", label: "Avg ROI on kitchen remodels" },
    { number: "120%", label: "Avg ROI on bathroom remodels" },
    { number: "40%", label: "Avg ROI on deck additions" },
    { number: "65%", label: "Avg ROI on basement finish" }
  ];

  return (
    <div className="modern-landing">
      {/* Header */}
      <header className="modern-header">
        <div className="header-content">
          <div className="logo-section">
            <Logo width={50} height={50} />
            <span className="brand-name">Assemble</span>
          </div>
          <nav className="header-nav">
            <a href="#features" className="nav-item">Features</a>
            <a href="#how-it-works" className="nav-item">How it works</a>
            <a href="#pricing" className="nav-item">Pricing</a>
            <button className="btn-login" onClick={() => navigate('/dashboard')}>Sign in</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-modern">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Free renovation planning tool</span>
            </div>
            <h1 className="hero-title">
              Plan Renovations That<br />
              <span className="gradient-text">Actually Add Value</span>
            </h1>
            <p className="hero-subtitle">
              Not all renovations are worth it. A $30K deck might only add $8K to your home's value. 
              But a $22K kitchen remodel? That could add $45K. See the real numbers for YOUR property.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => navigate('/tool')}>
                Enter Your Address
              </button>
            </div>
            <div className="trust-badges">
              <div className="trust-item">
                <span className="check-icon">✓</span>
                <span>Free tool</span>
              </div>
              <div className="trust-item">
                <span className="check-icon">✓</span>
                <span>No signup required</span>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="mockup-container">
              <div className="mockup-card mockup-main">
                <div className="mockup-header">
                  <div className="mockup-dot"></div>
                  <div className="mockup-dot"></div>
                  <div className="mockup-dot"></div>
                </div>
                <div className="mockup-content">
                  <div className="stat-card">
                    <div className="stat-icon">🏠</div>
                    <div className="stat-info">
                      <div className="stat-label">Example: Current Value</div>
                      <div className="stat-value">$450K</div>
                      <div className="stat-change">Before renovations</div>
                    </div>
                  </div>
                  <div className="stat-card gain-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-info">
                      <div className="stat-label">Projected Value</div>
                      <div className="stat-value">$595K</div>
                      <div className="stat-change positive">+$145K in improvements</div>
                    </div>
                  </div>
                  <div className="progress-card">
                    <div className="progress-label">Permit Status</div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '75%'}}></div>
                    </div>
                    <div className="progress-status">3 of 4 approved</div>
                  </div>
                  <div className="contractor-card">
                    <div className="contractor-avatar">JM</div>
                    <div className="contractor-info">
                      <div className="contractor-name">James Miller</div>
                      <div className="contractor-rating">⭐ 4.9 (127 reviews)</div>
                    </div>
                    <button className="btn-contact">Contact</button>
                  </div>
                </div>
              </div>
              <div className="floating-badge badge-1">
                <span className="badge-emoji">⚡</span>
                <span className="badge-text">Instant updates</span>
              </div>
              <div className="floating-badge badge-2">
                <span className="badge-emoji">🔒</span>
                <span className="badge-text">Bank-level security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stats-content">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Statement */}
      <section className="problem-section">
        <div className="problem-content">
          <h2 className="section-title">
            Most Homeowners Renovate Backwards
          </h2>
          <p className="section-intro">
            They spend money on projects that feel right, not projects that add value.
          </p>
          <div className="problem-grid">
            <div className="problem-card bad">
              <div className="problem-icon">❌</div>
              <div className="problem-number">$30K Deck</div>
              <p>Adds $8K in value</p>
              <div className="problem-result loss">Net: -$22K</div>
            </div>
            <div className="problem-card good">
              <div className="problem-icon">✓</div>
              <div className="problem-number">$22K Kitchen</div>
              <p>Adds $45K in value</p>
              <div className="problem-result gain">Net: +$23K</div>
            </div>
            <div className="problem-card bad">
              <div className="problem-icon">❌</div>
              <div className="problem-number">$25K Pool</div>
              <p>Adds $5K in value</p>
              <div className="problem-result loss">Net: -$20K</div>
            </div>
            <div className="problem-card good">
              <div className="problem-icon">✓</div>
              <div className="problem-number">$15K Bathroom</div>
              <p>Adds $35K in value</p>
              <div className="problem-result gain">Net: +$20K</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution - Interactive Features */}
      <section className="features-section">
        <div className="features-content">
          <h2 className="section-title">
            Here's How It Actually Works
          </h2>
          <p className="section-intro">
            Three steps. No sales pitch. No credit card. Just real numbers.
          </p>
          <div className="features-tabs">
            {features.map((feature, idx) => (
              <button
                key={idx}
                className={`feature-tab ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                <span className="tab-icon">{feature.icon}</span>
                <div className="tab-content">
                  <div className="tab-title">{feature.title}</div>
                  <div className="tab-subtitle">{feature.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="feature-display">
            <div className="feature-text">
              <h3>{features[activeTab].title}</h3>
              <p>{features[activeTab].detail}</p>
              <button className="btn-learn-more" onClick={() => navigate('/tool')}>
                Try it now →
              </button>
            </div>
            <div className="feature-visual">
              <div className="visual-placeholder">
                <span className="visual-icon">{features[activeTab].icon}</span>
                <span className="visual-label">Interactive Demo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="testimonials-section">
        <div className="testimonials-content">
          <h2 className="section-title">Real Homeowners. Real Results.</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Was planning a $35K deck. The ROI calculator showed it would only add about $9K in value. 
                Pivoted to an $18K kitchen update instead. Much better investment."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MT</div>
                <div className="author-info">
                  <div className="author-name">M. Thompson</div>
                  <div className="author-location">Homeowner</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card featured">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The permit tracking feature saved us weeks. Knew exactly what forms we needed and when to submit them. 
                No surprises, no delays."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">KR</div>
                <div className="author-info">
                  <div className="author-name">K. Rodriguez</div>
                  <div className="author-location">Homeowner</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Found a contractor through here who actually responded within 24 hours. 
                Project came in under budget and ahead of schedule. Rare."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JP</div>
                <div className="author-info">
                  <div className="author-name">J. Park</div>
                  <div className="author-location">Homeowner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Build Real Equity?
          </h2>
          <p className="cta-subtitle">
            Enter your address. See which renovations will actually pay off. Make smarter decisions.
          </p>
          <button className="btn-cta-large" onClick={() => navigate('/tool')}>
            See My Home's Potential →
          </button>
          <p className="cta-note">Free to use • No signup required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <Logo width={40} height={40} />
            <span className="footer-brand-name">Assemble</span>
            <p className="footer-tagline">Making renovations transparent, simple, and stress-free.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#how-it-works">How it works</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#blog">Blog</a>
              <a href="#careers">Careers</a>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <a href="#help">Help Center</a>
              <a href="#contact">Contact</a>
              <a href="#terms">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernLandingPage;
