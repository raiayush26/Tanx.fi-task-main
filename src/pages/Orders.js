//Order Page to see and keep track of orders placed in past

import Layout from '../Layout/Layout'
import React, { useEffect, useState } from 'react'
import Server from '../Server/Server'

const Orders = () => {

    const [order, setOrder] = useState([])

    //getting all orders on iniltail time from JSON Server
    useEffect(() => {
        fetch(`${Server}/orders`)
            .then((res) => res.json())
            .then(data => setOrder(data))
    }, [])
    console.log(order)
    return (
        <Layout title={"Shopkart Orders"}>
            {order?.length ? (<>
                <h1 className='text-center text-3xl'>Orders</h1>
                <div className="flex flex-col w-100 bg-gray-200">
                    {/* <div className="bg-gray-400 w-100 text-center ml-8 mr-8 mt-2"></div> */}
                    {order.map(order => (
                        <div className='mt-2 mb-2' key={order.id}>
                            <h3 className='text-lg font-bold'>Order ID: {order.id}</h3>
                            <div className="flex flex-row">

                                <ul className='flex flex-row'>
                                    {order.cart.map(item => (
                                        <li className='flex flex-col ml-2 mr-4' key={item.id}>
                                            <img className='h-24 w-24 m-2' src={item.image} alt={item.title} />
                                            <h4>{item.title}</h4>
                                            {/* <p>{item.description}</p> */}
                                            <p>Amount: ₹{item.amount}</p>
                                            <p>Rating: {item.rating}</p>
                                        </li>

                                    ))}
                                </ul>
                            </div>
                            <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
                        </div>
                    ))}
                </div>
            </>) : (<>
                <h1 className='text-red-700 text-2xl text-center'>No Orders placed yet</h1>
            </>)}
        </Layout >
    )
}

export default Orders