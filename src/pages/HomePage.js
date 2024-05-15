//Home page of Web App all products can be accessed from here
import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import Server from '../Server/Server';
//import { useFav } from '../context/favorite';


const HomePage = () => {

    const navigate = useNavigate()

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useCart()




    //getting all products on Initial time from JSON Server
    useEffect(() => {
        fetch(`${Server}/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])




    return (

        <Layout title={"ShopKart Homepage"}>
            <h1 className='text-center'>All Products</h1>
            <div className="flex flex-wrap ">
                {products?.map(p => (
                    <div class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                        <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl cursor-pointer" onClick={() => navigate(`/product/${p.id}`)} >
                            <img class="object-cover" src={p.image} alt="product image" />

                        </a>
                        <div class="mt-4 px-5 pb-5">
                            <a className='cursor-pointer' onClick={() => navigate(`/product/${p.id}`)} >
                                <h5 class="text-xl tracking-tight text-slate-900">T-shirt formal for men</h5>
                            </a>
                            <div class="mt-2 mb-5 flex items-center justify-between">
                                <p>
                                    <span class="text-3xl font-bold text-slate-900">₹ {p.amount}</span>

                                </p>
                                <div class="flex items-center">
                                    <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>

                                    <span class="mr-2 ml-3 rounded bg-green-500 px-2.5 py-0.5 text-xs font-semibold">{p.rating}</span>
                                </div>
                            </div>





                            <a class="w-100 flex items-center justify-center rounded-md bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer" onClick={() => {
                                setCart([...cart, p])
                                localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                toast.success('Product added to cart.')
                            }} >
                                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Add to cart</a
                            >

                        </div>
                    </div>



                ))
                }
            </div>
        </Layout>
    )
}

export default HomePage



