import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useEffect, useState } from "react";
import styles from "../../../../styles/Order.module.css";
import IconBank from "../assets/icon_bank.png";
import IconIdCard from "../assets/icon_id_card.png";
import IconMapDetail from "../assets/icon_map_detail.png";
import IconTelephone from "../assets/icon_telephone.png";
import IconClose from "../assets/icon_close.png";
import ButtonComponent from "./Button";
import InputComponent from "./Input";
import { usePlacesWidget } from "react-google-autocomplete";
import Image from "next/image";
import { formatCurrency } from "../services/utils";

const GOOGLE_MAPS_API = "AIzaSyCYV4Or3XIHIGjQesLmKCvoFLK-w8gp-rE";

const initRecipient = {
  address: "",
  alley: "",
  name: "",
  phone: "",
  count: "",
  geo: [],
}

const RecipientItem = ({ recipient, onSubmitRecipient, onCancelRecipient }) => {
  const { done } = recipient;

  const [recipientData, setRecipientData] = useState(initRecipient)
  const [countFormat, setCountFormat] = useState()

  const recipientAddress = recipientData.address;
  const recipientAlley = recipientData.alley;
  const recipientPhone = recipientData.phone;
  const recipientName = recipientData.name;
  const recipientCount = recipientData.count;


  useEffect(() => {
    setRecipientData({
      address: recipient.address,
      alley: recipient.alley,
      name: recipient.name,
      phone: recipient.phone,
      count: recipient.count,
      geo: recipient.geo
    })
  }, [recipient])

  useEffect(() => {
    setCountFormat(formatCurrency(recipientCount))
  }, [recipientCount])

  const recipientRef = usePlacesWidget({
    apiKey: GOOGLE_MAPS_API,
    onPlaceSelected: (place) => {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const formatted_address = place.formatted_address;

      setRecipientData((info) => ({
        ...info,
        address: formatted_address,
        geo: [lng, lat],
      }));
    },
  }).ref;

  const handleChangeRecipient = (field, e) => {
    e.preventDefault();
    setRecipientData({
      ...recipientData,
      [field]: e.target.value
    });
  };

  const onSubmit = (status) => {
    onSubmitRecipient(recipientData, status)
  }

  const onCancel = () => {
    onCancelRecipient()
  }

  return (
    <>
      <div style={{ display: done ? 'flex' : 'none', alignItems: 'center' }}>
        <div
          onClick={() => onSubmit(false)}
          className={styles.locationConfirm}
          style={{ marginBottom: 8, width: '100%' }}
        >
          <LocationOnOutlinedIcon style={{ width: 20, height: 20 }} />
          <div className={styles.locationConfirmContent}>
            <strong className="size-m">{recipientAddress}</strong>
            {recipientAlley && recipientAlley.trim() !== '' && <>
              <br /><small>{recipientAlley}</small>
            </>}
            {recipientName && recipientName.trim() !== '' && <>
              <br /><small>{recipientName}</small>
            </>}
            {recipientPhone && recipientPhone.trim() !== '' && <>
              <br /><small>{recipientPhone}</small>
            </>}
            {recipientCount && recipientCount.trim() !== '' && <>
              <br /><small>{countFormat} đ</small>
            </>}
          </div>
        </div>
        <Image onClick={onCancel} alt="" src={IconClose} width={50} height={50} style={{ cursor: 'pointer' }} />
      </div>

      <div style={{ display: done ? 'none' : 'block' }}>
        <div className={styles.inputContainer}>
          <LocationOnOutlinedIcon style={{ width: 20, height: 20 }} />
          <input
            ref={recipientRef}
            className={styles.input}
            defaultValue={recipientAddress}
            placeholder="Bạn muốn giao hàng đến đâu?"
          />
        </div>
        <InputComponent
          value={recipientAlley}
          onChange={(e) => handleChangeRecipient("alley", e)}
          icon={IconMapDetail}
          placeholder="Thêm địa chỉ ngõ, ngách, tầng...(nếu có)"
        />
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 30 }}>
            <InputComponent
              value={recipientName}
              onChange={(e) => handleChangeRecipient("name", e)}
              icon={IconIdCard}
              placeholder="Tên người nhận"
            />
          </div>
          <InputComponent
            value={recipientPhone}
            onChange={(e) => handleChangeRecipient("phone", e)}
            icon={IconTelephone}
            type="number"
            placeholder="SĐT người nhận"
          />
        </div>
        <InputComponent
          value={recipientCount}
          onChange={(e) => handleChangeRecipient("count", e)}
          icon={IconBank}
          type="number"
          placeholder="Tiền ứng"
        />
        <div className={styles.btnContainer}>
          <div className={styles.btnFlex}>
            <ButtonComponent
              disabled={recipientRef?.current?.value ? false : true}
              onClick={() => onSubmit(true)}>
              Xong
            </ButtonComponent>
          </div>
          <div className={styles.btnFlex}>
            <ButtonComponent onClick={onCancel} primary={false}>
              Hủy
            </ButtonComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipientItem;
