import React from 'react'
import OrderDialog from '../src/components/OrderDialog/OrderDialog'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleOpen}>Đặt giao hàng ngay</button>
      <OrderDialog
        open={open}
        onClose={handleClose} />
    </div>
  )
}
