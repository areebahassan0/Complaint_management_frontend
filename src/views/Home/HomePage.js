import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import energyBg from '../../assets/css/logo_make_11_06_2023_20.jpg';

const LandingPage = () => {
  const [paused, setPaused] = React.useState(false);
  const handleToggle = () => setPaused((p) => !p);

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <div className="homepage-hero">
        <h1 className="homepage-title">Welcome to KEnergy-Link</h1>
        <p className="homepage-subtitle">
          Your one-stop solution for energy management, billing, and customer support.
        </p>
        <div className="homepage-button-row">
          <Link to="/dashboard" className="homepage-button">Complaint Dashboard</Link>
          <Link to="/consumption-dashboard" className="homepage-button">Consumption Dashboard</Link>
          <Link to="/bills" className="homepage-button">Billings Dashboard</Link>
        </div>
      </div>

      {/* Why Choose KEnergy-Link Section */}
      <div className="homepage-why">
        <button className="homepage-service-btn">Our Services</button>
        <h2 className="homepage-why-title">Why Choose KEnergy-Link?</h2>
        <p className="homepage-why-text">
          Experience seamless energy management with <span className="homepage-highlight">real-time consumption tracking</span>,
          easy bill payments, and dedicated customer support. KEnergy-Link empowers you to take control of your energy needs with reliability and innovation.
        </p>
      </div>

      {/* Dashboard Cards Section */}
      <div className="homepage-cards-row">
        {/* Complaint Dashboard Card */}
        <div className="homepage-card">
          <h3 className="homepage-card-title">Complaint Dashboard</h3>
          <ul className="homepage-card-list">
            <li>✔ Lodge and track complaints easily</li>
            <li>✔ Real-time complaint status updates</li>
            <li>✔ Direct communication with support</li>
          </ul>
          <Link to="/dashboard" className="homepage-card-btn">Go to Complaint Dashboard</Link>
        </div>
        {/* Consumption Dashboard Card */}
        <div className="homepage-card">
          <h3 className="homepage-card-title">Consumption Dashboard</h3>
          <ul className="homepage-card-list">
            <li>✔ Monitor your energy usage</li>
            <li>✔ Get detailed consumption reports</li>
            <li>✔ Insights for efficient energy use</li>
          </ul>
          <Link to="/consumption-dashboard" className="homepage-card-btn">Go to Consumption Dashboard</Link>
        </div>
        {/* Billings Dashboard Card */}
        <div className="homepage-card">
          <h3 className="homepage-card-title">Billings Dashboard</h3>
          <ul className="homepage-card-list">
            <li>✔ View and download your bills</li>
            <li>✔ Secure online bill payments</li>
            <li>✔ Billing history and reminders</li>
          </ul>
          <Link to="/bills" className="homepage-card-btn">Go to Billings Dashboard</Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="homepage-faq">
        <button className="homepage-faq-btn">FAQ</button>
        <h2 className="homepage-faq-title">Frequently Asked Questions</h2>
        <p className="homepage-faq-subtitle">Find quick answers to common questions about KEnergy-Link's services, features, and support.</p>
        <FAQ />
      </div>

      {/* Footer Section */}
      <footer className="homepage-footer">
        <div className="homepage-footer-left">
          <div className="homepage-logo-row">
            <div className="homepage-logo-icon"></div>
            <span className="homepage-logo-text">KEnergy-Link</span>
          </div>
          <div className="homepage-slogan">Say goodbye to exam stress!</div>
          <div className="homepage-copyright">© KEnergy-Link 2024. All rights reserved.</div>
        </div>
        <div className="homepage-footer-center">
          <div className="homepage-contact-title">Contact</div>
          <div className="homepage-contact-row"><span className="homepage-contact-icon">✉️</span> info@ke-link.com</div>
          <div className="homepage-contact-row"><span className="homepage-contact-icon">📞</span> +92 331 9765860</div>
        </div>
        <div className="homepage-footer-right">
          <div className="homepage-follow-title">Follow Us</div>
          <div className="homepage-social-icons">
            <a href="#" className="homepage-social-icon"><span role="img" aria-label="LinkedIn">🔗</span></a>
            <a href="#" className="homepage-social-icon"><span role="img" aria-label="YouTube">▶️</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// FAQ Component
const FAQ = () => {
  const [open, setOpen] = React.useState(null);
  const faqs = [
    {
      q: 'How can I track my energy consumption?',
      a: 'Log in to your KEnergy-Link account and visit the Consumption Dashboard for real-time tracking and detailed reports.'
    },
    {
      q: 'How do I pay my electricity bill online?',
      a: 'Go to the Billings Dashboard, select your bill, and choose from multiple secure payment options.'
    },
    {
      q: 'What support does KEnergy-Link provide?',
      a: 'We offer 24/7 customer support for all your energy management, billing, and technical queries.'
    }
  ];
  return (
    <div>
      {faqs.map((item, idx) => (
        <div key={idx} className="homepage-faq-item">
          <div
            className="homepage-faq-question"
            onClick={() => setOpen(open === idx ? null : idx)}
            tabIndex={0}
            role="button"
            aria-expanded={open === idx}
          >
            {item.q}
            <span className="homepage-faq-arrow">{open === idx ? '▲' : '▼'}</span>
          </div>
          <div className={open === idx ? 'homepage-faq-expand' : 'homepage-faq-collapse'}>
            {open === idx && <div className="homepage-faq-answer">{item.a}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingPage;

