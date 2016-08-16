import React, { PropTypes } from 'react'
import styles from './Button.css' // eslint-disable-line

export default function Button ({onClick, label, children}) {
  const text = label || children
  return (
    <button className={styles.btn + ' ' + styles.dark} onClick={onClick}>
      <span className={styles.background}></span>
      {text}
    </button>
  )
}