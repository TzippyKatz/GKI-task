"use client";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./ItemPage.module.css";
import { useCartStore } from "../../../app/store/useCartStore";

interface ProductType {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export default function ItemPage() {
    const params = useParams();
    const productId = params.id;

    const router = useRouter();

    const addToCart = useCartStore((state) => state.addToCart);

    //back to last page
    const navigationParams = useSearchParams();
    const from = navigationParams.get("from") || "/";
    const categoryName = from.split("/").pop()?.replace("-", " ") || "Home";
    const fromText = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    const backTo = from;

    const handleBack = () => {
        router.push(from);
    };

    const [product, setProduct] = useState<ProductType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then((data) => {
                console.log(`Product: ${productId}`);
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, [productId]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
        });
    };

    if (loading) return <p>Loading product...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className={styles.container}>
            <button className={styles.backBtn} onClick={handleBack}>
                ⬅ Back To {fromText}
            </button>

            <div className={styles.productWrapper}>
                <img className={styles.image} src={product.image} alt={product.title} />

                <div className={styles.details}>
                    <h2 className={styles.title}>{product.title}</h2>
                    <p className={styles.category}>{product.category.toUpperCase()}</p>
                    <p className={styles.description}>{product.description}</p>
                    <span className={styles.price}>PRICE: {product.price}$</span>

                    <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
}