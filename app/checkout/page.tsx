"use client";

import { useCartStore } from "../store/useCartStore";
import styles from "./CheckoutPage.module.css";
import Image from "next/image";

export default function CheckoutPage() {
  const products = useCartStore((state) => state.products);
  const totalPrice = products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>עגלת הקניות ריקה</h2>
      </div>
    );
  }

  return (
    <div className={styles.checkout}>
      <h1 className={styles.title}>סיכום הזמנה</h1>

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
              <p>כמות: {product.quantity}</p>
              <p>מחיר ליחידה: {product.price} ₪</p>
              <p className={styles.subtotal}>
                סה״כ: {(product.price * product.quantity).toFixed(2)} ₪
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <h2>סכום לתשלום: {totalPrice.toFixed(2)} ₪</h2>
        <button className={styles.orderButton}>סיים הזמנה</button>
      </div>
    </div>
  );
}
