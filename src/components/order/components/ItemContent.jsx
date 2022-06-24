import Image from "next/image";
import styles from '../../../../styles/Order.module.css'
import IconHoaToc from "../assets/icon_hoa_toc.png";

const ItemContent = ({ shipping }) => {
  return (
    <div className={styles.shippingContainer}>
      <Image
        src={IconHoaToc}
        alt=""
        className={styles.icon}
        width={32}
        height={32}
      />
      <div className={styles.itemContainer}>
        <div className={styles.itemContent}>
          <strong>{shipping?.vehicleType}</strong>
          <p className={styles.itemDescription}>{shipping?.vehicleType}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemContent