import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay to create blur and darker background */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        
            {/* Sidebar content */}
            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                <header className='global-header'>
                    <button
                    className="global-header__back"
                    onClick={toggleSidebar}
                    >
                    ☰ Back
                    </button>
                </header>
        <ul className="sidebar-menu">
          <li><a href="/dashboard">Dashboard</a></li>

          <li><a href="/lodge-complaint">Lodge a Complaint</a></li>
          <li><a href="/track-complaints">Track Complaint</a></li>
          <li><a href="/complaints-history">Complaint History</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;

