import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Code, 
  Send, 
  ArrowDown, 
  ArrowUpRight, 
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Instagram
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', text: '' });

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    // Launch mailto fallback with pre-filled message
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:giramallanavarbapugoud@gmail.com?subject=${subject}&body=${body}`;

    setFormStatus({ 
      type: 'notice', 
      text: 'Opening your email client to send the message directly to giramallanavarbapugoud@gmail.com.' 
    });
  };

  return (
    <div className="portfolio-app">
      {/* Global Header */}
      <header className="site-header">
        <div className="header-container">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="logo-brand">
            <span className="orange-dot"></span>
            BAPUGOUD G
          </a>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {['home', 'about', 'skills', 'projects', 'contact'].map((sec) => (
              <li key={sec}>
                <a
                  href={`#${sec}`}
                  onClick={(e) => scrollToSection(e, sec)}
                  className={`nav-item ${activeSection === sec ? 'active' : ''}`}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* =========================================================================
          01 / PRESENCE (Home)
          ========================================================================= */}
      <section id="home" className="hero-section">
        <div className="hero-top-meta">
          <div className="hero-status">
            <span className="orange-dot"></span>
            <span>ENGINEER. EDUCATOR. BUILDER.</span>
          </div>
          <div className="hero-location">
            BASED IN INDIA
          </div>
        </div>

        <div className="hero-content-wrap">
          {/* Left Vertical Section Markers */}
          <div className="hero-side-label">
            <span className="section-label" style={{ marginBottom: 0 }}>01 / PRESENCE</span>
            <div className="hero-side-plus">+</div>
            <div className="hero-side-words">
              ENGINEERING<br />
              EDUCATION<br />
              HUMAN CONNECTION
            </div>
          </div>

          {/* Hero Portrait with Halftone & Vignette Fade */}
          <div className="hero-portrait-container">
            <img 
              src="/assets/hero_portrait.png" 
              alt="Bapugoud Giramallanavar" 
              className="hero-portrait-img"
            />
          </div>

          {/* Name & Tagline Stack */}
          <div className="hero-text-stack">
            <div className="hero-tagline-caps">A HUMAN PERSPECTIVE ON TECHNOLOGY</div>
            <h1 className="hero-main-name">
              Bapugoud <span className="name-italic">Giramallanavar</span>
            </h1>
            <p className="hero-support-text">
              I build products, teach developers, and help education businesses grow.
            </p>

            <div className="hero-cta-group">
              <a 
                href="#projects" 
                onClick={(e) => scrollToSection(e, 'projects')} 
                className="btn-pill-explore"
              >
                <span>Explore my work</span>
                <ArrowDown className="arrow-down" size={14} />
              </a>

              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')} 
                className="btn-link-conversation"
              >
                <span>Start a conversation</span>
                <ArrowUpRight className="arrow-up-right" size={14} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Placeholder for vertical balance */}
        <div style={{ height: '10px' }}></div>
      </section>

      {/* =========================================================================
          02 / ABOUT ME
          ========================================================================= */}
      <section id="about" className="about-section">
        <div className="about-grid">
          <div className="about-text-col">
            <div className="section-label">02 / ABOUT ME</div>
            <h2 className="section-heading">About Me</h2>
            
            <p className="about-bio-text">
              Hi, I’m Bapugoud Giramallanavar, a Computer Science Engineering student passionate about 
              building meaningful digital experiences. I love coding, solving problems, and learning new 
              technologies. I aim to create solutions that make an impact — whether through web applications, 
              AI, or real-world problem solving.
            </p>

            <div className="about-info-rows">
              <div className="about-info-row">
                <div className="about-info-icon">
                  <GraduationCap size={20} />
                </div>
                <span>CSE | KLS Gogte Institute of Technology</span>
              </div>

              <div className="about-info-row">
                <div className="about-info-icon">
                  <MapPin size={20} />
                </div>
                <span>Karnataka, India</span>
              </div>

              <div className="about-info-row">
                <div className="about-info-icon">
                  <Code size={20} />
                </div>
                <span>Always learning, always building.</span>
              </div>
            </div>
          </div>

          <div className="about-media-col">
            <div className="about-portrait-wrap">
              <img 
                src="/assets/about_portrait.png" 
                alt="Bapugoud Giramallanavar portrait" 
                className="about-portrait-img" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          03 / SKILLS
          ========================================================================= */}
      <section id="skills" className="skills-section">
        <div className="section-label">03 / SKILLS</div>
        <h2 className="section-heading">My <em>Skills</em></h2>
        <p className="section-subtitle">
          Technologies and tools I’ve worked with and continue to learn.
        </p>

        <div className="skills-layout">
          <div className="skills-grid">
            {/* Card 1: C++ */}
            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon-wrap">
                  <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                    <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="#00599C" stroke="#2582cb" strokeWidth="2" />
                    <text x="32" y="62" fill="white" fontFamily="Inter, sans-serif" fontWeight="bold" fontSize="36">C</text>
                    <text x="58" y="44" fill="#659ad2" fontFamily="Inter, sans-serif" fontWeight="bold" fontSize="18">++</text>
                  </svg>
                </div>
                <div className="skill-title">C++</div>
              </div>
              <p className="skill-desc">Problem Solving<br />&amp; DSA</p>
            </div>

            {/* Card 2: C */}
            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon-wrap">
                  <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                    <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="#004482" stroke="#2171b5" strokeWidth="2" />
                    <text x="35" y="65" fill="white" fontFamily="Inter, sans-serif" fontWeight="bold" fontSize="42">C</text>
                  </svg>
                </div>
                <div className="skill-title">C</div>
              </div>
              <p className="skill-desc">System Programming<br />&amp; Fundamentals</p>
            </div>

            {/* Card 3: Python */}
            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon-wrap">
                  <svg width="36" height="36" viewBox="0 0 110 110">
                    <path d="M54.5 10 C32 10 33 20 33 20 L33 30 L55 30 L55 33 L24 33 C14 33 6 40 6 54 C6 68 12 73 20 73 L26 73 L26 62 C26 50 36 49 46 49 L68 49 C74 49 79 44 79 38 L79 23 C79 14 72 10 54.5 10 Z" fill="#3776AB" />
                    <circle cx="43" cy="21" r="3.5" fill="white" />
                    <path d="M55.5 100 C78 100 77 90 77 90 L77 80 L55 80 L55 77 L86 77 C96 77 104 70 104 56 C104 42 98 37 90 37 L84 37 L84 48 C84 60 74 61 64 61 L42 61 C36 61 31 66 31 72 L31 87 C31 96 38 100 55.5 100 Z" fill="#FFD43B" />
                    <circle cx="67" cy="89" r="3.5" fill="white" />
                  </svg>
                </div>
                <div className="skill-title">Python</div>
              </div>
              <p className="skill-desc">Scripting &amp;<br />Automation</p>
            </div>

            {/* Card 4: HTML */}
            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon-wrap">
                  <svg width="36" height="36" viewBox="0 0 512 512">
                    <path fill="#E34F26" d="M71 460L30 0h452l-41 460-185 52"/>
                    <path fill="#EF652A" d="M256 472l149-41 35-391H256"/>
                    <path fill="#EBEBEB" d="M256 176h-60l-4-46h64V84H140l12 138h104m0 93h-52l-3-38h-46l7 86 94 26"/>
                    <path fill="#FFF" d="M256 176h60l-6 64h-54v46h50l-5 54-45 12v48l93-26 13-152H256"/>
                  </svg>
                </div>
                <div className="skill-title">HTML</div>
              </div>
              <p className="skill-desc">Web Structure<br />&amp; Semantic</p>
            </div>

            {/* Card 5: CSS */}
            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon-wrap">
                  <svg width="36" height="36" viewBox="0 0 512 512">
                    <path fill="#1572B6" d="M71 460L30 0h452l-41 460-185 52"/>
                    <path fill="#33A9DC" d="M256 472l149-41 35-391H256"/>
                    <path fill="#EBEBEB" d="M256 208h-55l-4-46h59V116H144l11 138h101m0 94l-45-12-3-38h-46l6 86 88 24"/>
                    <path fill="#FFF" d="M256 208h55l-5 54-50 14v48l88-24 12-138H256m0-46h107l4-46H256"/>
                  </svg>
                </div>
                <div className="skill-title">CSS</div>
              </div>
              <p className="skill-desc">Styling &amp; Responsive<br />Design</p>
            </div>

            {/* Card 6: Git & GitHub */}
            <div className="skill-card">
              <div className="skill-header">
                <div className="skill-icon-wrap">
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Github size={20} color="#000" />
                  </div>
                </div>
                <div className="skill-title">Git &amp; GitHub</div>
              </div>
              <p className="skill-desc">Version Control<br />&amp; Collaboration</p>
            </div>
          </div>

          {/* Right Decorative Motif */}
          <div className="skills-doodle-col">
            <img 
              src="/assets/skills_motif.png" 
              alt="Code Learn Improve Repeat" 
              className="skills-doodle-img" 
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          04 / PROJECTS
          ========================================================================= */}
      <section id="projects" className="projects-section">
        <div className="section-label">04 / PROJECTS</div>
        <h2 className="section-heading">My <em>Projects</em></h2>
        <p className="section-subtitle">
          A collection of projects I’ve built to learn, solve problems and explore new technologies.
        </p>

        <div className="projects-grid">
          {/* Project 1 */}
          <a 
            href="https://github.com/giramallanavarbapugoud-ui" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-card"
          >
            <div className="project-thumb-wrap">
              <img src="/assets/thumb_anime.png" alt="Anime Movies Website" className="project-thumb" />
            </div>
            <div className="project-info">
              <h3 className="project-title">Anime Movies Website</h3>
              <p className="project-desc">
                React + Node.js | Anime Streaming Platform with modern UI, filters, and more.
              </p>
            </div>
            <div className="project-arrow-btn">
              <ArrowRight size={14} />
            </div>
          </a>

          {/* Project 2 */}
          <a 
            href="https://github.com/giramallanavarbapugoud-ui" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-card"
          >
            <div className="project-thumb-wrap">
              <img src="/assets/thumb_farm.png" alt="Farm Equipment Hub" className="project-thumb" />
            </div>
            <div className="project-info">
              <h3 className="project-title">Farm Equipment Hub</h3>
              <p className="project-desc">
                HTML &amp; CSS | Farm equipment rental and sales platform (10+ tractor models).
              </p>
            </div>
            <div className="project-arrow-btn">
              <ArrowRight size={14} />
            </div>
          </a>

          {/* Project 3 */}
          <a 
            href="https://github.com/giramallanavarbapugoud-ui" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-card"
          >
            <div className="project-thumb-wrap">
              <img src="/assets/thumb_orca.png" alt="ORCA - Marine Intelligence" className="project-thumb" />
            </div>
            <div className="project-info">
              <h3 className="project-title">ORCA – Marine Intelligence</h3>
              <p className="project-desc">
                Marine data + AI | Fishing intelligence, weather, PFZ, and ocean insights.
              </p>
            </div>
            <div className="project-arrow-btn">
              <ArrowRight size={14} />
            </div>
          </a>

          {/* Project 4 */}
          <a 
            href="https://github.com/giramallanavarbapugoud-ui" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-card"
          >
            <div className="project-thumb-wrap">
              <img src="/assets/thumb_normvault.png" alt="NORMVAULT - SIH 26108" className="project-thumb" />
            </div>
            <div className="project-info">
              <h3 className="project-title">NORMVAULT – SIH 26108</h3>
              <p className="project-desc">
                AI procurement engine for Indian Standards and certification check.
              </p>
            </div>
            <div className="project-arrow-btn">
              <ArrowRight size={14} />
            </div>
          </a>
        </div>
      </section>

      {/* =========================================================================
          05 / CONTACT
          ========================================================================= */}
      <section id="contact" className="contact-section">
        {/* Background contour graphic */}
        <div className="contact-contour-bg"></div>

        <div className="section-label">05 / CONTACT</div>
        <h2 className="section-heading">Get In Touch</h2>
        <p className="section-subtitle">
          Have a project in mind, a question, or just want to say hi?<br />
          Feel free to reach out — I’d love to connect!
        </p>

        <div className="contact-layout">
          {/* Left Column: Social Links */}
          <div className="social-links-container">
            <div className="social-links-bar">
              <a 
                href="https://github.com/giramallanavarbapugoud-ui" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-item"
              >
                <div className="social-icon-box">
                  <Github size={20} />
                </div>
                <div className="social-text">
                  <span className="social-name">GitHub</span>
                  <span className="social-handle">@giramallanavarbapugoud-ui</span>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/bapugoud-giramallanavar-420310385/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-item"
              >
                <div className="social-icon-box">
                  <Linkedin size={20} />
                </div>
                <div className="social-text">
                  <span className="social-name">LinkedIn</span>
                  <span className="social-handle">/in/bapugoud-giramallanavar</span>
                </div>
              </a>

              <a 
                href="mailto:giramallanavarbapugoud@gmail.com" 
                className="social-item"
              >
                <div className="social-icon-box">
                  <Mail size={20} />
                </div>
                <div className="social-text">
                  <span className="social-name">Email</span>
                  <span className="social-handle">giramallanavarbapugoud@gmail.com</span>
                </div>
              </a>

              <a 
                href="https://instagram.com/bapugoud_giramallanavar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-item"
              >
                <div className="social-icon-box">
                  <Instagram size={20} />
                </div>
                <div className="social-text">
                  <span className="social-name">Instagram</span>
                  <span className="social-handle">@bapugoud_giramallanavar</span>
                </div>
              </a>
            </div>

            <div className="contact-divider"></div>

            <div className="contact-motto">
              Let’s build something great together.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-card">
            <form onSubmit={handleFormSubmit} noValidate>
              <div className="form-row-dual">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="contact-name" className="form-label">
                    Name <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label htmlFor="contact-email" className="form-label">
                    Email <span className="required-star">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Message <span className="required-star">*</span>
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Write your message..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-send-message">
                <Send size={15} />
                <span>Send Message</span>
              </button>

              {formStatus.text && (
                <div className={`form-status-msg ${formStatus.type}`}>
                  {formStatus.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Bapugoud Giramallanavar. All rights reserved.</p>
      </footer>
    </div>
  );
}
