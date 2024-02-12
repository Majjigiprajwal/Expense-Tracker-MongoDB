import React from 'react'
import { createContext, useContext, useState} from "react";


const PremiumContext = createContext()


export const PremiumContextProvider = ({children})=>{
    const [isPremium,setIsPremium] = useState(false)

    const values = {
        isPremium,
        setIsPremium
    }

    return(<PremiumContext.Provider value={values}>{children}</PremiumContext.Provider>)
}

export const usePremium = ()=> useContext(PremiumContext)