// src/views/Home/HomePage.jsx
import React from 'react';

function HomePage() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to KLink!</h1>
            <p className="mb-6">Your one-stop portal for managing your electricity account. Choose from the options in the sidebar to get started:</p>

            <ul className="list-disc pl-6">
                {/* <li>💡 Lodge and Track Complaints</li>
                <li>🧾 View and Pay Bills</li>
                <li>💳 E-Payment Options</li>
                <li>📊 Consumption History</li> */}
            </ul>
        </div>
    );
}

export default HomePage;
