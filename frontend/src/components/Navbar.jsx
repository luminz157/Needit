import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <div className="container nav-content">
        <a href="#" className="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#4F46E5"/>
            <path d="M10 22V10L22 22V10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          needit<span>startup</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#mission">Mission</a></li>
          <li><a href="#pipeline">Pipeline</a></li>
          <li><a href="#audience">Audience</a></li>
        </ul>
        <div className="nav-btns">
          <a href="#contact" className="btn btn-primary">Apply Now</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
