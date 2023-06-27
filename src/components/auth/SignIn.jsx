import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);

    const handleSignUp = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
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
                alert("Please provide the necessary information!");
            });
    };

    return (
        <div className="submit-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSignUp}>
                <div className="submit-container">
                    <input
                        id="email"
                        autoComplete="new-email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        id="password"
                        autoComplete="new-password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
            <p className="login-question">
                {" "}
                Already have an account?<Link to="/login"> Log in here!</Link>
            </p>
        </div>
    );
};

export default SignUp;
