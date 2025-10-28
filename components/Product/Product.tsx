import styles from './Product.module.css';

interface productProps {
    image: string,
    title: string,
    description: string,
    category: string,
    price: number
}

export default function Product({ image, title, description, category, price }: ProductProps) {
    const addToCart = () => {
        //use in zustand to add cart.
    }

    return (
        <div className={styles.product}>
            <div className={styles.productImage}>
                <img src={image} alt={title}></img>
            </div>
            <div className={styles.productContain}>
                <h3 className={styles.productTitle}>{title}</h3>
                <h3 className={styles.productCategory}>{category}</h3>
                <span className={styles.price}>{price}$</span>
                <button onClick={addToCart}>🛒ADD TO CART</button>
            </div>
        </div>
    )
}