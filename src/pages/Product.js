//detailed Product page

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { FaRegHeart } from "react-icons/fa";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import { useFav } from '../context/favorite';
import Server from '../Server/Server';

const Product = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [favorite, setFavorite] = useFav()
    const [cart, setCart] = useCart()


    //Fetching The desired product on initial time based on its id
    useEffect(() => {
        fetch(`${Server}/${params?.id}`)
            .then(res => res.json())
            .then(data => setProduct(data))



    }, [])
    console.log(product)



    return (
        <Layout title={"Product details"}>
            <div className="">
                <section className="py-10 font-poppins dark:bg-gray-100">
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="sticky top-0 overflow-hidden ">
                                    <div className="relative mb-6 lg:mb-10 lg:h-96">

                                        <img className="object-contain w-full lg:h-full" src={product.image} alt />
                                        <a className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2" href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                                </path>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="flex-wrap hidden -mx-2 md:flex">




                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <div className="mb-6 ">

                                        <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-black md:text-2xl dark:text-black">
                                            {product.title}
                                        </h2>
                                        <div className="flex flex-wrap items-center mb-6">

                                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                            </svg>

                                            <span class="mr-2 ml-3 rounded bg-green-500 px-2.5 py-0.5 text-xs font-semibold">{product.rating}</span>
                                        </div>
                                        <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-700 ">
                                            <span>₹ {product.amount} </span>

                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-800">Product Description :</h2>
                                        <div className="bg-gray-100 dark:bg-gray-100 rounded-xl">
                                            <div className="p-3 lg:p-5 ">
                                                <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-200 bg-gray-50">
                                                    <div className="flex flex-wrap justify-center ">
                                                        <div className="w-full ">
                                                            {product.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6 " />
                                    <div className="flex flex-wrap items-center mb-6">

                                        <div className="mb-4 lg:mb-0">


                                            <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200  hover:bg-blue-600 hover:border-gray-600 dark:bg-gray-200 dark:hover:bg-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-100 rounded-md" onClick={() => {
                                                setFavorite([...favorite, product])
                                                localStorage.setItem('favorites', JSON.stringify([...favorite, product]))

                                                toast.success("product added to favorites")
                                            }} >
                                                <FaRegHeart className='text-gray-600' />
                                            </button>


                                        </div>
                                        <a className="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 dark:hover:bg-blue-600 dark:text-white dark:border-gray-700 dark:bg-blue-500 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl cursor-pointer" onClick={() => {
                                            setCart([...cart, product])
                                            localStorage.setItem('cart', JSON.stringify([...cart, product]))
                                            toast.success('Product added to cart.')
                                        }} >
                                            Add to cart
                                        </a>
                                    </div>
                                    <div className="flex gap-4 mb-6">
                                        <a href="#" className="w-full px-4 py-3 text-center text-white bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500  hover:bg-blue-600 dark:text-white dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl">
                                            Buy now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </Layout>
    )
}

export default Product