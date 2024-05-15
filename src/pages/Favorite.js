// Favorite Component to watch and remove favourite products


import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { useFav } from '../context/favorite'
import { CiCircleRemove } from "react-icons/ci";
import toast from 'react-hot-toast';

const Favorite = () => {

    const [favorite, setFavorite] = useFav()

    //removing favourite product
    const removeFavItem = (pid) => {

        try {

            let myFav = [...favorite]
            let index = myFav.findIndex(item => item.id === pid)
            myFav.splice(index, 1)
            setFavorite(myFav)
            localStorage.setItem('favorites', JSON.stringify(myFav))
            toast.success("Item removed from Favourites")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={"ShopKart Favorites"}>
            {favorite?.length ? (<>
                <div className="flex flex-row">
                    <div className='bg-gray-200 ml-2 mr-2 w-2/3  mt-5 rounded-sm p-2 text-2xl left-6'>My Favourites
                        <div className="mt-2">
                            {favorite?.map(p => (
                                <div className="flex flex-row bg-white m-1 rounded-sm">
                                    <img src={p.image} className='h-24 w-24 m-2' alt={p.title} />
                                    <div className="text-xl text-gray-700 p-1 flex flex-col">
                                        {p.title}
                                        <div className="text-lg text-black">
                                            Price: ₹{p.amount}
                                        </div>
                                    </div>
                                    <div className="grid mr-3 py-10 w-full  justify-items-end   ">

                                        <CiCircleRemove className='text-3xl text-red-600 hover:bg-red-800 hover:text-white cursor-pointer rounded-full ' onClick={() => removeFavItem(p.id)} />
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>) : (<>
                <div className="text-center text-2xl text-red-700">No Favourites added yet</div>
            </>)}
        </Layout>
    )
}

export default Favorite