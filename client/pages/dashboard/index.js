import styles from '../../styles/Dashboard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import logo from './../../images/Gutenberg.png'
import ham from './../../images/hamburger.png'
import icon1 from '.././../images/add.png'
import icon2 from '.././../images/clipboard.png'
import { useEffect, useState } from 'react'
import Request from '../../components/Request'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useJwt } from 'react-jwt'

export default function Dashboard() {
  const [show, setShow] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
   const [user, setUser] = useState(null)
   
  
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies()

  const token = cookies.token
  const { decodedToken, isExpired } = useJwt(token)



  const removeToken = () => {
       removeCookie('token')
  }

  useEffect(() => {
    if (!token) {
      router.push('/auth/login')
    }
  }, [token])

  useEffect(() => {
    setUser(decodedToken);
  }, [decodedToken])
  return (
    <>
      <div className={styles.container}>
        <div className={styles.flex}>
          <div
            className={
              show ? `${styles.sidebar}` : `${styles.sidebar} ${styles.active}`
            }
          >
            <div className={styles.logo}>
              <Link href='/dashboard'>
                <Image src={logo}></Image>
              </Link>
            </div>
            <ul>
              <li>
                <Link href='/dashboard'>
                  <Image
                    className={styles.img}
                    width={30}
                    height={30}
                    src={icon1}
                  />
                  Request Quotes
                </Link>
              </li>
              <li>
                <Link href='/quotes'>
                  <Image width={30} height={30} src={icon2} />
                  Show Quotes
                </Link>
              </li>
            </ul>
          </div>

          <div
            className={
              show ? `${styles.main}` : `${styles.main} ${styles.strech}`
            }
          >
            <div className={styles.header}>
              <div className={` ${styles.logo} ${styles.ham}`}>
                <Image onClick={() => setShow(!show)} src={ham}></Image>
              </div>
              <h2 className={styles.heading}>Dashboard</h2>

              <div
                className={
                  showDropdown
                    ? `${styles.profile} ${styles.profile_active}`
                    : styles.profile
                }
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Image
                  width={40}
                  height={40}
                  src={
                    user && user.profileImg
                      ? user.profileImg
                      : 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg'
                  }
                ></Image>

                <span className={styles.profile_name}>
                  {user ? user.name : 'Unknown user'}
                </span>

                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                  <path d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z' />
                </svg>
                <div
                  className={
                    showDropdown
                      ? `${styles.profile_dropdown} ${styles.profile_dropdown_active}`
                      : styles.profile_dropdown
                  }
                >
                  <ul>
                    <li>
                      <Link href=''>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 512 512'
                        >
                          <path d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z' />
                        </svg>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link href='' onClick={removeToken}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 512 512'
                        >
                          <path d='M160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128V384c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32h64zM504.5 273.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32H320v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z' />
                        </svg>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <Request></Request>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
