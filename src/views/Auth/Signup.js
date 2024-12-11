import React, { useState } from "react";
import { signup } from "../../services/Auth.service";
import { useNavigate } from "react-router-dom";
import OTPVerificationPage from "./OTPVerification";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        address: "",
        cnic: "",
    });
    const [statusMessage, setStatusMessage] = useState("");
    const [isSignupComplete, setIsSignupComplete] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const result = await signup(formData);
        if (result.status) {
            setStatusMessage("Signup successful! Please verify your email.");
            if (result.status) {
                setStatusMessage("Signup successful! Please verify your email.");
                navigate("/otp-verification", { state: { email: formData.email, type: "signup" } }); // Redirect with state
            } else {
                setStatusMessage(result.message || "Signup failed.");
            }
        }
         else {
            setStatusMessage(result.message || "Signup failed.");
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    if (isSignupComplete) {
        return <OTPVerificationPage email={formData.email} />;
    }

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", fontFamily: "Chromatophore, helvetica, arial, sans-serif" }}>
            {/* Header */}
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Sign up for an account</h2>
            <p
                    style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "rgb(88, 64, 255)",
                        marginBottom: "40px",
                    }}
                ></p>
            {/* Signup Form */}
            <form onSubmit={handleSignup} style={{ marginBottom: "20px" }}>
                {/* Email Input */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontSize: "14px", display: "block", marginBottom: "5px" }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            color: "rgb(240, 255, 255)",
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "10px",
                        }}
                    />
                </div>

                {/* Password Input */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontSize: "14px", display: "block", marginBottom: "5px" }}>Password</label>
                    <div style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{
                                color: "rgb(240, 255, 255)",
                                fontSize: "16px",
                                fontWeight: "bold",
                                display: "block",
                                marginBottom: "10px",
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                            }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {/* First Name Input */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontSize: "14px", display: "block", marginBottom: "5px" }}>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Enter your first name"
                        value={formData.first_name}
                        onChange={handleChange}
                        style={{
                            color: "rgb(240, 255, 255)",
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "10px",
                        }}
                    />
                </div>

                {/* Last Name Input */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontSize: "14px", display: "block", marginBottom: "5px" }}>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Enter your last name"
                        value={formData.last_name}
                        onChange={handleChange}
                        style={{
                            color: "rgb(240, 255, 255)",
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "10px",
                        }}
                    />
                </div>

                {/* Phone Number Input */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontSize: "14px", display: "block", marginBottom: "5px" }}>Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Enter your phone number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        style={{
                            color: "rgb(240, 255, 255)",
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "10px",
                        }}
                    />
                </div>

                {/* Address Input */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontSize: "14px", display: "block", marginBottom: "5px" }}>Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        style={{
                            color: "rgb(240, 255, 255)",
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "10px",
                        }}
                    />
                </div>

                {/* CNIC Input */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontSize: "14px", display: "block", marginBottom: "5px" }}>CNIC</label>
                    <input
                        type="text"
                        name="cnic"
                        placeholder="Enter your CNIC"
                        value={formData.cnic}
                        onChange={handleChange}
                        style={{
                            color: "rgb(240, 255, 255)",
                            fontSize: "16px",
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "10px",
                        }}
                    />
                </div>

                {/* Signup Button */}
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "rgb(240, 80, 248)",
                        color: "rgb(16, 0, 48)",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Sign up
                </button>
            </form>

            {/* Already have an account? */}
            <div
                style={{
                    border: "2px solid rgb(88, 64, 255)",
                    color: "rgb(240, 255, 255)",
                    padding: "15px",
                    borderRadius: "5px",
                    textAlign: "center",
                }}
            >
                <h2 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: "10px" }}>
                    Already have an account?
                </h2>
                <p style={{ fontSize: '14px', marginBottom: "10px", color: "rgb(240, 255, 255)"}}>
                    Sign in to your account to continue.
                </p>
                <button
                    type="button"
                    onClick={handleLogin}
                    style={{
                        fontSize: "18px",
                        color: "rgb(96, 240, 248)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                    }}
                >
                    Sign in here
                </button>
            </div>

            {/* Status Message */}
            {statusMessage && (
                <p style={{ marginTop: "20px", textAlign: "center", color: "red" }}>
                    {statusMessage}
                </p>
            )}
        </div>
    );
};

export default Signup;
