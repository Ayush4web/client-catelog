import React, { useEffect, useState } from 'react'
import styles from '../styles/request.module.css'
import axios from 'axios'

export default function Request() {
  const [value, onChange] = useState(0)

  const [data, setData] = useState({
    name: '',
    location: '',
    c_size: 0,
    p_size: 0,
    desc: '',
    dod: '',
    sector: ''
  })

  const [alert, setAlert] = useState({ show: 'false', type: '', text: '' });
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value  })
   
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, location, c_size, p_size, desc, dod, sector } = data;

    if (!name || !location || !c_size || !p_size || !desc || !dod || !sector) { 
         
      setAlert({ show: 'true', type: 'error', text: 'Please provide all details.' });
      return;
    }

    setAlert({ show: 'true', type: 'success', text: 'Please wait...' });

    try {
      const res = await axios.post('http://localhost:5000/api/v1/quotes',data);
      
      setAlert({ show: 'true', type: 'success', text: 'Request Sent Successfully.' }); 
      
    } catch (error) {
      if (error.response) {
        setAlert({ show: 'true', type: 'error', text: error.response.data.msg });
      }
      else {
        
        setAlert({ show: 'true', type: 'error', text: error.message });
      }
      return;
    }
  }


  useEffect(() => {
     
    const timer = setTimeout(() => {
        setAlert({})
    }, 3000) 
    
    return () => {
      clearTimeout(timer);
    }
  },[alert])
  return (
    <div className={styles.container}>
      <form action='' className={styles.form}>
        {alert.show && 
          <div style={{color: alert.type == 'error'? 'red':'green' }} className={styles.alert}>{ alert.text}</div>
        }
        <div className={styles.form_control}>
          <input
            type='text'
            name='name'
            value={data.name}
            onChange={(e) => handleChange(e)}
            placeholder='Client Name'
          />
          <input
            type='text'
            name='location'
            value={data.location}
            onChange={(e) => handleChange(e)}
            placeholder='Location'
          />
        </div>
        <div className={styles.form_control}>
          <textarea
            className={styles.textarea}
            name='desc'
            value={data.desc}
            onChange={(e) => handleChange(e)}
            placeholder='Client Discription'
          />
        </div>

        <div className={styles.form_control}>
          <div className={styles.slider_parent}>
            <div className={styles.label}>Company Size</div>
            <input
              type='range'
              min='0'
              max='500'
              name='c_size'
              value={data.c_size}
              onChange={(e) => {
                handleChange(e)
              }}
            />
            <div className={styles.buble}>{data.c_size + ' K'}</div>
          </div>
          <div className={styles.slider_parent}>
            <div className={styles.label}>Project Size</div>
            <input
              type='range'
              min='0'
              max='500'
              name='p_size'
              value={data.p_size}
              onChange={(e) => {
                handleChange(e)
              }}
            />
            <div className={styles.buble}>{data.p_size + ' $'}</div>
          </div>
        </div>
        <div className={styles.form_control}>
          <div>
            <div className={styles.label}>Date Of Delivery</div>
            <input
              type='date'
              name='dod'
              value={data.date}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input
            type='text'
            name='sector'
            value={data.sector}
            onChange={(e) => handleChange(e)}
            placeholder='Sector'
          />
        </div>
        <div className={`${styles.form_control} ${styles.jc}`}>
          <input type='button' value='Send Request' onClick={(e)=>handleSubmit(e)} className={styles.btn} />
        </div>
      </form>
    </div>
  )
}
