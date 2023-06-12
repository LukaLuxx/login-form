// import React, { useState } from "react";
// import {
//     getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
// } from "firebase/auth";
// // import { auth } from "../../Firebase";

// const SignIn = () => {
//     const [email, setEmail] = useState("");
//     const [pass, setPass] = useState("");

//     // Get the authentication instance
//     const auth = getAuth();

//     // Register a new user with email and password
//     const registerWithEmailAndPassword = (email, password) => {
//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 // User registration successful
//                 const user = userCredential.user;
//                 // You can perform additional actions here, such as updating user profile or storing user data in the database
//             })
//             .catch((error) => {
//                 // Handle any errors that occur during user registration
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // Provide appropriate feedback to the user or handle the error gracefully
//             });
//     };

//     const signIn = (e) => {
//         e.preventDefault();
//         signInWithEmailAndPassword(auth, email, pass)
//             .then((userCredential) => {
//                 // User sign-in successful
//                 const user = userCredential.user;
//                 // You can perform additional actions here, such as storing user data in session/local storage
//             })
//             .catch((error) => {
//                 // Handle any errors that occur during user sign-in
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // Provide appropriate feedback to the user or handle the error gracefully
//             });
//     };

//     return (
//         <div className="sign-in-container">
//             <form onSubmit={signIn}>
//                 <h1>Sign In</h1>
//                 <input
//                     type="email"
//                     placeholder="Enter your e-mail here"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Enter your password here"
//                     autoComplete="current-password"
//                     value={pass}
//                     onChange={(e) => setPass(e.target.value)}
//                 />
//                 <button type="submit">Sign In</button>
//             </form>
//         </div>
//     );
// };

// export default SignIn;

// import React, { useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import app from "../../Firebase";

// const SignIn = () => {
//     const [email, setEmail] = useState("");
//     const [pass, setPass] = useState("");

//     // Get the authentication instance
//     const auth = getAuth(app);

//     const signIn = (e) => {
//         e.preventDefault();
//         signInWithEmailAndPassword(auth, email, pass)
//             .then((userCredential) => {
//                 // User sign-in successful
//                 const user = userCredential.user;
//                 // You can perform additional actions here, such as storing user data in session/local storage
//             })
//             .catch((error) => {
//                 // Handle any errors that occur during user sign-in
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // Provide appropriate feedback to the user or handle the error gracefully
//             });
//     };

//     return (
//         <div className="sign-in-container">
//             <form onSubmit={signIn}>
//                 <h1>Sign In</h1>
//                 <input
//                     type="email"
//                     placeholder="Enter your e-mail here"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Enter your password here"
//                     autoComplete="current-password"
//                     value={pass}
//                     onChange={(e) => setPass(e.target.value)}
//                 />
//                 <button type="submit">Sign In</button>
//             </form>
//         </div>
//     );
// };

// export default SignIn;

import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth(app);

    const handleSignUp = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // User registration successful
                const user = userCredential.user;
                // You can perform additional actions here, such as updating user profile or storing user data in the database
            })
            .catch((error) => {
                // Handle any errors that occur during user registration
                const errorCode = error.code;
                const errorMessage = error.message;
                // Provide appropriate feedback to the user or handle the error gracefully
            });
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
