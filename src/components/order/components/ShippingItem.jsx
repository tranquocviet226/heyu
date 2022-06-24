import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ItemContent from "./ItemContent";
import styles from '../../../../styles/Order.module.css'

const ShippingItem = ({ shipping, handleClick, active }) => {
  return (
    <div onClick={handleClick} className={styles.item}>
      <ItemContent shipping={shipping} />
      {active && <DoneOutlinedIcon />}
    </div>
  );
};

export default ShippingItem