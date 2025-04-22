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
        <li><a href="/home">🏠 Home</a></li>
        <li><a href="/dashboard">📣 Complaints</a></li>
        <li><a href="/bills">🧾 Bills</a></li>
        <li><a href="/e-payments">💳 E-Payments</a></li>
        <li><a href="/consumption">📊 Consumption</a></li>
        <li><a href="/home">🏠 Home</a></li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;

