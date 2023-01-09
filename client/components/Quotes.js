import React, { useEffect, useState } from 'react'
import styles from '../styles/quotes.module.css'
import Card from './Card'
import axios from 'axios'

export default function Quotes() {

  const [data, setData] = useState(null)

  const fecthData = async () => {
    const { data: res } = await axios('http://localhost:5000/api/v1/quotes')
    setData(res)
  }

  useEffect(() => {
    fecthData()
  }, [])
  return (
    <>
      <div className={styles.container}>
        {data &&
          data.map((d) => {
            return <Card props={d}></Card>
          })}
      </div>
    </>
  )
}
