import React, { useState } from 'react';
import './Header.css';

const Header = ({ activeTab, setActiveTab, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  React.useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'degrees', label: 'Degrees', icon: 'fas fa-graduation-cap' },
    { id: 'compare', label: 'Compare', icon: 'fas fa-chart-bar' },
    { id: 'roadmap', label: 'Roadmap', icon: 'fas fa-map' },
    { id: 'guidance', label: 'AI Guide', icon: 'fas fa-robot' },
    { id: 'profile', label: 'Profile', icon: 'fas fa-user' }
  ];

  const resourcesItems = [
    { id: 'scholarships', label: 'Scholarships', icon: 'fas fa-award' },
    { id: 'colleges', label: 'Colleges', icon: 'fas fa-school' },
    { id: 'quiz', label: 'Quiz', icon: 'fas fa-clipboard-check' }
  ];

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <div className="brand-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className="brand-text">
            <h1>CareerPath</h1>
            <span>Your Future Starts Here</span>
          </div>
        </div>

        <div className="nav-menu">
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navItems.map(item => (
              <button
                key={item.id}
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            ))}
            <div className="nav-dropdown">
              <button className="nav-link">
                <i className="fas fa-folder"></i>
                <span>Resources</span>
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="dropdown-menu">
                {resourcesItems.map(item => (
                  <button
                    key={item.id}
                    className="dropdown-item"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          <div className="user-info">
            <span className="welcome-text">Hi, {user?.name}</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
          <button 
            className="menu-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;