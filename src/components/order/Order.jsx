import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import styles from "../../../styles/Order.module.css";
import { estimateCostService, getDeliveryCartType } from "../../services/order";
import IconBank from "./assets/icon_bank.png";
import IconCash from "./assets/icon_cash.png";
import IconIdCard from "./assets/icon_id_card.png";
import IconMapDetail from "./assets/icon_map_detail.png";
import IconTelephone from "./assets/icon_telephone.png";
import ButtonComponent from "./components/Button";
import InputComponent from "./components/Input";
import ItemContent from "./components/ItemContent";
import RecipientItem from "./components/RecipientItem";
import ShippingItem from "./components/ShippingItem";

const GOOGLE_MAPS_API = "AIzaSyCYV4Or3XIHIGjQesLmKCvoFLK-w8gp-rE";
const mapOptions = {};

const deliveryInfoDefault = {
  pickup: {
    address: "",
    alley: "",
    phone: "",
    geo: [],
  },
  recipients: {
    address: "",
    alley: "",
    name: "",
    phone: "",
    count: "",
    geo: [],
  },
  vehicleType: "",
  pickupTime: "Now",
  menuId: "",
};

const Order = () => {
  const initRecipient = {
    id: Date.now(),
    done: false,
    address: "",
    alley: "",
    name: "",
    phone: "",
    count: "",
    geo: [],
  };

  const [showShipping, setShowShipping] = useState(false);
  const [confirmPickup, setConfirmPickup] = useState(false);
  const [confirmRecipient, setConfirmRecipient] = useState(false);
  const [shippingMethod, setShippingMethod] = useState([]);
  const [currentShipping, setCurrentShipping] = useState();
  const [deliveryInfo, setDeliveryInfo] = useState(deliveryInfoDefault);
  const [recipientList, setRecipientList] = useState([initRecipient]);

  const pickupAddress = deliveryInfo.pickup.address;
  const pickupAlley = deliveryInfo.pickup.alley;
  const pickupPhone = deliveryInfo.pickup.phone;
  const recipientAddress = deliveryInfo.recipients.address;
  const recipientAlley = deliveryInfo.recipients.alley;
  const recipientPhone = deliveryInfo.recipients.phone;
  const recipientName = deliveryInfo.recipients.name;
  const recipientCount = deliveryInfo.recipients.count;
  const shippingRef = useRef();

  const pickRef = usePlacesWidget({
    apiKey: GOOGLE_MAPS_API,
    onPlaceSelected: (place) => {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const formatted_address = place.formatted_address;

      setDeliveryInfo((info) => ({
        ...info,
        pickup: {
          ...info.pickup,
          geo: [lng, lat],
          address: formatted_address,
        },
      }));
    },
    mapOptions,
  }).ref;

  const recipientRef = usePlacesWidget({
    apiKey: GOOGLE_MAPS_API,
    onPlaceSelected: (place) => {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const formatted_address = place.formatted_address;

      setDeliveryInfo((info) => ({
        ...info,
        recipients: {
          ...info.recipients,
          geo: [lng, lat],
          address: formatted_address,
        },
      }));
    },
    mapOptions,
  }).ref;

  const handleSelectItem = (shipping) => {
    setCurrentShipping(shipping);
    setShowShipping(false);
  };

  const handleChangePickup = (field, e) => {
    e.preventDefault();
    setDeliveryInfo({
      ...deliveryInfo,
      pickup: { ...deliveryInfo.pickup, [field]: e.target.value },
    });
  };

  const handleConfirmPickup = () => {
    if (
      pickupAddress.trim() !== "" &&
      pickupPhone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/)
    ) {
      setConfirmPickup(true);
    }
  };

  const handleChangeRecipient = (field, e) => {
    e.preventDefault();
    setDeliveryInfo({
      ...deliveryInfo,
      recipients: { ...deliveryInfo.recipients, [field]: e.target.value },
    });
  };

  const handleAddRecipient = () => {
    const recipient = { ...initRecipient };
    recipient.id = Date.now();
    recipient;
    setRecipientList([...recipientList, recipient]);
  };

  const handleChangeStatus = (id, status) => {
    const newRecipientList = [...recipientList];
    const itemIdx = newRecipientList.findIndex((item) => item.id === id);
    newRecipientList[itemIdx].done = status;
    setRecipientList(newRecipientList);
  };

  const handleSubmit = () => {
    const submitDelivery = async () => {
      // await submitDeliveryService();
    };
    submitDelivery();
  };

  useEffect(() => {
    const getDelivery = async () => {
      const response = await getDeliveryCartType(deliveryInfo?.pickup.geo);
      setShippingMethod(response);
      setCurrentShipping(response.length ? response[0] : []);
    };
    getDelivery();
  }, [deliveryInfo]);

  useEffect(() => {
    const estCost = async () => {
      const data = {
        pickup: {
          geo: deliveryInfo.pickup.geo,
          city: deliveryInfo.pickup.address,
        },
        pickupTime: "Now",
        recipients: [
          {
            order: 1,
            city: deliveryInfo.recipients.address,
            geo: deliveryInfo.recipients.geo,
          },
        ],
        vehicleType: currentShipping,
        menuId: "60e2b8e72c9e27256ef63ec7",
      };
      const response = await estimateCostService(data);
    };

    estCost();
  }, [deliveryInfo, currentShipping]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (shippingRef.current && !shippingRef.current.contains(event.target)) {
        setShowShipping(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shippingRef]);
  console.log("recipientList", recipientList);
  const renderPickup = () => {
    return (
      <div className={styles.locationContainer}>
        <h3 className={styles.h3Title}>Địa điểm lấy hàng</h3>
        {confirmPickup && (
          <div
            onClick={() => setConfirmPickup(false)}
            className={styles.locationConfirm}
          >
            <CalendarTodayOutlinedIcon style={{ width: 20, height: 20 }} />
            <div className={styles.locationConfirmContent}>
              <strong className="size-m">{pickupAddress}</strong>
              <br />
              <small>{pickupAlley}</small>
              <br />
              <small>Lấy hàng: {pickupPhone}</small>
            </div>
          </div>
        )}
        <form>
          <div style={{ display: confirmPickup ? "none" : "block" }}>
            <div className={styles.inputContainer}>
              <CalendarTodayOutlinedIcon style={{ width: 20, height: 20 }} />
              <input
                type="text"
                ref={pickRef}
                className={styles.input}
                placeholder="Nhập địa chỉ lấy hàng"
              />
            </div>
            <InputComponent
              required
              value={pickupAlley}
              onChange={(e) => handleChangePickup("alley", e)}
              icon={IconMapDetail}
              placeholder="Thêm địa chỉ ngõ, ngách, tầng...(nếu có)"
            />
            <InputComponent
              required
              value={pickupPhone}
              onChange={(e) => handleChangePickup("phone", e)}
              icon={IconTelephone}
              placeholder="Nhập số điện thoại người đưa hàng"
            />
            <div className={styles.btnContainer}>
              <div className={styles.btnFlex}>
                <ButtonComponent onClick={handleConfirmPickup}>
                  Xong
                </ButtonComponent>
              </div>
              <div className={styles.btnFlex}>
                <ButtonComponent
                  onClick={() => setConfirmPickup(true)}
                  primary={false}
                >
                  Hủy
                </ButtonComponent>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const renderRecipient = () => {
    return (
      <div className={styles.locationContainer}>
        <h3 className={styles.h3Title}>Điểm giao</h3>
        {recipientList.map((recipient, index) => (
          <RecipientItem
            key={index}
            recipient={recipient}
            onChangeStatus={(status) =>
              handleChangeStatus(recipient.id, status)
            }
          />
        ))}
        {recipientList.filter((re) => re.done).length ? (
          <ButtonComponent onClick={handleAddRecipient} background="#f8ac59">
            Thêm điểm giao
          </ButtonComponent>
        ) : null}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>ĐƠN HÀNG MỚI</h3>
      <div style={{ position: "relative" }}>
        <div
          onClick={() => setShowShipping(true)}
          className={styles.itemSelect}
        >
          <ItemContent shipping={currentShipping} />
          <div className={styles.iconContainer}>
            <div className={styles.itemBadge}>{shippingMethod.length}</div>
            <ArrowDropDownIcon />
          </div>
        </div>
        <div
          className={
            showShipping ? styles.shippingActive : styles.shippingDisable
          }
          ref={shippingRef}
        >
          {showShipping &&
            shippingMethod.map((shipping) => (
              <ShippingItem
                handleClick={() => handleSelectItem(shipping)}
                shipping={shipping}
                active={shipping?.vehicleType === currentShipping?.vehicleType}
                key={shipping?.vehicleType}
              />
            ))}
        </div>
      </div>

      <div className={styles.location}>
        {renderPickup()}
        {renderRecipient()}
        <div style={{ textAlign: "center" }}>
          <a
            className={styles.terms}
            href="https://heyu.vn/terms-app/"
            target="blank"
          >
            Điều khoản và chính sách đền bù
          </a>
        </div>
      </div>

      <div className={styles.shipFeeContainer}>
        <div className={styles.shipFee}>
          <div className={styles.shipFeeItem} style={{ marginRight: 30 }}>
            <strong>Tiền ship </strong>
            <br />
            <strong style={{ color: "#1c84c6" }}>0 đ </strong>
          </div>
          <div className={styles.shipFeeItem}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <strong>Tiền mặt </strong>
                <br />
                <span>Người nhận trả</span>
              </div>
              <Image src={IconCash} alt="" width={25} height={25} />
            </div>
          </div>
        </div>
        <div className={styles.btnNext}>
          <ButtonComponent onClick={handleSubmit}>Tiếp tục</ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default Order;
