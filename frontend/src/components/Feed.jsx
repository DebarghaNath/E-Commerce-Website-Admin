import React, { useState } from 'react';


function Feed() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="feed-container">
      <nav className={isOpen ? 'sidebar open' : 'sidebar'}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Services</li>
        </ul>
      </nav>
      <div className="main-content">
        <button onClick={toggleSidebar} className="toggle-btn">
          Toggle Sidebar
        </button>
        <h1>Main Content</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
}

export default Feed;
