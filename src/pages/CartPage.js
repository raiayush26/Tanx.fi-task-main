//Cart component for easy checkout and order functionality

import Layout from '../Layout/Layout'
import React, { useState } from 'react'
import { CiCircleRemove } from "react-icons/ci";
import { useCart } from '../context/cart'
import toast from 'react-hot-toast';
//import { v4 as uuid } from "uuid";
import { useNavigate } from 'react-router-dom';
import Orders from './Orders';
import Server from '../Server/Server';
// import Item from 'antd/es/list/Item';
const CartPage = () => {
    const navigate = useNavigate()

    const user = sessionStorage.getItem('email')
    //console.log(user)
    const [cart, setCart] = useCart()
    const [order, setOrder] = useState({});
    const [proceed, setProceed] = useState(false)



    //remove items from cart
    const removeCartItem = (pid) => {

        try {

            let myCart = [...cart]
            let index = myCart.findIndex(item => item.id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
            toast.success("Item removed from Cart")
        } catch (error) {
            console.log(error)
        }
    }


    //total cost of all products in cart

    let finalcost = 0
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => {
                total = total + parseInt(item.amount)
                finalcost = finalcost + parseInt(item.amount)
            })
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            })
        } catch (error) {
            console.log(error)
        }
    }

    //handling orders
    const handleOrder = (e) => {
        e.preventDefault()

        setOrder({ cart })
        setProceed(true)


        //navigate('/orders')
    }

    //console.log(order)
    // let items = order[1];
    // let userId = order[0];
    // let orderdata = { id, userId, items }


    //fetching and POST Order Details in JSON Server
    const placeOrder = () => {

        //console.log("inside placeorder func")
        fetch(`${Server}/orders`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(order)
        }).then((res) => {
            localStorage.removeItem('cart')
            setCart([])
            navigate('/orders')
            toast.success('order placed successfully')
        }).catch((error) => {
            toast.error("Order Failed" + error.message)
        })




    }
    //placeOrder();
    console.log(cart)
    console.log(order)


    return (
        <Layout title={'ShopKart Cart'}>


            {cart?.length ? (<>
                <div class="flex flex-row ">
                    <div className='bg-gray-200 ml-2 mr-2 w-2/3  mt-5 rounded-sm p-2 text-2xl left-6'>My Cart
                        <div className="mt-2">
                            {cart?.map(p => (
                                <div className="flex flex-row bg-white m-1 rounded-sm">
                                    <img src={p.image} className='h-24 w-24 m-2' alt={p.title} />
                                    <div className="text-xl text-gray-700 p-1 flex flex-col">
                                        {p.title}
                                        <div className="text-lg text-black">
                                            Price: ₹{p.amount}
                                        </div>
                                    </div>
                                    <div className="grid mr-3 py-10 w-full  justify-items-end   ">

                                        <CiCircleRemove className='text-3xl text-red-600 hover:bg-red-800 hover:text-white cursor-pointer rounded-full ' onClick={() => removeCartItem(p.id)} />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='bg-gray-200 ml-2 w-1/3 mr-2 mt-5 rounded-sm  p-2 text-2xl '>Price Details
                        <div className="flex justify-between mt-2">
                            <span >Price</span>
                            <span>{totalPrice()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>-₹ 100</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>+₹ 50</span>
                        </div>
                        <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
                        <div className="flex justify-between">
                            <span>Total</span>
                            <span>₹ {finalcost - 50}</span>
                        </div>
                        {user ? (<div className="w-full">
                            <button className=' text-white text-lg bg-blue-600 hover:bg-blue-700 rounded-md p-2 cursor-pointer' onClick={handleOrder}>Proceed</button>

                        </div>) : <>
                            <h4 className='text-red-600'>
                                Please Login to place order
                            </h4>
                        </>}
                        {proceed ? (<div className="w-full">
                            <button className=' text-white text-lg bg-blue-600 hover:bg-blue-700 rounded-md p-2 cursor-pointer' onClick={placeOrder}>Place Order</button>

                        </div>) : <></>}
                    </div>

                </div>
            </>
            ) : (<>
                <h1 className='text-2xl text-red-600 text-center'>Add products in your cart</h1>
            </>)}



        </Layout>
    )
}

export default CartPage;