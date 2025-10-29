"use client";

import Link from 'next/link';
import styles from './Header.module.css';
import { useCartStore } from '../../app/store/useCartStore';
import Image from "next/image";
import { useState } from "react";
import CartModal from '../CartModal/CartModal';
import logo from "../../media/logo.png";

const categories = {
    mens: "mens clothing",
    womens: "womens clothing",
    jewelery: "jewelery",
    electronics: "electronics"
}
export default function Header() {
    const products = useCartStore(state => state.products);
    const totalCount = products.reduce((acc, p) => acc + p.quantity, 0);

    const [isCartOpen, setCartOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image src={logo} alt="M&H - Milk & Honey Distillery." width={50} height={50} />
            </div>
            <nav className={styles.nav}>
                <Link href="/">Home</Link>
                <Link href="/category/mens">Mens</Link>
                <Link href="/category/womens">Womens</Link>
                <Link href="/category/jewelery">Jewelery</Link>
                <Link href="/category/electronics">Electronics</Link>
                <Link href="/contact-us">Contact Us</Link>
            </nav>

            {/* כפתור סל הקניות */}
            <div className={styles.cart} onClick={() => setCartOpen(true)}>
                Cart({totalCount})
            </div>

            {/* מודאל סל הקניות */}
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setCartOpen(false)}
            />
        </header>
    );
}