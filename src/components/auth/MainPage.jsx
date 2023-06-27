import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
    return (
        <div>
            MainPage
            <button>
                <Link to="/">Log Out</Link>
            </button>
        </div>
    );
}

export default MainPage;
