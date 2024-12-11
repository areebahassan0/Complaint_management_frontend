import React, { useState, useEffect } from "react";

import { verifyOTP ,resendOTP} from "../../services/Auth.service";
import { useNavigate, useLocation } from "react-router-dom";
const OtpVerification = () => {
    const [otp, setOtp] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [timer, setTimer] = useState(300); // Timer starts at 5 minutes
    const navigate = useNavigate();
    const location = useLocation();
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const { email, type } = location.state || {}; // "type" determines the flow (signup/forget password)
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleResendOtp = async() => {
        // Logic to resend OTP
        try {
            const response = await resendOTP({ email });
            if (response.status) {
                setTimer(300); // Reset timer
                setIsResendDisabled(true);
                setStatusMessage("OTP resent successfully!");
            } else {
                setStatusMessage(response.message || "Failed to resend OTP.");
            }
        } catch (error) {
            setStatusMessage("Error resending OTP.");
        }

    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        const result = await verifyOTP({ email, otp });
        if (result.status) {
            setStatusMessage("OTP verified successfully!");
            if (type === "signup") {
                navigate("/login");
            } else if (type === "forget-password") {
                navigate("/change-password", { state: { email } }); // Redirect to Change Password
            }
        } else {
            setStatusMessage(result.message || "Invalid OTP. Please try again.");
        }
        
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div style={{
            fontFamily: "Chromatophore, helvetica, arial, sans-serif",
            minHeight: "100vh",
            backgroundColor: "#100030",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
        }}>
            <div style={{
                width: "100%",
                maxWidth: "400px",
                padding: "20px",
                backgroundColor: "#1a0033",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}>
                <h2 style={{
                    color: "rgb(240, 255, 255)",
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    textAlign: "left",
                }}>
                    OTP Verification
                </h2>
                <p style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "rgb(88, 64, 255)",
                    marginBottom: "20px",
                }}></p>
                <p style={{
                    color: "rgb(240, 255, 255)",
                    fontSize: "16px",
                    marginBottom: "20px",
                }}>
                    Enter the OTP sent to your email to proceed.
                </p>

                <form onSubmit={handleVerifyOtp}>
                    <label style={{
                        color: "rgb(240, 255, 255)",
                        fontSize: "16px",
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "10px",
                    }}>
                        OTP
                    </label>
                    <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={handleChange}
                        maxLength={6}
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            color: "#fff",
                            backgroundColor: "#2e003e",
                            border: "2px solid rgb(88, 64, 255)",
                            borderRadius: "5px",
                            marginBottom: "10px",
                        }}
                    />

                    {timer > 0 ? (
                        <p style={{
                            fontSize: "14px",
                            color: "rgb(96, 240, 248)",
                            fontStyle: "italic",
                            marginBottom: "20px",
                        }}>
                            Resend OTP in <strong>{formatTime(timer)}</strong>
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            style={{
                                display: "block",
                                margin: "10px auto 20px auto",
                                color: "rgb(240, 80, 248)",
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "14px",
                                textDecoration: "underline",
                            }}
                        >
                            Resend OTP
                        </button>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            backgroundColor: "rgb(240, 80, 248)",
                            color: "rgb(16, 0, 48)",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Verify OTP
                    </button>
                </form>

                {statusMessage && (
                    <p style={{
                        marginTop: "20px",
                        color: statusMessage.includes("successfully") ? "#22c55e" : "#ef4444",
                        textAlign: "center",
                        fontSize: "14px",
                    }}>
                        {statusMessage}
                    </p>
                )}

                <p style={{
                    marginTop: "30px",
                    color: "rgb(240, 255, 255)",
                    fontSize: "14px",
                    textAlign: "center",
                }}>
                    Need help? <a href="/help" style={{ color: "rgb(88, 64, 255)", textDecoration: "none" }}>Contact Support</a>
                </p>
            </div>
        </div>
    );
};

export default OtpVerification;
