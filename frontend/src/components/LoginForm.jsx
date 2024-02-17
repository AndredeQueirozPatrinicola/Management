import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'
import { Button } from '@/components/ui/button.jsx';

export default function LoginForm() {

    let { loginMutation, mutationError } = useContext(AuthContext);

    const [validationError, setValidationError] = useState("")

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    function handleChange(e){
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e){
        e.preventDefault(); 
        loginMutation.mutate(credentials);
    };

    useEffect(() =>{
        console.log(mutationError)
        if(mutationError){
            setValidationError(mutationError.response.data.detail)
        }
    }, [mutationError])

    return (
        <>  
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                    className="mx-auto h-10 w-auto"
                    src=""
                    // alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login
                    </h2>
                </div>


                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" onSubmit={handleSubmit}  method="POST">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                id="username"
                                name="username"
                                type="text"
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Senha
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-slate-600 hover:text-slate-500">
                                        Esqueceu a senha?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <Button
                            type="submit"
                            >
                            Login
                            </Button>
                        </div>

                        <div
                            className='flex justify-center'
                        >
                            <span
                                className='text-red-500'
                            >{validationError}</span>
                        </div>

                    </form>

                </div>


            </div>
        </>
    )
}
