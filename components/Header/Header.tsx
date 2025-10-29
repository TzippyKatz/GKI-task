"use client";

import Link from 'next/link';
import styles from './Header.module.css';
import { useCartStore } from '../../app/store/useCartStore';

const categories = {
    mens: "mens clothing",
    womens: "womens clothing",
    jewelery: "jewelery",
    electronics: "electronics"
}
export default function Header() {
    const products = useCartStore(state => state.products);
    const totalCount = products.reduce((acc, p) => acc + p.quantity, 0);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="https://lh3.googleusercontent.com/chat_attachment/AP1Ws4uFVdGEaeJuo-x3f73zmna5Zt_bDSDFy0k-fmQ7XNmUPTLkuLrKMCI0nWpd1xUWyVXIqFRR9lI3gLKndRP0FtgDrm-4nrwa_NOAtLSlll-SX4EPUh4qb0GNvWLimvFjypvfYUPKTbVBslsPHackkvrArB-Ze13tKkzqjKJVqvIB_DzUludcAkfy2s_KOHe2cmBnf9oN-oB4_oIsgqDoo8zpVzgTQOEwXUtY7Zc08TXX0yPQ76huEy6vZmuFjjnr-vfFDy1Tmh-EtqzftVbTMqOxbn38tdJqhlOUlNL30Nx-LR_FwGoK_fGF6_KHg1tq1aE=w512" alt="Hadasim - fashion logo"></img>
            </div>
            <nav className={styles.nav}>
                <Link href="/">Home</Link>
                <Link href="/category/mens">Mens</Link>
                <Link href="/category/womens">Womens</Link>
                <Link href="/category/jewelery">Jewelery</Link>
                <Link href="/category/electronics">Electronics</Link>
                <Link href="/contact-us">Contact Us</Link>
            </nav>
            <div className={styles.cart}>Cart({totalCount})</div>
        </header>
    );
}