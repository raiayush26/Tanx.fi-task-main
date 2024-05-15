//Login and authentication Component

import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Server from '../Server/Server';


const Login = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    //if any user credentials are present in session storage this will clear it before sign in 
    useEffect(() => {
        sessionStorage.clear();
    }, []);


    //updates email state
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    //updates password
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    //login process and authentication
    const ProceedLogin = (e) => {
        //prevents default reload on form submission
        e.preventDefault()
        if (Validate()) {
            //user Credentials authentication
            fetch(`${Server}/${email}`)
                .then((res) => {
                    return res.json()
                }).then((data) => {
                    if (Object.keys(data).length === 0) {
                        toast.error('please Enter a valid email')
                    } else {
                        if (data.password === password) {
                            toast.success("Login Successful")
                            sessionStorage.setItem('email', email)
                            navigate('/')
                        } else {
                            toast.error('please enter valid credentials')
                        }
                    }

                }).catch((err) => {
                    toast.error("login failed" + err.message)
                })
        }
    }


    //checking if user has entered valid credentials or not
    const Validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Please Enter email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }





    return (
        <Layout title={"ShopKart - Login"}>


            <div className='grid place-items-center h-screen bg-white'>

                <section className="">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700">

                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-black">
                                        Login

                                    </h1>
                                    <form className="space-y-4 md:space-y-6" onSubmit={ProceedLogin} >
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-black">Your email</label>
                                            <input required type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={handleEmail} />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-black">Password</label>
                                            <input required type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handlePassword} />
                                        </div>

                                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800" >Login</button>
                                        <p className="text-sm font-light text-blue-500 dark:text-blue-500">
                                            New User? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-blue-500">Create an Account</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

        </Layout>
    )
}

export default Login