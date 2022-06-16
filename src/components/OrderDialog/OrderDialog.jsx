import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Dialog from '@mui/material/Dialog';
import { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/OrderDialog.module.css';

const shippingMethod = [
  {
    id: 1,
    icon: 'https://media.heyu.asia/uploads/new-img-service/2021-07-14-nhanh.png',
    title: 'Nhanh',
    description: 'Giao & nhận trong 30 phút đến 1 giờ'
  },
  {
    id: 2,
    icon: 'https://media.heyu.asia/uploads/new-img-service/2021-07-03-tietkiem1.png',
    title: 'Tiết kiệm',
    description: 'Giao & nhận tối đa trong 2 giờ'
  },
  {
    id: 3,
    icon: 'https://media.heyu.asia/uploads/ordertype/2021-07-28-http.png',
    title: 'Hoả tốc (Đồ ăn)',
    description: 'Giao & nhận ngay trong 15 đến 45 phút'
  },
  {
    id: 4,
    icon: 'https://media.heyu.asia/uploads/new-img-service/2021-07-14-hoatoc.png',
    title: 'Hỏa tốc',
    description: 'Giao & nhận trong 15 đến 45 phút'
  },
]

const OrderDialog = (props) => {
  const { onClose, selectedValue, open } = props;
  const [showShipping, setShowShipping] = useState(false)
  const [confirmLocation, setConfirmLocation] = useState(false)
  const [currentShipping, setCurrentShipping] = useState(shippingMethod[0])
  const shippingRef = useRef(null)

  const handleShowShipping = () => {
    setShowShipping(true)
  }

  const handleSelectItem = (shipping) => {
    setCurrentShipping(shipping)
    setShowShipping(false)
  }
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleConfirmLocation = () => {
    setConfirmLocation(true)
  }

  const handleSetLocation = () => {
    setConfirmLocation(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (shippingRef.current && !shippingRef.current.contains(event.target)) {
        setShowShipping(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shippingRef]);

  const Input = ({ icon, placeholder }) => {
    return (
      <div className={styles.inputContainer}>
        <img src={icon} style={{ width: 20, height: 20 }} />
        <input className={styles.input} placeholder={placeholder} />
      </div>
    )
  }

  const Button = ({ children, type = 'primary', onClick }) => {
    return (
      <button onClick={onClick} className={styles[`button-${type}`]}>
        {children}
      </button>
    )
  }

  const ShippingItem = ({ shipping, handleClick, active }) => {
    return (
      <div onClick={handleClick} className={styles.item}>
        <ItemContent shipping={shipping} />
        {active && <DoneOutlinedIcon />}
      </div>
    )
  }

  const ItemContent = ({ shipping }) => {
    return (
      <div className={styles.shippingContainer}>
        <img src={shipping.icon} alt='' className={styles.icon} />
        <div className={styles.itemContainer}>
          <div className={styles.itemContent}>
            <strong>{shipping.title}</strong>
            <p className={styles.itemDescription}>{shipping.description}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={styles.container}>
        <h3 className={styles.title}>ĐƠN HÀNG MỚI</h3>
        <div style={{ position: 'relative' }}>
          <div onClick={handleShowShipping} className={styles.itemSelect}>
            <ItemContent shipping={currentShipping} />
            <div className={styles.iconContainer}>
              <div className={styles.itemBadge}>{shippingMethod.length}</div>
              <ArrowDropDownIcon />
            </div>
          </div>
          <div className={showShipping ? styles.shippingActive : styles.shippingDisable} ref={shippingRef}>
            {showShipping && shippingMethod.map(shipping => <ShippingItem
              handleClick={() => handleSelectItem(shipping)}
              shipping={shipping}
              active={shipping.id === currentShipping.id}
              key={shipping.id} />)}
          </div>
        </div>

        <div className={styles.location}>
          <div className={styles.locationContainer}>
            <h3 className={styles.h3Title}>Địa điểm lấy hàng</h3>
            {confirmLocation ? <div onClick={handleSetLocation} className={styles.locationConfirm}>
              <CalendarTodayOutlinedIcon style={{ width: 20, height: 20 }} />
              <div className={styles.locationConfirmContent}>
                <strong className="size-m">94 Trần Mai Ninh, Phường 12, Tân Bình, Thành phố Hồ Chí Minh</strong>
                <br />
                <small>Lấy hàng: 0346718110</small>
              </div>
            </div> : <>
              <div className={styles.inputContainer}>
                <CalendarTodayOutlinedIcon style={{ width: 20, height: 20 }} />
                <input className={styles.input} placeholder='Nhập địa chỉ lấy hàng' />
              </div>
              <Input icon='https://book.heyu.vn/images/icons/map-detail.png' placeholder='Thêm địa chỉ ngõ, ngách, tầng...(nếu có)' />
              <Input icon='https://book.heyu.vn/images/icons/telephone.png' placeholder='Nhập số điện thoại người đưa hàng' />
              <div className={styles.btnContainer}>
                <div className={styles.btnFlex}><Button onClick={handleConfirmLocation}>Xong</Button></div>
                <div className={styles.btnFlex}> <Button onClick={handleConfirmLocation} type='outline'>Hủy</Button></div>
              </div>
            </>}
          </div>

          <div className={styles.locationContainer}>
            <h3 className={styles.h3Title}>Điểm giao</h3>
            <div className={styles.inputContainer}>
              <LocationOnOutlinedIcon style={{ width: 20, height: 20 }} />
              <input className={styles.input} placeholder='Bạn muốn giao hàng đến đâu?' />
            </div>
            <Input icon='https://book.heyu.vn/images/icons/map-detail.png' placeholder='Thêm địa chỉ ngõ, ngách, tầng...(nếu có)' />
            <div style={{ display: 'flex', marginTop: -15, marginBottom: -15 }}>
              <div style={{ marginRight: 30, }}>
                <Input icon='https://book.heyu.vn/images/icons/id-card.png' placeholder='Tên người nhận' />
              </div>
              <Input icon='https://book.heyu.vn/images/icons/telephone.png' placeholder='SĐT người nhận' />
            </div>
            <Input icon='https://book.heyu.vn/images/icons/bank.png' placeholder='Tiền ứng' />
            <div className={styles.btnContainer}>
              <div className={styles.btnFlex}><Button>Xong</Button></div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <a className={styles.terms} href='https://heyu.vn/terms-app/' target="blank">Điều khoản và chính sách đền bù</a>
          </div>
        </div>

        <div style={{ width: '100%', textAlign: 'center', position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: "#FFF" }}>
          <div className={styles.shipFee}>
            <div className={styles.shipFeeItem} style={{ marginRight: 30 }}>
              <strong>Tiền ship </strong>
              <br />
              <strong style={{ color: '#1c84c6' }}>0 đ </strong>
            </div>
            <div className={styles.shipFeeItem}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <strong>Tiền mặt </strong>
                  <br />
                  <span>Người nhận trả</span>
                </div>
                <img src='https://media.heyu.asia/uploads/payment/2021-08-17-cash.png' alt='' width={25} height={25} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </Dialog>
  )
}

export default OrderDialog