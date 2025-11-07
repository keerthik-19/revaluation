import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import '../styles/MessagingLandingPage.css';

const MessagingLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate('/tool');
  };

  return (
    <div className="messaging-landing">
      {/* Navigation */}
      <nav className="msg-nav">
        <div className="msg-nav-content">
          <div className="msg-logo">
            <Logo width={80} height={80} />
            <span className="msg-logo-text">Assemble</span>
          </div>
        </div>
      </nav>

      {/* Hero Section - The Problem */}
      <section className="msg-hero">
        <div className="msg-container">
          <h1 className="msg-headline">
            Tired of Renovation Projects That Cost More and Take Longer Than Expected?
          </h1>
          <p className="msg-subheadline">
            You're stuck getting wildly different contractor quotes, unsure what permits you need, 
            and overwhelmed by endless decisions—all while your dream home feels further away.
          </p>
        </div>
      </section>

      {/* The Solution */}
      <section className="msg-solution">
        <div className="msg-container">
          <div className="msg-label">The Solution</div>
          <h2 className="msg-section-title">
            One Platform That Simplifies Your Entire Home Renovation Journey
          </h2>
          <p className="msg-section-subtitle">
            Assemble brings clarity, confidence, and control to every step—from initial estimates 
            to permit tracking to finding the right contractor.
          </p>

          <div className="msg-features">
            <div className="msg-feature-card">
              <div className="msg-feature-icon">💰</div>
              <h3 className="msg-feature-title">Instant, Accurate Estimates</h3>
              <p className="msg-feature-desc">
                Get AI-powered renovation cost estimates in minutes, not weeks. 
                Know what you're getting into before you commit.
              </p>
            </div>

            <div className="msg-feature-card">
              <div className="msg-feature-icon">📋</div>
              <h3 className="msg-feature-title">Permit Tracking Made Simple</h3>
              <p className="msg-feature-desc">
                Never miss a deadline or approval. We guide you through every 
                permit requirement specific to your property and project.
              </p>
            </div>

            <div className="msg-feature-card">
              <div className="msg-feature-icon">🔧</div>
              <h3 className="msg-feature-title">Find Trusted Contractors</h3>
              <p className="msg-feature-desc">
                Connect with vetted professionals who understand your project scope 
                and can deliver on time and on budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Benefit */}
      <section className="msg-benefit">
        <div className="msg-container">
          <div className="msg-benefit-content">
            <div className="msg-benefit-text">
              <div className="msg-label msg-label-light">The Outcome</div>
              <h2 className="msg-section-title msg-title-light">
                Transform Your Home Without the Stress, Surprises, or Setbacks
              </h2>
              <p className="msg-benefit-desc">
                Imagine starting your renovation with complete clarity—knowing exactly what it will cost, 
                what permits you need, and which contractors are right for the job. No more guesswork. 
                No more delays. Just a clear path from vision to reality.
              </p>
              <ul className="msg-benefit-list">
                <li>✓ Save thousands by avoiding costly mistakes</li>
                <li>✓ Cut weeks off your timeline with streamlined permit tracking</li>
                <li>✓ Sleep easy knowing every detail is handled</li>
                <li>✓ Make confident decisions backed by real data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Trust Signal */}
      <section className="msg-trust">
        <div className="msg-container">
          <div className="msg-trust-content">
            <p className="msg-trust-text">
              "I went from drowning in contractor quotes to having a clear renovation plan in under an hour. 
              Assemble took all the guesswork out of our kitchen remodel."
            </p>
            <p className="msg-trust-author">— Sarah M., First-Time Renovator</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="msg-cta-section">
        <div className="msg-container">
          <div className="msg-cta-content">
            <h2 className="msg-cta-title">Ready to Start Your Renovation the Right Way?</h2>
            <p className="msg-cta-subtitle">
              Get your free instant estimate today—no credit card required.
            </p>
            <button className="msg-cta-button" onClick={handleCTA}>
              Get Your Free Estimate
            </button>
            <p className="msg-cta-footnote">
              Join hundreds of homeowners who've simplified their renovation journey
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="msg-footer">
        <div className="msg-container">
          <div className="msg-footer-content">
            <div className="msg-footer-logo">
              <Logo width={60} height={60} />
              <span className="msg-footer-logo-text">Assemble</span>
            </div>
            <p className="msg-footer-text">
              Making home renovations simple, transparent, and stress-free.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MessagingLandingPage;
