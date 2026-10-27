import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './retro-os.css';

export default function RetroDesktop({ children }) {
  const [time, setTime] = useState('');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const desktopIconsRef = useRef(null);
  const taskbarRef = useRef(null);
  const windowContainerRef = useRef(null);
  const cursorRef = useRef(null);
  const timelineRef = useRef(null);

  // Live Digital Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // 10-12 Second Cinematic Animation Sequence
  const runCinematicSequence = () => {
    setIsAnimating(true);
    setIsMinimized(false);
    setSelectedIcon(null);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });
    timelineRef.current = tl;

    // Initial resets
    gsap.set(desktopIconsRef.current ? desktopIconsRef.current.children : [], { opacity: 0, y: 14 });
    gsap.set(taskbarRef.current, { y: '100%' });
    gsap.set(windowContainerRef.current, { opacity: 0, scale: 0.85, y: 25 });
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 0, x: 600, y: 400 });
    }

    // --- Scene 1: Retro Desktop Appears (0.0s – 2.0s) ---
    // Staggered desktop icons reveal
    if (desktopIconsRef.current) {
      tl.to(desktopIconsRef.current.children, {
        opacity: 1,
        y: 0,
        stagger: 0.18,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.3);
    }

    // Taskbar slides up from bottom
    tl.to(taskbarRef.current, {
      y: '0%',
      duration: 0.7,
      ease: 'power3.out'
    }, 0.9);

    // --- Scene 2: Main Window Opens (2.0s – 4.0s) ---
    tl.to(windowContainerRef.current, {
      opacity: 1,
      scale: 1.0,
      y: 0,
      duration: 1.15,
      ease: 'back.out(1.15)'
    }, 2.2);

    // --- Scene 3: Content inside Window Reveals (4.0s – 7.0s) ---
    tl.fromTo('.site-header', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 4.0);
    tl.fromTo('.hero-portrait-container', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1.0, duration: 1.3, ease: 'power2.out' }, 4.5);
    tl.fromTo('.hero-main-name', { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.85, ease: 'power2.out' }, 5.2);
    tl.fromTo('.hero-tagline-caps, .hero-support-text', { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 }, 5.6);

    // --- Scene 4: Buttons and Desktop Interaction (7.0s – 9.0s) ---
    tl.fromTo('.hero-cta-group', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 6.8);

    if (cursorRef.current) {
      // Cursor glides in towards desktop Photos icon
      tl.to(cursorRef.current, { opacity: 1, duration: 0.2 }, 7.4)
        .to(cursorRef.current, { x: 52, y: 110, duration: 0.9, ease: 'power2.inOut' }, 7.6)
        // Click action: select Photos icon
        .call(() => setSelectedIcon('photos'), null, 8.5)
        .to(cursorRef.current, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 }, 8.5)
        // Cursor settles aside, unselect icon
        .to(cursorRef.current, { x: 90, y: 150, opacity: 0.7, duration: 0.6, ease: 'power1.out' }, 8.9)
        .call(() => setSelectedIcon(null), null, 9.2);
    }

    // --- Scene 5: Ambient Hold (9.0s – 12.0s) ---
    // Steady state established
    tl.call(() => setIsAnimating(false), null, 10.0);
  };

  useEffect(() => {
    runCinematicSequence();
    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  const skipSequence = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
    setIsAnimating(false);
    setSelectedIcon(null);
    gsap.set(desktopIconsRef.current ? desktopIconsRef.current.children : [], { opacity: 1, y: 0 });
    gsap.set(taskbarRef.current, { y: '0%' });
    gsap.set(windowContainerRef.current, { opacity: 1, scale: 1, y: 0 });
    gsap.set('.site-header, .hero-portrait-container, .hero-main-name, .hero-tagline-caps, .hero-support-text, .hero-cta-group', { opacity: 1, y: 0, x: 0, scale: 1 });
    if (cursorRef.current) gsap.set(cursorRef.current, { opacity: 0 });
  };

  return (
    <div className="retro-os-environment">
      {/* --- Desktop Icons Column --- */}
      <div className="retro-desktop-icons" ref={desktopIconsRef}>
        {/* 1. My Computer */}
        <div 
          className={`retro-icon-item ${selectedIcon === 'computer' ? 'selected' : ''}`}
          onClick={() => setSelectedIcon(selectedIcon === 'computer' ? null : 'computer')}
        >
          <div className="retro-icon-img-wrap">
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="3" width="24" height="18" rx="1" fill="#C0C0C0" stroke="#000000" strokeWidth="1.5"/>
              <rect x="7" y="6" width="18" height="12" fill="#008080" stroke="#808080" strokeWidth="1"/>
              <rect x="13" y="21" width="6" height="4" fill="#C0C0C0" stroke="#000000" strokeWidth="1.5"/>
              <rect x="2" y="25" width="28" height="4" rx="1" fill="#C0C0C0" stroke="#000000" strokeWidth="1.5"/>
              <line x1="18" y1="27" x2="26" y2="27" stroke="#404040" strokeWidth="1"/>
            </svg>
          </div>
          <span className="retro-icon-label">My Computer</span>
        </div>

        {/* 2. Photos */}
        <div 
          className={`retro-icon-item ${selectedIcon === 'photos' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedIcon(selectedIcon === 'photos' ? null : 'photos');
            setPhotosOpen(true);
          }}
        >
          <div className="retro-icon-img-wrap">
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
              <path d="M2 7C2 5.89543 2.89543 5 4 5H12L15 8H28C29.1046 8 30 8.89543 30 10V25C30 26.1046 29.1046 27 28 27H4C2.89543 27 2 26.1046 2 25V7Z" fill="#FFC83B" stroke="#000000" strokeWidth="1.5"/>
              <rect x="7" y="12" width="18" height="11" fill="#FFFFFF" stroke="#000000" strokeWidth="1"/>
              <circle cx="12" cy="16" r="2" fill="#F08050"/>
              <polygon points="8,22 14,17 19,21 24,15 25,22" fill="#008080"/>
            </svg>
          </div>
          <span className="retro-icon-label">Photos</span>
        </div>

        {/* 3. Recycle Bin */}
        <div 
          className={`retro-icon-item ${selectedIcon === 'bin' ? 'selected' : ''}`}
          onClick={() => setSelectedIcon(selectedIcon === 'bin' ? null : 'bin')}
        >
          <div className="retro-icon-img-wrap">
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
              <path d="M5 10H27L24 28H8L5 10Z" fill="#C0C0C0" stroke="#000000" strokeWidth="1.5"/>
              <rect x="3" y="6" width="26" height="4" fill="#808080" stroke="#000000" strokeWidth="1.5"/>
              <rect x="12" y="3" width="8" height="3" fill="#808080" stroke="#000000" strokeWidth="1.5"/>
              <path d="M12 14L16 18L14 18L14 23L18 23L18 21L20 24L18 27L18 25L12 25L12 18L10 18L12 14Z" fill="#13AA52"/>
            </svg>
          </div>
          <span className="retro-icon-label">Recycle Bin</span>
        </div>
      </div>

      {/* --- Simulated Pixel Cursor for Cinematic Sequence --- */}
      <svg 
        className="retro-simulated-cursor" 
        ref={cursorRef} 
        viewBox="0 0 17 24" 
        fill="none"
      >
        <path 
          d="M0 0V22L5.5 16.5L9.5 24L12.5 22.5L8.5 15.5L15 15.5L0 0Z" 
          fill="#FFFFFF" 
          stroke="#000000" 
          strokeWidth="1.5" 
          strokeLinejoin="round"
        />
      </svg>

      {/* --- Main Application Window: Portfolio.exe --- */}
      <div 
        className={`retro-window-container ${isMaximized ? 'maximized' : ''} ${isMinimized ? 'minimized' : ''}`}
        ref={windowContainerRef}
      >
        <div className="retro-window-frame">
          {/* Authentic Windows 98 Title Bar */}
          <div className="retro-title-bar">
            <div className="retro-title-left">
              <svg className="retro-title-icon" viewBox="0 0 16 16" fill="none">
                <rect width="16" height="16" rx="2" fill="#000080"/>
                <circle cx="8" cy="8" r="4" fill="#F08050"/>
              </svg>
              <span className="retro-title-text">Portfolio.exe — Bapugoud Giramallanavar</span>
            </div>

            {/* Window Controls [_] [🗖] [✕] */}
            <div className="retro-window-controls">
              <button 
                className="retro-ctrl-btn" 
                onClick={() => setIsMinimized(true)}
                title="Minimize"
              >
                _
              </button>
              <button 
                className="retro-ctrl-btn" 
                onClick={() => setIsMaximized(!isMaximized)}
                title={isMaximized ? "Restore" : "Maximize"}
              >
                {isMaximized ? '❐' : '□'}
              </button>
              <button 
                className="retro-ctrl-btn close-btn" 
                onClick={() => setIsMinimized(true)}
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Inner Content Area */}
          <div className="retro-window-body">
            {children}
          </div>
        </div>
      </div>

      {/* --- Optional Photos Pop-up Window --- */}
      {photosOpen && (
        <div 
          className="retro-window-container" 
          style={{ 
            position: 'fixed', 
            top: '80px', 
            left: '120px', 
            width: '380px', 
            zIndex: 9990, 
            margin: 0 
          }}
        >
          <div className="retro-window-frame">
            <div className="retro-title-bar">
              <div className="retro-title-left">
                <span className="retro-title-text">Photos — Bapugoud G</span>
              </div>
              <div className="retro-window-controls">
                <button className="retro-ctrl-btn close-btn" onClick={() => setPhotosOpen(false)}>✕</button>
              </div>
            </div>
            <div className="retro-window-body" style={{ padding: '16px', background: '#0a0a0a', textAlign: 'center' }}>
              <img 
                src="/assets/about_portrait.png" 
                alt="Bapugoud portrait" 
                style={{ width: '100%', borderRadius: '4px', border: '1px solid #333' }} 
              />
              <p style={{ marginTop: '10px', fontSize: '11px', color: '#aaa', fontFamily: 'monospace' }}>
                portrait_monochrome.raw (1080x1350)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- Retro Taskbar at the Bottom --- */}
      <div className="retro-taskbar" ref={taskbarRef}>
        <div className="taskbar-left-group">
          {/* Start Button */}
          <button 
            className={`retro-start-btn ${startMenuOpen ? 'active' : ''}`}
            onClick={() => setStartMenuOpen(!startMenuOpen)}
          >
            <svg className="start-flag-icon" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" fill="#E74C3C" />
              <rect x="9" y="2" width="5" height="5" fill="#2ECC71" />
              <rect x="2" y="9" width="5" height="5" fill="#3498DB" />
              <rect x="9" y="9" width="5" height="5" fill="#F1C40F" />
            </svg>
            <span>Start</span>
          </button>

          {/* Active Window Button: Portfolio.exe */}
          <button 
            className={`taskbar-prog-tab ${isMinimized ? 'minimized' : ''}`}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <span style={{ color: '#F08050', fontSize: '10px' }}>●</span>
            <span>Portfolio.exe</span>
          </button>

          {/* Cinematic Animation Controls */}
          <div className="taskbar-quick-controls">
            <button 
              className="retro-replay-btn" 
              onClick={runCinematicSequence}
              title="Re-run 12s Cinematic Intro Sequence"
            >
              <span>↺</span>
              <span>Replay Intro</span>
            </button>

            {isAnimating && (
              <button 
                className="retro-skip-btn" 
                onClick={skipSequence}
                title="Skip to steady portfolio"
              >
                <span>⏭</span>
                <span>Skip</span>
              </button>
            )}
          </div>
        </div>

        {/* Right System Tray */}
        <div className="taskbar-tray">
          {/* Volume Speaker Icon */}
          <svg className="tray-icon" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.536 14.01A8.473 8.473 0 0 0 14 8c0-2.298-.915-4.382-2.39-5.908l-.708.707A7.473 7.473 0 0 1 13 8a7.473 7.473 0 0 1-2.172 5.303l.708.707z"/>
            <path d="M10.121 12.596A6.48 6.48 0 0 0 12 8c0-1.76-.7-3.356-1.828-4.526l-.707.707A5.48 5.48 0 0 1 11 8a5.48 5.48 0 0 1-1.586 3.889l.707.707z"/>
            <path d="M8.707 11.182A4.486 4.486 0 0 0 10 8c0-1.22-.486-2.327-1.272-3.142l-.707.707A3.486 3.486 0 0 1 9 8c0 .94-.374 1.792-.98 2.475l.687.707z"/>
            <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
          </svg>
          <span className="tray-clock">{time}</span>
        </div>
      </div>

      {/* --- Start Menu Popup --- */}
      {startMenuOpen && (
        <div className="retro-start-menu">
          <div className="start-menu-side-banner">
            <span className="start-banner-text">WINDOWS 98</span>
          </div>
          <div className="start-menu-items">
            <div 
              className="start-menu-item"
              onClick={() => {
                setIsMinimized(false);
                setStartMenuOpen(false);
              }}
            >
              <span>🗖</span>
              <span>Portfolio.exe</span>
            </div>
            <div 
              className="start-menu-item"
              onClick={() => {
                setPhotosOpen(true);
                setStartMenuOpen(false);
              }}
            >
              <span>📁</span>
              <span>Photos Folder</span>
            </div>
            <div 
              className="start-menu-item"
              onClick={() => {
                runCinematicSequence();
                setStartMenuOpen(false);
              }}
            >
              <span>↺</span>
              <span>Replay Intro Animation</span>
            </div>
            <div className="start-menu-divider"></div>
            <a 
              href="mailto:giramallanavarbapugoud@gmail.com" 
              className="start-menu-item"
              onClick={() => setStartMenuOpen(false)}
            >
              <span>✉</span>
              <span>Send Email</span>
            </a>
            <div className="start-menu-divider"></div>
            <div 
              className="start-menu-item"
              onClick={() => {
                setIsMaximized(!isMaximized);
                setStartMenuOpen(false);
              }}
            >
              <span>🔲</span>
              <span>{isMaximized ? 'Windowed Mode' : 'Fullscreen Mode'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
