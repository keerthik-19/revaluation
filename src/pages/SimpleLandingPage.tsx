import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SimpleLandingPage.css';

const SimpleLandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="simple-landing">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">✓ Used by 12,000+ homeowners</div>
          
          <h1>
            Don't Start Your Renovation<br />
            Until You Know What It'll<br />
            Actually Cost
          </h1>
          
          <p className="hero-lead">
            Most homeowners overpay by $15,000+ because they don't know the real numbers.
            <br />Get an instant, accurate estimate in 60 seconds — then decide if you want to move forward.
          </p>

          <button className="cta-button" onClick={() => navigate('/tool')}>
            Get My Free Estimate
          </button>
          
          <p className="trust-line">No credit card • No sales call • Results in 60 seconds</p>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="stats-strip">
        <div className="container">
          <div className="stat">
            <div className="stat-number">$2.3M</div>
            <div className="stat-label">Saved by users</div>
          </div>
          <div className="stat">
            <div className="stat-number">12,438</div>
            <div className="stat-label">Estimates delivered</div>
          </div>
          <div className="stat">
            <div className="stat-number">94%</div>
            <div className="stat-label">Accuracy rate</div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="problem">
        <div className="container">
          <h2>Why This Exists</h2>
          <p className="section-intro">
            Because getting a renovation quote shouldn't mean calling 15 contractors, 
            waiting 3 weeks, and still not knowing if you're being ripped off.
          </p>

          <div className="pain-points">
            <div className="pain">
              <div className="pain-stat">$27K</div>
              <div className="pain-text">Average amount homeowners overpay when they don't know market rates</div>
            </div>
            <div className="pain">
              <div className="pain-stat">18 days</div>
              <div className="pain-text">Wasted waiting for contractors to call back (if they ever do)</div>
            </div>
            <div className="pain">
              <div className="pain-stat">6 months</div>
              <div className="pain-text">Project delayed because of one missed permit</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <p className="section-intro">Three steps. No fluff.</p>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Tell us about your project</h3>
              <p>Kitchen remodel? Bathroom upgrade? New deck? Takes 60 seconds.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get your instant estimate</h3>
              <p>Our AI analyzes millions of real projects to give you accurate costs. Right now.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Decide what to do next</h3>
              <p>Get permit requirements, find vetted contractors, or just use the number to negotiate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>What People Actually Say</h2>

          <div className="testimonial-grid">
            <div className="testimonial">
              <div className="quote">"Contractor quoted me $65k for a bathroom. Assemble said $42k. Got a second opinion — $41k. Saved $24,000."</div>
              <div className="author">— Sarah M., Portland</div>
            </div>

            <div className="testimonial highlight">
              <div className="quote">"I was about to pay $8k for permits I didn't even need. This tool told me exactly which ones I actually needed. Worth it."</div>
              <div className="author">— Marcus J., Austin</div>
            </div>

            <div className="testimonial">
              <div className="quote">"First time a contractor actually picked up the phone and showed up when they said they would. Found them through Assemble."</div>
              <div className="author">— Lisa K., Denver</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Stop Guessing. Start Knowing.</h2>
          <p>Get your free renovation estimate in 60 seconds</p>
          <button className="cta-button large" onClick={() => navigate('/tool')}>
            Show Me What It Costs
          </button>
          <p className="guarantee">100% free • No credit card • No sales pitch</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>© 2024 Assemble • Making renovations transparent</p>
        </div>
      </footer>
    </div>
  );
};

export default SimpleLandingPage;
