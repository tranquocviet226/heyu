import React from 'react'
import Order from '../src/components/order/Order'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Order />
    </div>
  )
}
