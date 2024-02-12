import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { usePremium } from '../context/PremiumContext';

const RestrictedRoutes = () => {

    const {isPremium} = usePremium()
  return (
    <div>
    {isPremium ? (
                <Outlet />
    ) : (
      <Navigate to="/dashboard" />
    )}
  </div>
  )
}

export default RestrictedRoutes
