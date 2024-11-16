import React from 'react';
import {Link} from 'react-router-dom';

function ComplaintHome()
{
    return (
        <div>
            
            <div className="container">
                <h2>Complaint Management System</h2>
                <div className="btn-group">
                    <Link className="btn btn-primary" to="/complaints/billing">Billing Complaint</Link>
                    <Link className="btn btn-primary" to="/complaints/load-shedding">Load Shedding</Link>
                </div>
            </div>
        </div>

       
    );
}
export default ComplaintHome;