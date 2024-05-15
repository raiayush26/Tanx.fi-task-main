//header component for quick navigation through the web app

import React from 'react'
import { Badge } from 'antd';
import { FaShoppingCart } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { useFav } from '../context/favorite';
import Server from '../Server/Server';



const Header = () => {
    const [cart] = useCart()
    const navigate = useNavigate()
    let loginuser = sessionStorage.getItem('email');
    const [favorite] = useFav()

    //handling logout feature 
    //removing email key from session storage
    const handleLogout = () => {
        sessionStorage.removeItem('email')
        toast.success("logout successfull")
        navigate('/login')
    }

    //Fetch and post Favourite products to JSON Server
    const handleFavorites = () => {
        let favitems = localStorage.getItem('favorites')


        if (favitems.length) {

            let data = JSON.parse(favitems)
            console.log(data)

            fetch(`${Server}/favourites`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            }).then((res) => {
                navigate('/favorites')

            }).catch((error) => {
                console.log("failed" + error.message)
            })
        } else {
            toast.error("something went wrong")
        }


    }



    return (
        <>
            <header className="bg-blue-600">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <a className="block text-white text-2xl" href="/">

                        ShopKart.
                    </a>

                    <div className="flex flex-1 items-center justify-end md:justify-between">



                        <a className="text-white inset-y-0 right-0 " href="/"> Products </a>


                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">

                                <a className=" px-5 py-2.5 text-sm font-medium text-white transition cursor-pointer "
                                    onClick={handleFavorites}
                                >
                                    Favorites
                                </a>

                                <a className=" px-5 py-2.5 text-sm font-medium text-white transition "
                                    href="/orders"
                                >
                                    Orders
                                </a>
                                {
                                    !loginuser ? (<>

                                        <a className=" px-5 py-2.5 text-sm font-medium text-white transition "
                                            href="/login"
                                        >
                                            Login
                                        </a>
                                    </>) : (
                                        <>
                                            <a className=" px-5 py-2.5 text-sm font-medium text-white transition "
                                                href="/login" onClick={handleLogout}
                                            >
                                                Logout
                                            </a>
                                        </>
                                    )}



                            </div>
                            <Badge count={cart?.length} showZero>

                                <FaShoppingCart className='text-white text-xl cursor-pointer' onClick={() => navigate('/cart')} >

                                </FaShoppingCart>
                            </Badge>

                        </div>
                    </div>
                </div>
            </header >


        </>
    )
}

export default Header