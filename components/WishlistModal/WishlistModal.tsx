"use client";

import { useWishlistStore } from "../../app/store/useWishlistStore";
import styles from "./WishlistModal.module.css";
import Image from "next/image";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const items = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Wishlist</h3>
        <div className={styles.items}>
          {items.length === 0 && <p>Your wishlist is empty.</p>}
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <Image src={item.image} alt={item.title} width={60} height={60} />
              <span>{item.title}</span>
              <button onClick={() => removeFromWishlist(item.id)}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
