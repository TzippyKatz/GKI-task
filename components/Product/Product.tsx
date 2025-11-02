import Link from 'next/link';
import { useCartStore } from '../../app/store/useCartStore';
import styles from './Product.module.css';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { useWishlistStore } from '@/app/store/useWishlistStore';

interface productProps {
    id: number,
    image: string,
    title: string,
    description: string,
    category: string,
    price: number
}

export default function Product({ id, image, title, description, category, price }: productProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const { addToWishlist, removeFromWishlist, items } = useWishlistStore();
    const pathName = usePathname();

    const isInWishlist = items.some(item => item.id === id);

    const handleAddToCart = () => {
        addToCart({ id, title, price, image });
    }

    const handleAddToWishlist = () => {
        if (isInWishlist) {
            removeFromWishlist(id);
        }
        else {
            addToWishlist({ id, title, price, image });
        }
    }

    return (
        <div className={styles.product}>
            <Link href={`/products/${id}?from=${pathName}`}>

                <div className={styles.productImage}>
                    <img src={image} alt={title}></img>
                </div>
                <div className={styles.productContain}>
                    <h3 className={styles.productTitle}>
                        {title.length > 40 ? title.slice(0, 30) + "..." : title}
                    </h3>
                    <h3 className={styles.productCategory}>{category}</h3>
                    <span className={styles.price}>{price}$</span>
                </div>
            </Link>
            <div className={styles.buttons}>
                <button className={styles.addToCart} onClick={handleAddToCart}>🛒ADD TO CART</button>
                <button className={`${styles.heart} ${isInWishlist ? styles.active : ""}`} onClick={handleAddToWishlist}><FaHeart /></button>
            </div>
        </div >
    )
}