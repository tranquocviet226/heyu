import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import styles from '../../../styles/OrderDialog.module.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const shippings = [
  { id: 1, value: 'Nhanh' },
  { id: 2, value: 'Tiết kiệm' },
  { id: 3, value: 'Hỏa tốc (Đồ ăn)' },
  { id: 4, value: 'Hỏa tốc' },
]

const OrderDialog = (props) => {
  const { onClose, selectedValue, open } = props;
  const [shippingMethod, setShoppingMethod] = useState(1)

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleChange = (event) => {
    setShoppingMethod(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={styles.container}>
        <h3 className={styles.title}>ĐƠN HÀNG MỚI</h3>
        <div className={styles.shippingContainer}>
          <img src='https://media.heyu.asia/uploads/new-img-service/2021-07-14-nhanh.png' alt='' width={32} height={32} style={{ margin: '0 10px' }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <strong>Nhanh</strong>
              <p style={{ margin: 0, fontSize: 12 }}>Giao & nhận trong 30 phút đến 1 giờ</p>
            </div>
            <div style={{ display: 'flex', color: "#FFF", justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderRadius: 10, textAlign: 'center', backgroundColor: '#ed5565' }}>
              4
            </div>
            <ArrowDropDownIcon />
          </div>
        </div>
      </div>

    </Dialog>
  )
}

export default OrderDialog