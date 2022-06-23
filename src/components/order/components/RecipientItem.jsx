import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Image from "next/image";
import { useState } from "react";
import IconBank from "../assets/icon_bank.png";
import IconIdCard from "../assets/icon_id_card.png";
import IconMapDetail from "../assets/icon_map_detail.png";
import IconTelephone from "../assets/icon_telephone.png";
import styles from './styles.module.css'

const RecipientItem = () => {
  const [show, setShow] = useState(true)
  return (
    <>
      <div
        onClick={() => setShow(false)}
        className={styles.locationConfirm}
      >
        <LocationOnOutlinedIcon style={{ width: 20, height: 20 }} />
        <div className={styles.locationConfirmContent}>
          <strong className="size-m">{'recipientAddress'}</strong>
          <br />
          <small>{'recipientAlley'}</small>
          <br />
          <small>Lấy hàng: {'recipientPhone'}</small>
        </div>
      </div>
      <div style={{ display: show ? "block" : "none" }}>
        <div className={styles.inputContainer}>
          <LocationOnOutlinedIcon style={{ width: 20, height: 20 }} />
          <input
            // ref={recipientRef}
            className={styles.input}
            placeholder="Bạn muốn giao hàng đến đâu?"
          />
        </div>
        <Input
          // value={recipientAlley}
          // onChange={(e) => handleChangeRecipient("alley", e)}
          icon={IconMapDetail}
          placeholder="Thêm địa chỉ ngõ, ngách, tầng...(nếu có)"
        />
        <div style={{ display: "flex", margin: "-15px 0" }}>
          <div style={{ marginRight: 30 }}>
            <Input
              // value={recipientName}
              // onChange={(e) => handleChangeRecipient("name", e)}
              icon={IconIdCard}
              placeholder="Tên người nhận"
            />
          </div>
          <Input
            // value={recipientPhone}
            // onChange={(e) => handleChangeRecipient("phone", e)}
            icon={IconTelephone}
            placeholder="SĐT người nhận"
          />
        </div>
        <Input
          // value={recipientCount}
          // onChange={(e) => handleChangeRecipient("count", e)}
          icon={IconBank}
          placeholder="Tiền ứng"
        />
        <div className={styles.btnContainer}>
          <div className={styles.btnFlex}>
            <Button onClick={() => setShow(false)}>Xong</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipientItem;

const Input = ({ value, icon, placeholder, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <Image src={icon} width={20} height={20} alt="" />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

const Button = ({ children, type = "primary", onClick }) => {
  return (
    <button onClick={onClick} className={styles[`button-${type}`]}>
      {children}
    </button>
  );
};
