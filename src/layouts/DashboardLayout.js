import { Route } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';


const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard-layout">
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className={`content ${isSidebarOpen ? 'blur-content' : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
