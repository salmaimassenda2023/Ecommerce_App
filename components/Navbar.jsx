'use client'

import React from 'react'
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import {useCartContext} from '../app/context/CartContext'
import Cart from "@/components/Cart";

const Navbar=()=>{
    const {showCart,setShowCart,totalQty}=useCartContext();
    return(
        <div className="navbar-container">
            <p className="logo">
                <Link href="/"> IMA Headphones  </Link>
            </p>
            <button type="button" className="cart-icon" onClick={()=> setShowCart(true)} >
                <AiOutlineShopping />
                <span className="cart-item-qty">{totalQty}</span>
            </button>
            {showCart && <Cart/>  }

        </div>
    )
}
export default Navbar