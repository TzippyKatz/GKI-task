"use client";

import { useCartStore } from "../store/useCartStore";
import styles from "./CheckoutPage.module.css";
import Image from "next/image";

export default function CheckoutPage() {
  const products = useCartStore((state) => state.products);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const totalPrice = products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className={styles.checkout}>
      <h1 className={styles.title}>
        Order <span>Summary</span>
      </h1>

      <div className={styles.items}>
        {products.map((product) => (
          <div key={product.id} className={styles.item}>
            <Image
              src={product.image}
              alt={product.title}
              width={120}
              height={120}
              className={styles.image}
            />
            <div className={styles.info}>
              <h2>{product.title}</h2>
              <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>
                -
              </button>
              <span>{product.quantity}</span>
              <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <h2>TOTAL: {totalPrice.toFixed(2)} $</h2>
        <button className={styles.orderButton}>COMPLETE ORDER</button>
      </div>
    </div>
  );
}
