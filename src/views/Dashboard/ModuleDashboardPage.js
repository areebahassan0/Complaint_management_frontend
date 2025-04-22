import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout'
import './ModuleDashboard.css'; 
const ModuleDashboard = ({ title, options }) => {
    const navigate = useNavigate();
  
    const handleNavigation = (path) => {
      if (path) navigate(path);
    };
  
    return (
      <DashboardLayout>
        <div className="dashboard-content">
          <h2 className="custom-text">{title}</h2>
  
          <div className="button-container">
            {options.map((option, index) => (
              <div key={index} className="dropdown-wrapper">
                <button
                  className="button-74"
                  role="button"
                  onClick={option.onClick ? option.onClick : () => handleNavigation(option.path)}

                >
                  {option.label}
                </button>
  
                {option.submenu && (
                  <div className="dropdown-menu">
                    {option.submenu.map((sub, subIndex) => (
                      <div key={subIndex} className="dropdown-item-wrapper">
                        <button
                          className="dropdown-item"
                          onClick={sub.onClick ? sub.onClick : () => handleNavigation(sub.path)}

                        >
                          {sub.label}
                        </button>
  
                        {sub.submenu && (
                          <div className="nested-dropdown-menu">
                            {sub.submenu.map((deep, deepIndex) => (
                              <button
                                key={deepIndex}
                                className="dropdown-item"
                                onClick={deep.onClick ? deep.onClick : () => handleNavigation(deep.path)}
                              >
                                {deep.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  };
  
  export default ModuleDashboard;
