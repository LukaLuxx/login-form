import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase";
import { Link } from "react-router-dom";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth(app);

    const handleLogIn = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User:", user);
                window.location.href = "/main";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error Code:", errorCode);
                console.log("Error Message:", errorMessage);
                alert("USER NOT FOUND 🐑");
            });
    };

    return (
        <div className="submit-container">
            <h2>Log In</h2>
            <form onSubmit={handleLogIn}>
                <div className="submit-container">
                    <input
                        id="email"
                        autoComplete="current-email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        id="password"
                        autoComplete="current-password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
            <p className="login-question">
                You remembered that you don't have an account? No problem;
                return to <Link to="/">Sign In</Link>
            </p>
        </div>
    );
};

export default LogIn;
