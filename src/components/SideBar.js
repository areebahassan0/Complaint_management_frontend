import React from 'react';


const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="global-header__menu-button back-button" onClick={toggleSidebar}>
                ☰ Back
            </button>
            <ul className="sidebar-menu">
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/dashboard/lodge-complaint">Lodge a Complaint</a></li>
                <li><a href="/dashboard/track-complaint">Track Complaint</a></li>
                <li><a href="/dashboard/complaints-history">Complaint History</a></li>
                <li><a href="/settings">Settings</a></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
