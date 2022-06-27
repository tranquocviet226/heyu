import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import styles from "../../../styles/Order.module.css";
import { estimateCostService, getDeliveryCartType } from "../../services/order";
import IconChangeCount from "./assets/change_count.jpg";
import IconBack from "./assets/ic_back.png";
import IconTip from "./assets/ic_tip.png";
import IconNote from "./assets/ic_note.png";
import IconWeight from "./assets/ic_weight.png";
import IconVoucher from "./assets/ic_voucher.png";
import IconMap from "./assets/ic_map.png";
import IconBank from "./assets/icon_bank.png";
import IconCash from "./assets/icon_cash.png";
import IconMapDetail from "./assets/icon_map_detail.png";
import IconTelephone from "./assets/icon_telephone.png";
import ButtonComponent from "./components/Button";
import InputComponent from "./components/Input";
import ItemContent from "./components/ItemContent";
import RecipientItem from "./components/RecipientItem";
import ShippingItem from "./components/ShippingItem";
import ModalComponent from "./components/Modal";

const GOOGLE_MAPS_API = "AIzaSyCYV4Or3XIHIGjQesLmKCvoFLK-w8gp-rE";
const mapOptions = {};

const initPickup = {
  pickup: {
    address: "",
    alley: "",
    phone: "",
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
  const [shippingMethod, setShippingMethod] = useState([]);
  const [currentShipping, setCurrentShipping] = useState();
  const [pickup, setPickup] = useState(initPickup);
  const [recipientList, setRecipientList] = useState([initRecipient]);
  const [next, setNext] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const pickupAddress = pickup.pickup.address;
  const pickupAlley = pickup.pickup.alley;
  const pickupPhone = pickup.pickup.phone;
  const shippingRef = useRef();

  const pickRef = usePlacesWidget({
    apiKey: GOOGLE_MAPS_API,
    onPlaceSelected: (place) => {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const formatted_address = place.formatted_address;

      setPickup((info) => ({
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

  const handleSelectItem = (shipping) => {
    setCurrentShipping(shipping);
    setShowShipping(false);
  };

  const handleChangePickup = (field, e) => {
    e.preventDefault();
    setPickup({
      ...pickup,
      pickup: { ...pickup.pickup, [field]: e.target.value },
    });
  };

  const handleConfirmPickup = () => {
    if (pickupAddress.trim() !== "") {
      setConfirmPickup(true);
    }
  };

  const handleCancelPickup = () => {
    pickRef.current.value = ''
    setPickup(initPickup)
  }

  const handleAddRecipient = () => {
    const recipient = { ...initRecipient };
    recipient.id = Date.now();
    recipient;
    setRecipientList([...recipientList, recipient]);
  };

  const handleSubmitRecipient = (data, id, status) => {
    const updateRecipientData = [...recipientList];
    const itemIdx = updateRecipientData.findIndex((item) => item.id === id);
    updateRecipientData[itemIdx].done = status;
    updateRecipientData[itemIdx].address = data.address
    updateRecipientData[itemIdx].alley = data.alley
    updateRecipientData[itemIdx].name = data.name
    updateRecipientData[itemIdx].phone = data.phone
    updateRecipientData[itemIdx].count = data.count
    updateRecipientData[itemIdx].geo = data.geo
    setRecipientList(updateRecipientData);
  };

  const handleCancelRecipient = (id) => {
    const updateRecipientData = [...recipientList];
    const data = updateRecipientData.filter((item) => item.id !== id);
    setRecipientList(data);
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleSubmit = () => {
    setNext(true)
    // const submitDelivery = async () => {
    //   // await submitDeliveryService();
    // };
    // submitDelivery();
  };

  useEffect(() => {
    if (!recipientList.length) {
      setRecipientList([initRecipient])
    }
  }, [recipientList])

  useEffect(() => {
    const getDelivery = async () => {
      const response = await getDeliveryCartType(pickup?.pickup.geo);
      setShippingMethod(response);
      setCurrentShipping(response.length ? response[0] : []);
    };
    getDelivery();
  }, [pickup]);

  useEffect(() => {
    const estCost = async () => {
      const recipients = recipientList.map((item, index) => ({
        order: index,
        city: item.address,
        geo: item.geo
      }))

      const data = {
        pickup: {
          geo: pickup.pickup.geo,
          city: pickup.pickup.address,
        },
        pickupTime: "Now",
        recipients: recipients,
        vehicleType: currentShipping,
        menuId: "60e2b8e72c9e27256ef63ec7",
      };
      const response = await estimateCostService(data);
      console.log('est cost', response)
    };

    estCost();
  }, [pickup, recipientList, currentShipping]);

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
              type="text"
              ref={pickRef}
              className={styles.input}
              placeholder="Nhập địa chỉ lấy hàng"
            />
          </div>
          <InputComponent
            value={pickupAlley}
            onChange={(e) => handleChangePickup("alley", e)}
            icon={IconMapDetail}
            placeholder="Thêm địa chỉ ngõ, ngách, tầng...(nếu có)"
          />
          <InputComponent
            value={pickupPhone}
            type="number"
            onChange={(e) => handleChangePickup("phone", e)}
            icon={IconTelephone}
            placeholder="Nhập số điện thoại người đưa hàng"
          />
          <div className={styles.btnContainer}>
            <div className={styles.btnFlex}>
              <ButtonComponent
                disabled={pickRef?.current?.value ? false : true}
                onClick={handleConfirmPickup}>
                Xong
              </ButtonComponent>
            </div>
            <div className={styles.btnFlex}>
              <ButtonComponent
                onClick={() => handleCancelPickup()}
                primary={false}
              >
                Hủy
              </ButtonComponent>
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
        {recipientList.map((recipient, index) => (
          <RecipientItem
            key={index}
            recipient={recipient}
            onSubmitRecipient={(data, status) =>
              handleSubmitRecipient(data, recipient.id, status)
            }
            onCancelRecipient={() => handleCancelRecipient(recipient.id)}
          />
        ))}
        {recipientList.filter((re) => re.done).length ? (
          <div style={{ marginTop: 15 }}>
            <ButtonComponent onClick={handleAddRecipient} background="#f8ac59">
              Thêm điểm giao
            </ButtonComponent>
          </div>
        ) : null}
      </div>
    );
  };

  const renderOptions = () => {
    return (
      <div className={styles.locationContainer}>
        <h3 className={styles.h3Title}>Tuỳ chọn đơn hàng</h3>
        <div>
          <InputComponent
            onChange={(e) => handleChangePickup("alley", e)}
            icon={IconNote}
            placeholder="Ghi chú"
          />
          <InputComponent
            onChange={(e) => handleChangePickup("alley", e)}
            icon={IconWeight}
            placeholder="Khối lượng"
          />
          <div onClick={handleShowModal} className={styles.btnCardContainer}>
            <Image src={IconChangeCount} width={22} height={22} />
            <div style={{ marginLeft: 8, width: '100%' }}>
              <h5 style={{ margin: 0 }}>Thay đổi tiền ứng</h5>
              <p style={{ margin: 0, color: 'rgb(4, 115, 205)', fontWeight: 700, fontSize: 12 }}>166,000 đ</p>
            </div>
            <button className={styles.btnEdit}>
              Sửa
            </button>
          </div>
          <div className={styles.btnCardContainer}>
            <Image src={IconBack} width={22} height={22} />
            <div style={{ marginLeft: 8, width: '100%' }}>
              <h5 style={{ margin: 0 }}>Quay lại điểm lấy hàng</h5>
              <p style={{ margin: 0, color: 'red', fontWeight: 700, fontSize: 12 }}>+19,000 đ</p>
            </div>
            <input type='checkbox' style={{ width: 24, height: 24 }} />
          </div>
          <div className={styles.btnCardContainer}>
            <Image src={IconVoucher} width={22} height={22} />
            <div style={{ marginLeft: 8, width: '100%' }}>
              <h5 style={{ margin: 0 }}>Thêm ưu đãi</h5>
            </div>
          </div>
          <div className={styles.btnCardContainer}>
            <Image src={IconTip} width={22} height={22} />
            <div style={{ marginLeft: 8, width: '100%' }}>
              <h5 style={{ margin: 0 }}>Típ tài xế</h5>
              <p style={{ margin: 0, color: 'red', fontWeight: 700, fontSize: 12 }}>0 đ</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
        <div style={{ display: next ? 'block' : 'none' }}>{renderOptions()}</div>
        <div style={{ display: next ? 'none' : 'block' }}>
          {renderPickup()}
          {renderRecipient()}
        </div>
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
        {next && <div style={{ width: 125, marginTop: 10, marginLeft: 10 }}>
          <ButtonComponent primary={false} onClick={() => setNext(false)}>Quay lại</ButtonComponent>
        </div>}
        <div className={styles.btnNext}>
          <ButtonComponent
            disabled={pickRef?.current?.value && recipientList.find(item => item.done) ? false : true}
            onClick={handleSubmit}>Tiếp tục</ButtonComponent>
        </div>
      </div>
      <ModalComponent open={showModal} onClose={() => setShowModal(false)}>
        <h3 style={{ margin: 0 }}>Thay đổi tiền ứng</h3>
        <hr></hr>
        {recipientList.map(item => <div key={item.id}>
          <Image src={IconMap} width={20} height={20} />
          <span style={{ fontSize: 18, fontWeight: 'bold' }}>{item.address}</span>
          <div style={{ marginBottom: 8, marginTop: -4}}>
            <InputComponent
              defaultValue={item.count}
              icon={IconBank}
              placeholder="Tiền ứng"
            />
          </div>
        </div>)}
      </ModalComponent>
    </div >
  );
};

export default Order;
