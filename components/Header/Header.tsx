"use client";

import Link from 'next/link';
import styles from './Header.module.css';
import { useCartStore } from '../../app/store/useCartStore';
import { useWishlistStore } from '../../app/store/useWishlistStore';
import Image from "next/image";
import { useState } from "react";
import CartModal from '../CartModal/CartModal';
import WishlistModal from '../WishlistModal/WishlistModal';
import logo from "../../media/logo.png";
import { FaHeart } from "react-icons/fa";

const categories = {
    mens: "mens clothing",
    womens: "womens clothing",
    jewelery: "jewelery",
    electronics: "electronics"
}
export default function Header() {
    const products = useCartStore(state => state.products);
    const totalCount = products.reduce((acc, p) => acc + p.quantity, 0);

    const wishlistItems = useWishlistStore(state => state.items);
    const wishlistCount = wishlistItems.length;

    const [isCartOpen, setCartOpen] = useState(false);
    const [isWishlistOpen, setWishlistOpen] = useState(false);

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

            <div className={styles.actions}>
                {/* Wishlist Icon */}
                <div className={styles.wishlist} onClick={() => setWishlistOpen(true)}>
                    <FaHeart color="red" size={22} />
                    {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
                </div>

                {/* Cart Icon */}
                <div className={styles.cart} onClick={() => setCartOpen(true)}>
                    Cart({totalCount})
                </div>
            </div>

            {/* Modals */}
            <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
            <WishlistModal isOpen={isWishlistOpen} onClose={() => setWishlistOpen(false)} />
        </header>
    );
}