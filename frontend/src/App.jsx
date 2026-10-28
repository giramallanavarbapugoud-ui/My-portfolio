import React, { useState, useEffect } from 'react';
import RetroDesktop from './RetroDesktop';
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
  Instagram,
  Laptop,
  Database
} from 'lucide-react';

const skillCategories = [
  {
    id: 'programming',
    title: 'PROGRAMMING LANGUAGES',
    desc: 'Languages I use to build and solve problems.',
    skills: ['C++', 'C', 'Python', 'JavaScript'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
        <line x1="14" y1="4" x2="10" y2="20"></line>
      </svg>
    )
  },
  {
    id: 'web',
    title: 'WEB DEVELOPMENT',
    desc: 'Frontend technologies for modern web apps.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    icon: <Laptop size={22} strokeWidth={1.8} />
  },
  {
    id: 'databases',
    title: 'DATABASES',
    desc: 'Data storage and management systems.',
    skills: ['MongoDB', 'MySQL'],
    icon: <Database size={22} strokeWidth={1.8} />
  },
  {
    id: 'tools',
    title: 'TOOLS & DESIGN',
    desc: 'Development tools and design platforms.',
    skills: ['Git & GitHub', 'VS Code', 'Figma'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    )
  }
];

const orbitSkills = [
  {
    id: 'cpp',
    name: 'C++',
    category: 'programming',
    className: 'orbit-cpp',
    icon: (
      <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
        <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="#00599C" stroke="#2582cb" strokeWidth="2" />
        <text x="32" y="62" fill="white" fontFamily="Inter, sans-serif" fontWeight="bold" fontSize="36">C</text>
        <text x="58" y="44" fill="#659ad2" fontFamily="Inter, sans-serif" fontWeight="bold" fontSize="18">++</text>
      </svg>
    )
  },
  {
    id: 'c',
    name: 'C',
    category: 'programming',
    className: 'orbit-c',
    icon: (
      <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
        <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="#004482" stroke="#2171b5" strokeWidth="2" />
        <text x="35" y="65" fill="white" fontFamily="Inter, sans-serif" fontWeight="bold" fontSize="42">C</text>
      </svg>
    )
  },
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    className: 'orbit-python',
    icon: (
      <svg width="22" height="22" viewBox="0 0 110 110">
        <path d="M54.5 10 C32 10 33 20 33 20 L33 30 L55 30 L55 33 L24 33 C14 33 6 40 6 54 C6 68 12 73 20 73 L26 73 L26 62 C26 50 36 49 46 49 L68 49 C74 49 79 44 79 38 L79 23 C79 14 72 10 54.5 10 Z" fill="#3776AB" />
        <circle cx="43" cy="21" r="3.5" fill="white" />
        <path d="M55.5 100 C78 100 77 90 77 90 L77 80 L55 80 L55 77 L86 77 C96 77 104 70 104 56 C104 42 98 37 90 37 L84 37 L84 48 C84 60 74 61 64 61 L42 61 C36 61 31 66 31 72 L31 87 C31 96 38 100 55.5 100 Z" fill="#FFD43B" />
        <circle cx="67" cy="89" r="3.5" fill="white" />
      </svg>
    )
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'web',
    className: 'orbit-html',
    icon: (
      <svg width="22" height="22" viewBox="0 0 512 512">
        <path fill="#E34F26" d="M71 460L30 0h452l-41 460-185 52"/>
        <path fill="#EF652A" d="M256 472l149-41 35-391H256"/>
        <path fill="#EBEBEB" d="M256 176h-60l-4-46h64V84H140l12 138h104m0 93h-52l-3-38h-46l7 86 94 26"/>
        <path fill="#FFF" d="M256 176h60l-6 64h-54v46h50l-5 54-45 12v48l93-26 13-152H256"/>
      </svg>
    )
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'web',
    className: 'orbit-css',
    icon: (
      <svg width="22" height="22" viewBox="0 0 512 512">
        <path fill="#1572B6" d="M71 460L30 0h452l-41 460-185 52"/>
        <path fill="#33A9DC" d="M256 472l149-41 35-391H256"/>
        <path fill="#EBEBEB" d="M256 208h-55l-4-46h59V116H144l11 138h101m0 94l-45-12-3-38h-46l6 86 88 24"/>
        <path fill="#FFF" d="M256 208h55l-5 54-50 14v48l88-24 12-138H256m0-46h107l4-46H256"/>
      </svg>
    )
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tools',
    className: 'orbit-git',
    icon: (
      <div className="orbit-github-circle">
        <Github size={15} color="#000" />
      </div>
    )
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    className: 'orbit-vscode',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.27a1 1 0 0 0-.006 1.465l3.868 3.522-3.868 3.522a1 1 0 0 0 .006 1.465l1.322 1.212a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.94a1.5 1.5 0 0 0-.85-1.353zm-6.65 13.913l-6.526-4.248L16.5 7.999v8.501z" fill="#007ACC"/>
      </svg>
    )
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'tools',
    className: 'orbit-figma',
    icon: (
      <svg width="18" height="24" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z" fill="#1ABCFE"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5A9.5 9.5 0 1 1 0 47.5z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
      </svg>
    )
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'databases',
    className: 'orbit-mysql',
    icon: (
      <svg width="24" height="24" viewBox="0 0 128 128">
        <path fill="#00758F" d="M117.688 98.242c-6.973-.191-12.297.461-16.852 2.379-1.293.547-3.355.559-3.566 2.18.711.746.82 1.859 1.387 2.777 1.086 1.754 2.922 4.113 4.559 5.352 1.789 1.348 3.633 2.793 5.551 3.961 3.414 2.082 7.223 3.27 10.504 5.352 1.938 1.23 3.859 2.777 5.75 4.164.934.684 1.563 1.75 2.773 2.18v-.195c-.637-.812-.801-1.93-1.387-2.777l-2.578-2.578c-2.52-3.344-5.719-6.281-9.117-8.719-2.711-1.949-8.781-4.578-9.91-7.73l-.199-.199c1.922-.219 4.172-.914 5.949-1.391 2.98-.797 5.645-.59 8.719-1.387l4.164-1.187v-.793c-1.555-1.594-2.664-3.707-4.359-5.152-4.441-3.781-9.285-7.555-14.273-10.703-2.766-1.746-6.184-2.883-9.117-4.363-.988-.496-2.719-.758-3.371-1.586-1.539-1.961-2.379-4.449-3.566-6.738-2.488-4.793-4.93-10.023-7.137-15.066-1.504-3.437-2.484-6.828-4.359-9.91-9-14.797-18.687-23.73-33.695-32.508-3.195-1.867-7.039-2.605-11.102-3.57l-6.543-.395c-1.332-.555-2.715-2.184-3.965-2.977C16.977 3.52 4.223-3.312.539 5.672-1.785 11.34 4.016 16.871 6.09 19.746c1.457 2.012 3.32 4.273 4.359 6.539.688 1.492.805 2.984 1.391 4.559 1.438 3.883 2.695 8.109 4.559 11.695.941 1.816 1.98 3.727 3.172 5.352.727.996 1.98 1.438 2.18 2.973-1.227 1.715-1.297 4.375-1.984 6.543-3.098 9.77-1.926 21.91 2.578 29.137 1.383 2.223 4.641 6.98 9.117 5.156 3.918-1.598 3.043-6.539 4.164-10.902.254-.988.098-1.715.594-2.379v.199l3.57 7.133c2.641 4.254 7.324 8.699 11.297 11.699 2.059 1.555 3.68 4.242 6.344 5.152v-.199h-.199c-.516-.805-1.324-1.137-1.98-1.781-1.551-1.523-3.277-3.414-4.559-5.156-3.613-4.902-6.805-10.27-9.711-15.855-1.391-2.668-2.598-5.609-3.77-8.324-.453-1.047-.445-2.633-1.387-3.172-1.281 1.988-3.172 3.598-4.164 5.945-1.582 3.754-1.789 8.336-2.375 13.082-.348.125-.195.039-.398.199-2.762-.668-3.73-3.508-4.758-5.949-2.594-6.164-3.078-16.09-.793-23.191.59-1.836 3.262-7.617 2.18-9.316-.516-1.691-2.219-2.672-3.172-3.965-1.18-1.598-2.355-3.703-3.172-5.551-2.125-4.805-3.113-10.203-5.352-15.062-1.07-2.324-2.875-4.676-4.359-6.738-1.645-2.289-3.484-3.977-4.758-6.742-.453-.984-1.066-2.559-.398-3.566.215-.684.516-.969 1.191-1.191 1.148-.887 4.352.297 5.547.793 3.18 1.32 5.832 2.578 8.527 4.363 1.289.855 2.598 2.512 4.16 2.973h1.785c2.789.641 5.914.195 8.523.988 4.609 1.402 8.738 3.582 12.488 5.949 11.422 7.215 20.766 17.48 27.156 29.734 1.027 1.973 1.473 3.852 2.379 5.945 1.824 4.219 4.125 8.559 5.941 12.688 1.816 4.113 3.582 8.27 6.148 11.695 1.348 1.801 6.551 2.766 8.918 3.766 1.66.699 4.379 1.43 5.949 2.379 3 1.809 5.906 3.965 8.723 5.945 1.402.992 5.73 3.168 5.945 4.957zm-88.605-75.52c-1.453-.027-2.48.156-3.566.395v.199h.195c.695 1.422 1.918 2.34 2.777 3.566l1.98 4.164.199-.195c1.227-.867 1.789-2.25 1.781-4.363-.492-.52-.562-1.164-.992-1.785-.562-.824-1.66-1.289-2.375-1.98z"/>
      </svg>
    )
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'databases',
    className: 'orbit-mongodb',
    icon: (
      <svg width="20" height="24" viewBox="0 0 24 24">
        <path d="M12 1.5C11.5 2 7 7.5 7 13.5c0 3.3 2.1 6.3 5 7.5 2.9-1.2 5-4.2 5-7.5 0-6-4.5-11.5-5-12z" fill="#13AA52" />
        <path d="M12 1.5v19.5c.3-.1.7-.3 1-.5 2.5-1.2 4-3.8 4-7 0-5.5-4-10.5-5-12z" fill="#119245" />
        <path d="M12 18.5c-.3 0-.7.3-.8.7-.2.6-.4 1.1-.5 1.5.4.2.9.3 1.3.3.4 0 .9-.1 1.3-.3-.1-.4-.3-.9-.5-1.5-.1-.4-.5-.7-.8-.7z" fill="#A6E3B8" />
      </svg>
    )
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'programming',
    className: 'orbit-javascript',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
        <path d="M18.5 22.8c.8.5 1.7.9 2.7.9 1.1 0 1.7-.5 1.7-1.3 0-.9-.6-1.2-1.9-1.8-1.7-.7-2.8-1.7-2.8-3.4 0-1.7 1.3-3.1 3.5-3.1 1.2 0 2.1.3 2.8.7l-.8 1.9c-.6-.4-1.3-.7-2-.7-.8 0-1.3.4-1.3 1 0 .7.5 1 1.8 1.6 1.9.8 2.9 1.7 2.9 3.6 0 1.9-1.4 3.3-3.9 3.3-1.4 0-2.6-.4-3.5-1l.7-2.1zm-8.2-.1c.6.4 1.3.6 2 .6.9 0 1.5-.4 1.5-1.5V14.3h2.3v7.6c0 2.3-1.4 3.3-3.6 3.3-1.1 0-2.1-.3-2.8-.8l.6-1.7z" fill="#000"/>
      </svg>
    )
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('programming');
  
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
    <RetroDesktop>
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
        <div className="skills-content-container">
          {/* Top Half: Intro + Categories (Left) & Orbit Visualization (Right) */}
          <div className="skills-main-row">
            {/* Left Column: Heading & Skill Categories */}
            <div className="skills-left-col">
              <div className="section-label">03 / SKILLS</div>
              <h2 className="section-heading skills-main-title">My Skills</h2>
              <p className="skills-main-subtitle">
                Technologies and tools I’ve worked with and continue to learn.
              </p>

              <div className="skills-category-list">
                {skillCategories.map((cat) => {
                  const isActive = activeSkillCategory === cat.id;
                  return (
                    <div 
                      key={cat.id} 
                      className={`skills-category-item ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveSkillCategory(cat.id)}
                      onMouseEnter={() => setActiveSkillCategory(cat.id)}
                    >
                      <div className="category-indicator-bar"></div>
                      <div className="category-icon-box">
                        {cat.icon}
                      </div>
                      <div className="category-text-box">
                        <h3 className="category-title">{cat.title}</h3>
                        <p className="category-desc">{cat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Orbit Visualization with Real Portrait */}
            <div className="skills-orbit-wrapper">
              <div className="skills-orbit-stage">
                {/* Concentric Orbit Rings */}
                <div className="orbit-ring orbit-ring-inner"></div>
                <div className="orbit-ring orbit-ring-middle"></div>
                <div className="orbit-ring orbit-ring-outer"></div>

                {/* Orbit Markers (Small Glowing Copper-Orange Dots) */}
                <div className="orbit-marker marker-1"></div>
                <div className="orbit-marker marker-2"></div>
                <div className="orbit-marker marker-3"></div>
                <div className="orbit-marker marker-4"></div>
                <div className="orbit-marker marker-5"></div>
                <div className="orbit-marker marker-6"></div>
                <div className="orbit-marker marker-7"></div>
                <div className="orbit-marker marker-8"></div>
                <div className="orbit-marker marker-9"></div>

                {/* Center Real Monochrome Portrait of Bapugoud */}
                <div className="skills-portrait-center">
                  <div className="skills-portrait-ring">
                    <img 
                      src="/assets/hero_portrait.png" 
                      alt="Bapugoud Giramallanavar" 
                      className="skills-portrait-img"
                    />
                  </div>
                </div>

                {/* 11 Floating Technology Badges */}
                {orbitSkills.map((skill) => {
                  const isHighlighted = activeSkillCategory && skill.category === activeSkillCategory;
                  return (
                    <div 
                      key={skill.id} 
                      className={`orbit-skill-pill ${skill.className} ${isHighlighted ? 'highlighted' : ''}`}
                      onClick={() => setActiveSkillCategory(skill.category)}
                    >
                      <span className="pill-icon">{skill.icon}</span>
                      <span className="pill-name">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Information Panel */}
          <div className="skills-bottom-panel">
            {/* Left: Star Icon + Motto */}
            <div className="panel-col panel-motto-col">
              <div className="panel-star-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#F08050"/>
                </svg>
              </div>
              <div className="panel-divider"></div>
              <div className="panel-motto-text">
                <h3 className="panel-motto-quote">Always learning, always building.</h3>
                <p className="panel-motto-desc">
                  These are the tools and technologies I work with, but I'm always eager to learn and explore new ones.
                </p>
              </div>
            </div>

            <div className="panel-divider panel-divider-main"></div>

            {/* Middle: 3 Statistics */}
            <div className="panel-col panel-stats-col">
              <div className="panel-stat-item">
                <span className="stat-number">11+</span>
                <span className="stat-label">SKILLS</span>
              </div>
              <div className="panel-stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">TECHNOLOGIES</span>
              </div>
              <div className="panel-stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">DEDICATION</span>
              </div>
            </div>

            <div className="panel-divider panel-divider-main"></div>

            {/* Right: Small Code Editor Snippet + Orange Arrow */}
            <div className="panel-col panel-code-col">
              <div className="panel-code-box">
                <div className="code-line-numbers">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                </div>
                <pre className="code-editor-text">
                  <code>
                    <span className="code-kw">while</span> (learning) &#123;{'\n'}
                    {'    '}improve();{'\n'}
                    {'    '}build();{'\n'}
                    &#125;
                  </code>
                </pre>
              </div>
              <div className="panel-arrow-wrap">
                <ArrowRight size={20} className="panel-orange-arrow" />
              </div>
            </div>
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
                href="https://www.instagram.com/bapugoud00/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-item"
              >
                <div className="social-icon-box">
                  <Instagram size={20} />
                </div>
                <div className="social-text">
                  <span className="social-name">Instagram</span>
                  <span className="social-handle">@bapugoud00</span>
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
    </RetroDesktop>
  );
}
