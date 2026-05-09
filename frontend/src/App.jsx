import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Pipeline from './components/Pipeline';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        
        <section id="about">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Actually is</span>
              <h2 className="section-title">More than just a directory</h2>
              <p className="sec-sub">needitstartup is not just an incubator or a funding portal. It is a comprehensive system for international scaling.</p>
            </div>

            <div className="card-grid">
              <div className="card">
                <div className="card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="card-title">Not just a portal</h3>
                <p className="text-muted">We aren't a funding portal or a freelancer agency. We are a strategic partner.</p>
              </div>
              <div className="card">
                <div className="card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <h3 className="card-title">Global Access</h3>
                <p className="text-muted">Providing direct paths to international markets, investors, and distributors.</p>
              </div>
              <div className="card">
                <div className="card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="card-title">The Bridge</h3>
                <p className="text-muted">Connecting startups with strategic partners, incubators, and business networks.</p>
              </div>
            </div>
          </div>
        </section>

        <Pipeline />

        <section id="audience" className="audience-bg">
          <div className="container">
            <div className="content-block reverse">
              <div className="content-text">
                <span className="section-tag">Who we serve</span>
                <h3>Precision Filtering for Maximum Trust</h3>
                <p className="text-muted" style={{ marginBottom: '24px' }}>We focus on high-potential entities to ensure the ecosystem remains premium and investor-grade.</p>
                <div className="trl-pill">TRL 6+ PRIORITIZATION</div>
                <ul className="card-list">
                  <li><strong>Startups:</strong> MVP, Early Revenue, and Growth-stage.</li>
                  <li><strong>Investors:</strong> Angels, VCs, and Strategic Firms.</li>
                  <li><strong>Partners:</strong> Incubators, Distributors, and Business Networks.</li>
                </ul>
              </div>
              <div className="content-visual" style={{ background: 'var(--primary)', height: '400px' }}>
                <div style={{ color: 'white', textAlign: 'center' }}>
                  <div style={{ fontSize: '64px', fontWeight: '800' }}>TRL 6+</div>
                  <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>High Professional Perception</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" style={{ textAlign: 'center' }}>
          <div className="container">
            <div style={{ background: 'var(--primary)', padding: '80px 40px', borderRadius: '40px', color: 'white' }}>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '24px' }}>Ready to Scale Globally?</h2>
              <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto 40px' }}>
                needitstartup takes you from local ambition to global execution. Join the ecosystem today.
              </p>
              <a href="#" className="btn" style={{ background: 'white', color: 'var(--primary)', fontSize: '1.1rem', padding: '16px 40px' }}>Apply for Global Expansion</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="#" className="logo" style={{ marginBottom: '20px' }}>
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="#4F46E5"/>
                  <path d="M10 22V10L22 22V10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                needitstartup
              </a>
              <p className="text-muted">Strategic growth, market access, and investor enablement. Your partner for international success.</p>
            </div>
            <div>
              <h4 className="footer-title">Platform</h4>
              <ul className="footer-links">
                <li><a href="#">Startup Growth</a></li>
                <li><a href="#">Expansion</a></li>
                <li><a href="#">Investment</a></li>
                <li><a href="#">Ecosystem</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Company</h4>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Mission</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Join our newsletter</h4>
              <p className="text-muted" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>Get the latest insights on global scaling.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="email" placeholder="Your email" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }} />
                <button className="btn btn-primary" style={{ padding: '12px' }}>Go</button>
              </div>
            </div>
          </div>
          <div className="copyright">
            &copy; 2026 needitstartup. All rights reserved. Strategic Global Scaling.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
