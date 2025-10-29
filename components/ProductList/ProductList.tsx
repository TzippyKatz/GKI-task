"use client";

import { useEffect, useState } from "react"
import Product from "../Product/Product";
import styles from './ProductList.module.css';
import Image from "next/image";
import logo from "../../media/logo2.jpg";

interface ProductType {
    id: number;
    image: string;
    title: string;
    description: string;
    category: string;
    price: number;
}

export default function ProductList() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>loading products...</p>

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image src={logo} alt="M&H - Milk & Honey Distillery."/>
            </div>
            <h4>LATEST PRODUCTS</h4>
            <div className={styles.productsGrid}>
                {products.map((p) =>
                (
                    <Product
                        key={p.id}
                        id={p.id}
                        image={p.image}
                        title={p.title}
                        description={p.description}
                        category={p.category}
                        price={p.price}
                    />
                ))}
            </div>
        </div>
    )
}