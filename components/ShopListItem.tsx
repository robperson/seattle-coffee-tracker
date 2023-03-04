import { Shop } from "@/models/shops"
import styles from '@/styles/Home.module.css'

type Props = {
    shop: Shop
}

const ShopListItem = ({ shop }: Props) => {
    return (
        <li key={shop.id} className={styles.shopListItem}>
            <img src={shop.imageURL} alt="image" width={100} height={100} />
            <div className="shopDetails">
                <h1><a href={shop.URL}>{shop.name}</a></h1>
                <p>{shop.rating} ⭐️ ({shop.reviewCount} ratings)</p>
                <p>{shop.displayAddress[0]}</p>
            </div>
        </li>
    )
}

export default ShopListItem