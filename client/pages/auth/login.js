import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../images/Gutenberg.png'
import styles from '../../styles/Login.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [alert, setAlert] = useState({ show: false, type: '', text: '' })
  const [user, setUser] = useState({ email: '', password: '' })
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const { email, password } = user
     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email || !password) {
      setAlert({
        show: true,
        type: 'error',
        text: 'Please enter your details.',
      })
      return
    }

    if (!emailRegex.test(email)) {
      setAlert({
        show: true,
        type: 'error',
        text: 'Please enter a valid email address.',
      })
      return
    }
      setAlert({ show: true, type: 'success', text: 'Please Wait....' })

    try {
      const res = await axios.post('http://localhost:5000/api/v1/login', {
        email,
        password,
      })

      setCookie('token', res.data.token)
      setAlert({
        show: true,
        type: 'success',
        text: 'Redirecting... Please wait.',
      })

      router.push('/dashboard')
    } catch (error) {
      if (error.response) {
        setAlert({ show: true, type: 'error', text: error.response.data.msg })
      } else {
        setAlert({ show: true, type: 'error', text: error.message })
      }
      return
    }
  }
  const handleSocialLogin = () => {
    window.open('http://localhost:5000/auth/google', '_parent')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({})
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [alert])
  return (
    <div className={`${styles.auth} ${styles.login_page}`}>
      <div className={styles.auth_container}>
        <div className={styles.image_container}>
          <Image src={logo}></Image>
        </div>
        <div className={styles.login_container}>
          <div className={styles.login_content}>
            <div className={styles.header}>Welcome back!</div>

            {alert.show && (
              <div
                style={{ color: alert.type == 'error' ? 'red' : 'green' }}
                className={styles.header_text}
              >
                {alert.text}
              </div>
            )}
            <form className={styles.form_container}>
              <label className={styles.labels} htmlFor='email'>
                Email address
              </label>
              <br />
              <input
                required
                className={`${styles.email} ${styles.input}`}
                name='email'
                type='email'
                value={user.email}
                onChange={(e) => handleChange(e)}
              />
              <br />
              <label className={styles.labels} htmlFor='password'>
                Password
              </label>
              <br />
              <div className={styles.password_container}>
                <input
                  required
                  className={`${styles.password} ${styles.input}`}
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                />
                {!showPassword ? (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={`${styles.show} bi bi-eye-slash`}
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={`${styles.show} bi bi-eye`}
                  ></i>
                )}
              </div>

              <input
                className={styles.login_btn}
                type='submit'
                value='Login'
                onClick={(e) => handleLogin(e)}
              />
            </form>
            <div className={styles.or}>OR</div>
            <button className={styles.login_google} onClick={handleSocialLogin}>
              <Image
                className={styles.google_logo}
                width={15}
                height={15}
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png'
                alt='google'
              />
              LOGIN WITH GOOGLE
            </button>

            <p className={styles.signup_text}>
              Don&apos;t have an account?{' '}
              <span className={styles.signup_btn}>
                <Link href='/auth/signup'>Sign Up!</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
