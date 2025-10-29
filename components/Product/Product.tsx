import Link from 'next/link';
import { useCartStore } from '../../app/store/useCartStore';
import styles from './Product.module.css';
import { usePathname } from 'next/navigation';

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
    const pathName = usePathname();

    const handleAddToCart = () => {
        addToCart({ id, title, price, image });
    }

    return (
        <div className={styles.product}>
            <Link href={`/products/${id}?from=${pathName}`}>

                <div className={styles.productImage}>
                    <img src={image} alt={title}></img>
                </div>
                <div className={styles.productContain}>
                    <h3 className={styles.productTitle}>{title}</h3>
                    <h3 className={styles.productCategory}>{category}</h3>
                    <span className={styles.price}>{price}$</span>
                    <button onClick={handleAddToCart}>🛒ADD TO CART</button>
                </div>
            </Link>
        </div >
    )
}