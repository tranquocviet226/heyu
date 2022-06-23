import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import styles from "../../../styles/Order.module.css";
import { estimateCostService, getDeliveryCartType } from "../../services/order";
import IconBank from "./assets/icon_bank.png";
import IconCash from "./assets/icon_cash.png";
import IconHoaToc from "./assets/icon_hoa_toc.png";
import IconIdCard from "./assets/icon_id_card.png";
import IconMapDetail from "./assets/icon_map_detail.png";
import IconTelephone from "./assets/icon_telephone.png";
import RecipientItem from "./components/RecipientItem";

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

const initRecipient = {
  id: "",
  address: "",
  alley: "",
  name: "",
  phone: "",
  count: "",
  geo: [],
};

const Order = () => {
  const [showShipping, setShowShipping] = useState(false);
  const [confirmPickup, setConfirmPickup] = useState(false);
  const [confirmRecipient, setConfirmRecipient] = useState(false);
  const [shippingMethod, setShippingMethod] = useState([]);
  const [currentShipping, setCurrentShipping] = useState();
  const [deliveryInfo, setDeliveryInfo] = useState(deliveryInfoDefault);
  const [recipientList, setRecipientList] = useState([]);

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

  const handleChangeRecipient = (field, e) => {
    e.preventDefault();
    setDeliveryInfo({
      ...deliveryInfo,
      recipients: { ...deliveryInfo.recipients, [field]: e.target.value },
    });
  };

  const handleAddRecipient = () => {
    setConfirmRecipient(false);
  };

  const handleConfirmRecipient = () => {
    setConfirmRecipient(true);
    setRecipientList([...recipientList, initRecipient]);
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
        <div style={{ display: confirmPickup ? "none" : "block" }}>
          <div className={styles.inputContainer}>
            <CalendarTodayOutlinedIcon style={{ width: 20, height: 20 }} />
            <input
              ref={pickRef}
              className={styles.input}
              placeholder="Nhập địa chỉ lấy hàng"
            />
          </div>
          <Input
            value={pickupAlley}
            onChange={(e) => handleChangePickup("alley", e)}
            icon={IconMapDetail}
            placeholder="Thêm địa chỉ ngõ, ngách, tầng...(nếu có)"
          />
          <Input
            value={pickupPhone}
            onChange={(e) => handleChangePickup("phone", e)}
            icon={IconTelephone}
            placeholder="Nhập số điện thoại người đưa hàng"
          />
          <div className={styles.btnContainer}>
            <div className={styles.btnFlex}>
              <Button onClick={() => setConfirmPickup(true)}>Xong</Button>
            </div>
            <div className={styles.btnFlex}>
              <Button onClick={() => setConfirmPickup(true)} type="outline">
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRecipient = () => {
    return (
      <div className={styles.locationContainer}>
        <h3 className={styles.h3Title}>Điểm giao</h3>
        {recipientList.length ? (
          recipientList.map((recipient, index) => <RecipientItem key={index} />)
        ) : (
          <div style={{ display: "block" }}>
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
                <Button onClick={() => handleConfirmRecipient(false)}>Xong</Button>
              </div>
            </div>
          </div>
        )}
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
          <Button onClick={handleSubmit}>Tiếp tục</Button>
        </div>
      </div>
    </div>
  );
};

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

const ShippingItem = ({ shipping, handleClick, active }) => {
  return (
    <div onClick={handleClick} className={styles.item}>
      <ItemContent shipping={shipping} />
      {active && <DoneOutlinedIcon />}
    </div>
  );
};

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

export default Order;
