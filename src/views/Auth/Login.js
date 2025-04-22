import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/Auth.service";

const Login = () => {
    const [formData, setFormData] = useState({ identifier: "", password: "" });
    const [statusMessage, setStatusMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login(formData);
        if (result.status) {
            setStatusMessage("Login successful!");
            navigate("/home");
        } else {
            setStatusMessage(result.message || "Login failed.");
        }
    };

    const handleForgetPassword = () => {
        navigate("/forget-password");
    };

    const handleSignup = () => {
        navigate("/signup");
    };
    

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto",padding: "20px", fontFamily: "Chromatophore, helvetica, arial, sans-serif", }}>
            {/* Header */}
            
            
            {/* Sign-in Heading */}
            <h2 style={{ textAlign: "center", marginBottom: "10px" , marginBottom:"10px",fontFamily: "Chromatophore, helvetica, arial, sans-serif"}}>Sign in to your account</h2>
            <p
                    style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "rgb(88, 64, 255)",
                        marginBottom: "40px",
                    }}
                ></p>
            {/* Sign-in Form */}
            <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
                {/* Identifier Input */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontSize: "14px", display: "block", marginBottom: "20px" }}>
                        CNIC or Consumer No
                    </label>
                    <input
                        type="text"
                        name="identifier"
                        placeholder="Enter CNIC or Consumer No"
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    />
                </div>

                {/* Password Input */}
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontSize: "14px", display: "block", marginBottom: "5px" }}>
                        Password
                    </label>
                    <div style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
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
                            👁
                        </button>
                    </div>
                </div>

                {/* Forgot Password */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <button
                        type="button"
                        onClick={handleForgetPassword}
                        style={{
                            fontSize: "18px",
                            color: "rgb(96, 240, 248)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                            textAlign: "center"
                        }}
                    >
                        I've forgotten my password
                    </button>
                </div>

                {/* Sign-in Button */}
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
                    Sign in
                </button>
            </form>

            {/* Sign-up Section */}
            <div
                style={{
                    border: "2px solid rgb(88, 64, 255)",
                    color: "rgb(240, 255, 255)",
                    padding: "15px",
                    borderRadius: "5px",
                    textAlign: "center",
                    // backgroundColor: "#100030",
                }}
            >
                <h2 style={{ fontWeight: 'bold', fontSize: '18px',marginBottom: "10px" , color: "rgb(240, 255, 255)",}}>
                    Don't have an account yet? 
                </h2>
                <p style={{ fontSize: '14px',marginBottom: "10px" , color: "rgb(240, 255, 255)",}}>
                    Set your account password first.
                </p>
                <button
                    type="button"
                    onClick={handleSignup}
                    style={{
                        fontSize: "18px",
                        color: "rgb(96, 240, 248)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "underline",
                        textAlign: "center"
                    }}
                >
                    Set up my online account
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

export default Login;
