import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { changePassword } from "../../services/Auth.service"; // API for password reset
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Extract email from location state
    const { email } = location.state || {};

    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            setStatusMessage("Please fill out all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setStatusMessage("Passwords do not match.");
            return;
        }

        const response = await changePassword({ email, password: newPassword });

        if (response.status) {
            setStatusMessage("Password changed successfully! Redirecting to main page...");
            setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
        } else {
            setStatusMessage(response.message || "Failed to change password. Please try again.");
        }
    };

    return (
        <div
            style={{
                fontFamily: "Chromatophore, helvetica, arial, sans-serif",
                minHeight: "100vh",
                backgroundColor: "#100030",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "20px",
                    backgroundColor: "#1a0033",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                }}
            >
                <h2
                    style={{
                        color: "rgb(240, 255, 255)",
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        textAlign: "left",
                    }}
                >
                    Reset Password
                </h2>
                <p
                    style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "rgb(88, 64, 255)",
                        marginBottom: "40px",
                    }}
                ></p>
                <label
                    style={{
                        color: "rgb(240, 255, 255)",
                        fontSize: "16px",
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "10px",
                    }}
                >
                    New Password
                </label>
                <div style={{ position: "relative", marginBottom: "10px" }}>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            color: "#fff",
                            backgroundColor: "#2e003e",
                            border: "2px solid rgb(88, 64, 255)",
                            borderRadius: "5px",
                        }}
                    />
                    <div
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                        }}
                    >
                        {showNewPassword ? <FaEyeSlash color="#fff" /> : <FaEye color="#fff" />}
                    </div>
                </div>

                <label
                    style={{
                        color: "rgb(240, 255, 255)",
                        fontSize: "16px",
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "10px",
                    }}
                >
                    Confirm Password
                </label>
                <div style={{ position: "relative", marginBottom: "20px" }}>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            color: "#fff",
                            backgroundColor: "#2e003e",
                            border: "2px solid rgb(88, 64, 255)",
                            borderRadius: "5px",
                        }}
                    />
                    <div
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                        }}
                    >
                        {showConfirmPassword ? <FaEyeSlash color="#fff" /> : <FaEye color="#fff" />}
                    </div>
                </div>

                <button
                    onClick={handleChangePassword}
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        backgroundColor: "rgb(240, 80, 248)",
                        color: "rgb(16, 0, 48)",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginBottom: "20px",
                    }}
                >
                    Reset Password
                </button>

                {statusMessage && (
                    <p
                        style={{
                            color: "rgb(240, 255, 255)",
                            textAlign: "center",
                            marginTop: "10px",
                        }}
                    >
                        {statusMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;
