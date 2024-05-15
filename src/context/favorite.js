//Favorite Product context

import { useState, useContext, createContext, useEffect } from "react";

const FavContext = createContext()

const FavProvider = ({ children }) => {
    const [favorite, setFavorite] = useState([]);
    useEffect(() => {
        let existingFavItem = localStorage.getItem('favorites')
        if (existingFavItem) setFavorite(JSON.parse(existingFavItem))
    }, [])

    return (
        <FavContext.Provider value={[favorite, setFavorite]}>
            {children}
        </FavContext.Provider>
    );
}
const useFav = () => useContext(FavContext);

export { useFav, FavProvider };