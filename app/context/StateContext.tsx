import React, {createContext, useContext, useState} from 'react'
import { toast } from 'react-hot-toast';

// Création du contexte global
const Context = createContext({});

export const CartContext = ( {children})=>{

    // États globaux pour la gestion du panier
    const [showCart,setShowCart]=useState(false);
    const [cartItems,setCartItems]=useState([])
    const [totalPrice,setTotalPrice]=useState(0);
    const [totalQty,setTotalQty]=useState(0);
    const [qty,setQty]=useState(1);

    // Fonction pour ajouter un produit au panier
    const addToCart=(product,quantity)=>{
        setTotalPrice((prevPrice)=>prevPrice + product.price *quantity);
        setTotalQty((prevQty)=> prevQty + quantity)
        const existingProduct = cartItems.find((item)=> item._id === product._id);
        const updatingCartItems=[...cartItems];
        if(existingProduct){
            updatingCartItems.forEach(
                (item)=>{
                    if(item._id=== product._id){
                        item.quantity+=quantity;
                    }
                });
        }else {
            updatingCartItems.push({...product,quantity});
        }
        setCartItems(updatingCartItems);
        toast.success(`${quantity} ${product.name} ajouté au panier.`)

    };

    // Fonction pour supprimer un produit du panier
    const deleteFromCart=(product)=>{
        const updatingCartItems=cartItems.filter((item)=>item._id != product._id);
        setTotalPrice((prevPrice)=>prevPrice - product.price *product.quantity);
        setTotalQty((prevQty)=> prevQty - product.quantity);
        setCartItems(updatingCartItems);
    };

    // Fonction pour ajuster la quantité d'un article
    const toggleCartItemQuantity = (id, value) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item._id === id) {
                if (value === 'inc') {
                    setTotalPrice((prevTotalPrice) => prevTotalPrice + item.price);
                    setTotalQty((prevTotalQuantities) => prevTotalQuantities + 1);
                    return { ...item, quantity: item.quantity + 1 };
                } else if (value === 'dec' && item.quantity > 1) {
                    setTotalPrice((prevTotalPrice) => prevTotalPrice - item.price);
                    setTotalQty((prevTotalQuantities) => prevTotalQuantities - 1);
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        });

        setCartItems(updatedCartItems);
    };
    // Fonctions pour augmenter ou diminuer la quantité avant ajout au panier
    const incQty=()=>setQty( (prevQty)=>prevQty+1);
    const decQty=()=>setQty( (prevQty)=>prevQty>1 ? prevQty-1 :1);

    return(
        <Context.Provider
            value={ {
                showCart,setShowCart,
                cartItems,setCartItems,
                totalQty,setTotalQty,
                qty,setQty,
                addToCart,deleteFromCart,toggleCartItemQuantity,
                incQty,decQty
            } }>

            {children}
        </Context.Provider>
    );
};

export const  useCartContext =()=> useContext(Context);
