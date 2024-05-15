//Register component to add new users

import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import Server from '../Server/Server';


const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //set user data at initial time
    useEffect(() => {
        fetch(`${Server}/users`)
            .then(res => res.json)
            .then(data => setUser(data))

    }, [])
    console.log(Server)
    //update email id state
    const handleEmail = (e) => {
        setId(e.target.value);
    }
    //update password state
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    //update confirm password state
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    //validation
    //checking if user has entered all the required fields

    const IsValid = () => {
        let isprocessed = true
        let errmsg = "please enter Value in"
        if (id === null || id === '') {
            isprocessed = false
            errmsg += ' email'

        }
        else if (password === null || password === '') {
            isprocessed = false
            errmsg += 'password'

        }
        else if (confirmPassword === null || confirmPassword === '') {
            isprocessed = false
            errmsg += 'confirm password'


        }

        if (!isprocessed) {
            toast.error(errmsg)
        } else {
            //correct mail id or not
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(id)) {

            } else {
                isprocessed = false;
                toast.error('Please enter the valid email')
            }
        }
        return isprocessed;
    }

    //Post user credentials in JSON Server
    const handleSubmit = (e) => {
        //prevent default reload behaviour
        e.preventDefault()

        let regdata = { id, password }


        if (password === confirmPassword && IsValid()) {



            console.log(regdata)
            fetch(`${Server}/users`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regdata)
            }).then((res) => {
                navigate('/login')
                toast.success("Registration Successful")
            }).catch((error) => {
                toast.error("registration Failed" + error.message)
            })
        }
        else {
            toast.error('password doesnot match');
        }
    }




    return (
        <Layout title={"ShopKart Registration"}>
            <div className="grid place-items-center h-screen bg-white">
                <section className="">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-black">
                                    Create an account
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-black">Your email</label>
                                        <input required type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={handleEmail} />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-black">Password</label>
                                        <input required type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" on onChange={handlePassword} />
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Confirm password</label>
                                        <input required type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleConfirmPassword} />
                                    </div>

                                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>Create account</button>
                                    <p className="text-sm font-light text-blue-500 dark:text-blue-400">
                                        Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    )
}

export default Register