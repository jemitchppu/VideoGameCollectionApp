import { useState } from "react";

function RegisterPage () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [serverError, setServerError] = useState("");


    const passwordsMatch = password === confirmPassword;

    const showError =
        confirmPassword.length > 0 && !passwordsMatch;

    const isValid = 
        name.trim() !== "" &&
        email.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        password === confirmPassword;

    async function handleRegister(event) {
        event.preventDefault();

        if (!isValid) return;

        setServerError("");

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                setServerError(data.message);
                return;
            }

            console.log("Success:", data);

        } catch (error) {
        console.error("Error:", error.message);
        setServerError("Something went wrong. Please try again.");
        }
   }


    return (
        <div className="login-page">
            <form onSubmit={handleRegister} className="login-form">
                <h1>Create Account</h1>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                    id="name"
                    type="text"
                    value={name}
                    autoFocus
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                        setServerError("");
                    }}
                    placeholder="Enter your email"
                    />

                    {serverError && serverError.includes("Email") && (
                        <p className="error-text">{serverError}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value);
                    }}
                    placeholder="Confirm your password"
                    />

                    {showError && (
                        <p className="error-text">Passwords do not match</p>
                    )}
                </div>



                <button type="submit" disabled={!isValid}>Create Account</button>
            </form>
        </div>
    );
}

export default RegisterPage;