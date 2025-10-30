"use client";

import { useCartStore } from "../../app/store/useCartStore";
import styles from "./CartModal.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const router = useRouter();
  const products = useCartStore((state) => state.products);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const total = useCartStore((state) => state.total);

  if (!isOpen) return null;

  //navigate to page
  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.items}>
          {products.length === 0 && <p>Your cart is empty.</p>}
          {products.map((p) => (
            <div className={styles.item} key={p.id}>
              <Image src={p.image} alt={p.title} width={60} height={60} />
              <div className={styles.info}>
                <span className={styles.title}>{p.title}</span>
                <div className={styles.quantity}>
                  <button
                    onClick={() => {
                      if (p.quantity > 1) updateQuantity(p.id, p.quantity - 1);
                      else removeFromCart(p.id);
                    }}
                  >
                    -
                  </button>
                  <span>{p.quantity}</span>
                  <button onClick={() => updateQuantity(p.id, p.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
              <button
                className={styles.delete}
                onClick={() => removeFromCart(p.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <span>Total: ${total().toFixed(2)}</span>
          <button className={styles.checkout} onClick={handleCheckout}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
