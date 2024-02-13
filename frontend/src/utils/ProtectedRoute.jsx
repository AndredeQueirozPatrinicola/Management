import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext } from "../context/AuthContext.jsx"


export default function ProtectedRoute( { allowedRoles = [] } ){
	let { isAuthenticated, userRoles } = useContext(AuthContext);
    
    const isAllowed = () => (
        userRoles ?
        userRoles.map( 
            ( role ) => allowedRoles.includes( role ) )
        .reduce( 
            ( isAllowed1, isAllowed2 ) => isAllowed1 || isAllowed2 ) :
        false
    );
      
    return (
		<> 
            { !isAuthenticated  ? 
                <Navigate to="/login" replace/> : ( 
                    (isAllowed()) || (allowedRoles.length == 0)  ? 
                        <Outlet /> :
                        <Navigate to="/" replace/>
                )
            }
		</> 
	)
}