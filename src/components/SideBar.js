import React from 'react';
import { Nav } from 'react-bootstrap';

function SideBar() {
    return (
        <Nav className="flex-column bg-light vh-100 p-3">
            <Nav.Link href="/dashboard">Home</Nav.Link>
           {//<Nav.Link href="/dashboard/profile">Profile</Nav.Link> /
            // <Nav.Link href="/dashboard/settings">Settings</Nav.Link> 
            }
            <Nav.Link href="/dashboard/lodge-complain">Lodge a Complain</Nav.Link>
            <Nav.Link href="/dashboard/track-complain">Track Complain</Nav.Link>
            <Nav.Link href="/dashboard/complain-history">Complains History</Nav.Link>

        </Nav>
    );
}

export default SideBar;
