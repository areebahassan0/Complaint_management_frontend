import React, { useState } from "react";
import { forgetPassword } from "../../services/Auth.service";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        if (!email) {
            setStatusMessage("Please enter a valid email address.");
            return;
        }

        const result = await forgetPassword(email);

        if (result.status) {
            setStatusMessage("OTP sent to your email. Please check your inbox.");
            console.log(email)
            navigate("/otp-verification", { state: { email:email, type: "forget-password" } }); // Redirect with state
        } else {
            setStatusMessage(result.message || "Failed to send OTP.");
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
                    Email Address
                </label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                <p
                    style={{
                        color: "rgb(96, 240, 248)",
                        fontStyle: "italic",
                        marginBottom: "20px",
                    }}
                >
                    We’ll send you an email with OTP to reset your password.
                </p>
                <button
                    onClick={handleSendOtp}
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
                    Send Email
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

export default ForgetPassword;
