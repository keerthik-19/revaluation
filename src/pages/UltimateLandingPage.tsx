import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UltimateLandingPage.css';

const UltimateLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/tool');
  };

  return (
    <div className="ultimate-landing">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">Assemble</div>
          <button className="btn-nav" onClick={() => navigate('/dashboard')}>Sign In</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            Used by 12,000+ homeowners
          </div>

          <h1 className="hero-h1">
            Zillow Tells You What<br />
            Your Home Is Worth.<br />
            <span className="hero-highlight">We Tell You What It Could Be.</span>
          </h1>

          <p className="hero-p">
            See which renovations will actually increase your home's value—and which ones are a waste of money.
            Get ROI projections, vetted contractors, and a clear path to building real equity.
          </p>

          <div className="hero-demo">
            <div className="demo-card">
              <div className="demo-label">Your Home Today</div>
              <div className="demo-value">$450,000</div>
              <div className="demo-source">Current Zillow Estimate</div>
            </div>
            <div className="demo-arrow">→</div>
            <div className="demo-card highlight">
              <div className="demo-label">After Smart Renovations</div>
              <div className="demo-value">$595,000</div>
              <div className="demo-gain">+$97k net gain</div>
            </div>
          </div>

          <button className="btn-hero" onClick={handleGetStarted}>
            See Your Home's Potential
          </button>
          <p className="hero-trust">Free • No credit card • Results in 60 seconds</p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stats-inner">
          <div className="stat">
            <div className="stat-num">$2.3M</div>
            <div className="stat-label">Value added for homeowners</div>
          </div>
          <div className="stat">
            <div className="stat-num">180%</div>
            <div className="stat-label">Average ROI on kitchen remodels</div>
          </div>
          <div className="stat">
            <div className="stat-num">12,438</div>
            <div className="stat-label">Projects completed</div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="problem">
        <div className="problem-inner">
          <h2 className="section-h2">Most Homeowners Renovate Backwards</h2>
          <p className="section-intro">
            They spend money on projects that feel right, not projects that add value.
          </p>

          <div className="problem-grid">
            <div className="problem-item">
              <div className="problem-bad">❌ $30K Deck</div>
              <div className="problem-result">Adds $8K in value</div>
              <div className="problem-loss">Net: -$22K</div>
            </div>
            <div className="problem-item">
              <div className="problem-good">✓ $15K Bathroom</div>
              <div className="problem-result">Adds $35K in value</div>
              <div className="problem-gain">Net: +$20K</div>
            </div>
            <div className="problem-item">
              <div className="problem-bad">❌ $25K Pool</div>
              <div className="problem-result">Adds $5K in value</div>
              <div className="problem-loss">Net: -$20K</div>
            </div>
            <div className="problem-item">
              <div className="problem-good">✓ $22K Kitchen</div>
              <div className="problem-result">Adds $45K in value</div>
              <div className="problem-gain">Net: +$23K</div>
            </div>
          </div>

          <div className="callout">
            <div className="callout-text">
              The average homeowner loses <strong>$18,000</strong> on renovations that don't add value.
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how">
        <div className="how-inner">
          <h2 className="section-h2">How It Actually Works</h2>
          <p className="section-intro">Three steps. Real numbers. Smart decisions.</p>

          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3 className="step-h3">Enter Your Address</h3>
              <p className="step-p">
                We pull your property data and current market value (just like Zillow does).
              </p>
            </div>

            <div className="step">
              <div className="step-num">2</div>
              <h3 className="step-h3">See Your ROI Breakdown</h3>
              <p className="step-p">
                Every renovation option shows cost vs. value added. Kitchen: $22k cost → $45k value. Bathroom: $15k → $35k. Real data for YOUR home.
              </p>
            </div>

            <div className="step">
              <div className="step-num">3</div>
              <h3 className="step-h3">Get Connected & Track Progress</h3>
              <p className="step-p">
                Choose your projects, get matched with vetted contractors, and watch your home's value grow in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="proof">
        <div className="proof-inner">
          <h2 className="section-h2">Real Homeowners, Real Results</h2>

          <div className="testimonials">
            <div className="testimonial">
              <div className="testimonial-quote">
                "My Zillow estimate was $420K. Assemble showed me a $16K bathroom remodel would push it to $455K. 
                Did the work. New Zillow estimate: $458K. Made $42K in equity."
              </div>
              <div className="testimonial-author">
                <strong>Jennifer M.</strong> • Portland, OR
              </div>
              <div className="testimonial-proof">
                <span className="proof-badge">Verified</span>
                <span className="proof-date">Completed March 2024</span>
              </div>
            </div>

            <div className="testimonial highlight">
              <div className="testimonial-quote">
                "Was about to spend $35K on a deck. Assemble showed it would only add $9K in value. 
                Spent $18K on kitchen instead—added $38K. Saved my ass."
              </div>
              <div className="testimonial-author">
                <strong>Marcus T.</strong> • Austin, TX
              </div>
              <div className="testimonial-proof">
                <span className="proof-badge">Verified</span>
                <span className="proof-date">Completed January 2024</span>
              </div>
            </div>

            <div className="testimonial">
              <div className="testimonial-quote">
                "Contractor quoted $42K for kitchen. Assemble connected me with someone who did it for $24K. 
                Same quality, better timeline. Home value went up $41K."
              </div>
              <div className="testimonial-author">
                <strong>David K.</strong> • Denver, CO
              </div>
              <div className="testimonial-proof">
                <span className="proof-badge">Verified</span>
                <span className="proof-date">Completed February 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="comparison">
        <div className="comparison-inner">
          <h2 className="section-h2">Zillow vs. Assemble</h2>
          
          <div className="compare-table">
            <div className="compare-row header">
              <div className="compare-cell"></div>
              <div className="compare-cell">Zillow</div>
              <div className="compare-cell highlight">Assemble</div>
            </div>
            <div className="compare-row">
              <div className="compare-cell label">Shows current home value</div>
              <div className="compare-cell">✓</div>
              <div className="compare-cell">✓</div>
            </div>
            <div className="compare-row">
              <div className="compare-cell label">Shows potential future value</div>
              <div className="compare-cell">—</div>
              <div className="compare-cell highlight">✓</div>
            </div>
            <div className="compare-row">
              <div className="compare-cell label">ROI projections per renovation</div>
              <div className="compare-cell">—</div>
              <div className="compare-cell highlight">✓</div>
            </div>
            <div className="compare-row">
              <div className="compare-cell label">Vetted contractor network</div>
              <div className="compare-cell">—</div>
              <div className="compare-cell highlight">✓</div>
            </div>
            <div className="compare-row">
              <div className="compare-cell label">Project tracking dashboard</div>
              <div className="compare-cell">—</div>
              <div className="compare-cell highlight">✓</div>
            </div>
          </div>

          <p className="comparison-note">
            Use Zillow to see where you are. Use Assemble to see where you could be.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <h2 className="cta-h2">Ready to See Your Home's Real Potential?</h2>
          <p className="cta-p">
            Enter your address. See which renovations will actually pay off. Make smarter decisions.
          </p>
          <button className="btn-final" onClick={handleGetStarted}>
            Get Started Free
          </button>
          <p className="cta-trust">12,000+ homeowners trust Assemble • 100% free • No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">Assemble</div>
          <div className="footer-text">
            Helping homeowners build real equity through smart renovations.
          </div>
          <div className="footer-copy">© 2024 Assemble. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default UltimateLandingPage;
