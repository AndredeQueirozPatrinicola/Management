import { createContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'

import authAPI from "../api/authAPI.jsx"
import loginUser from "../api/loginUser.jsx"


export const AuthContext = createContext()


export function AuthProvider( { children } ) {

    const navigate = useNavigate();

    
    
	const [ isAuthenticated, setIsAuthenticated ] = useState(
        localStorage.getItem("token") ? true : false
    );
    const [ userData, setUserData ] = useState( {} ); 
    const [ userRoles, setUserRoles ] = useState(
        isAuthenticated ? jwtDecode(localStorage.getItem("token")).roles : null
    ); 

    let { status:userQueryStatus, error:userQueryError, data:userQueryData } = useQuery({
        queryKey: ['user', 'detail'],
        queryFn:  async () => {
            return authAPI().get("api/auth/me/").then(
                res => res.data
            )
        }
    });
    
    useEffect( () => { 
        if (userQueryStatus==="success"){
            setUserData( userQueryData );
        }
        if (userQueryStatus==="error"){
            setIsAuthenticated( false );
            console.log(userQueryError)
        }
    }, [userQueryStatus] )

    useEffect( () => {
        if (isAuthenticated){
            setUserRoles( jwtDecode(localStorage.getItem("token")).roles );
        }
    }, [isAuthenticated])
    
    
    
    const loginMutation = useMutation({
        mutationFn: (variables) => loginUser(variables), 
        onSuccess: (data, variables, context) => {
            const { access, refresh } = data;
    
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh); 
    
            setIsAuthenticated(true);
            navigate("/");
        },
        onError: (error, variables, context) => {
            console.log(`Error: ${error}`)
            console.log(`Variables: ${variables}`)
            console.log(`Context: ${context}`)
        }
    });

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
        return <Navigate to="/login" />
    }

    window.addEventListener('remove-tokens', (e) => {
        setIsAuthenticated( false );
    })



    let contextData = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        loginMutation: loginMutation,
        logout: logout, 
        userRoles: userRoles,
        setUserRoles: setUserRoles,
        userData: userData,
        setUserData: setUserData,
    };

	return (
		<AuthContext.Provider value={contextData}>
            {children}
		</AuthContext.Provider>
	)
}