"use client";

import Product from "@/components/Product/Product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./CategoryPage.module.css";

interface ProductType {
    id: number;
    image: string;
    title: string;
    description: string;
    category: string;
    price: number;
}

const categoryMapping: Record<string, string> = {
    mens: "men's clothing",
    womens: "women's clothing",
    jewelery: "jewelery",
    electronics: "electronics"
};

export default function CategoryPage() {
    const params = useParams();
    const categoryKey = params.name;

    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiCategoryName = categoryMapping[categoryKey];
        if (!apiCategoryName) return;

        fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(apiCategoryName)}`)
            .then(res => res.json())
            .then((data) => {
                console.log(`Category: ${categoryKey}`);
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, [categoryKey]);

    if (loading) return <p>loading products...</p>

    return (
        <div className={styles.container}>
            <div className={styles.productsGrid}>
                {products.map(p => (
                    <Product
                        key={p.id}
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