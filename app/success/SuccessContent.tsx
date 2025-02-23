// app/success/SuccessContent.js
'use client';

import React, { useEffect } from 'react';
import { useCartContext } from '../context/CartContext';
import { BsBagCheckFill } from 'react-icons/bs';
import Link from 'next/link';
import { runFireworks } from '@/lib/utils';

export default function SuccessContent({ customerEmail }) {
    const { setCartItems, setTotalPrice, setTotalQty } = useCartContext();

    useEffect(() => {
        // Réinitialiser le panier
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQty(0);

        // Déclencher les confettis
        runFireworks();
    }, [setCartItems, setTotalPrice, setTotalQty]);

    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order!</h2>
                <p className="email-msg">
                    Check your email inbox for the receipt. {customerEmail && `A confirmation email has been sent to ${customerEmail}.`}
                </p>
                <p className="description">
                    If you have any questions, please email{' '}
                    <a className="email" href="mailto:order@example.com">
                        order@example.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
}