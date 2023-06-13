import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ loggedIn, children }) {
    //console.log(loggedIn)
    return (
        loggedIn ? children : <Navigate to="/signin" replace/>
    )
}

export default ProtectedRoute;