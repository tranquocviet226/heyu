import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useEffect, useState } from "react";
import styles from "../../../../styles/Order.module.css";
import IconBank from "../assets/icon_bank.png";
import IconIdCard from "../assets/icon_id_card.png";
import IconMapDetail from "../assets/icon_map_detail.png";
import IconTelephone from "../assets/icon_telephone.png";
import ButtonComponent from "./Button";
import InputComponent from "./Input";

const RecipientItem = ({ recipient, onChangeStatus }) => {
  const { done } = recipient;
  
  return (
    <>
      {done ? (
        <>
          <div
            onClick={() => onChangeStatus(false)}
            className={styles.locationConfirm}
            style={{ marginBottom: 8 }}
          >
            <LocationOnOutlinedIcon style={{ width: 20, height: 20 }} />
            <div className={styles.locationConfirmContent}>
              <strong className="size-m">{"recipientAddress"}</strong>
              <br />
              <small>{"recipientAlley"}</small>
              <br />
              <small>Lấy hàng: {"recipientPhone"}</small>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className={styles.inputContainer}>
            <LocationOnOutlinedIcon style={{ width: 20, height: 20 }} />
            <input
              // ref={recipientRef}
              className={styles.input}
              placeholder="Bạn muốn giao hàng đến đâu?"
            />
          </div>
          <InputComponent
            // value={recipientAlley}
            // onChange={(e) => handleChangeRecipient("alley", e)}
            icon={IconMapDetail}
            placeholder="Thêm địa chỉ ngõ, ngách, tầng...(nếu có)"
          />
          <div style={{ display: "flex", margin: "-15px 0" }}>
            <div style={{ marginRight: 30 }}>
              <InputComponent
                // value={recipientName}
                // onChange={(e) => handleChangeRecipient("name", e)}
                icon={IconIdCard}
                placeholder="Tên người nhận"
              />
            </div>
            <InputComponent
              // value={recipientPhone}
              // onChange={(e) => handleChangeRecipient("phone", e)}
              icon={IconTelephone}
              placeholder="SĐT người nhận"
            />
          </div>
          <InputComponent
            // value={recipientCount}
            // onChange={(e) => handleChangeRecipient("count", e)}
            icon={IconBank}
            placeholder="Tiền ứng"
          />
          <div className={styles.btnContainer}>
            <div className={styles.btnFlex}>
              <ButtonComponent onClick={() => onChangeStatus(true)}>
                Xong
              </ButtonComponent>
            </div>
            <div className={styles.btnFlex}>
              <ButtonComponent onClick={() => onChangeStatus(true)} primary={false}>
                Hủy
              </ButtonComponent>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipientItem;
