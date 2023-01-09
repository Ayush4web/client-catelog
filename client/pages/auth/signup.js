import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/Signup.module.css";
import logo from '../../images/Gutenberg.png'
import Image from "next/image";
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', text: '' })
  const [user, setUser] = useState({ username: '', email: '', password: '' })
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies()
  
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const { email, password, username } = user
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!email || !password || !username) {
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
      const res = await axios.post('http://localhost:5000/api/v1/signup', {
        email,
        password,
        name:username,
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
    <div className={`${styles.auth} ${styles.signup_page}`}>
      <div className={styles.auth_container}>
        <div className={styles.image_container}>
          <Image src={logo}></Image>
        </div>
        <div className={styles.signup_container}>
          <div className={styles.signup_content}>
            <div className={styles.header}>Create your account</div>

            {alert.show && (
              <div
                style={{ color: alert.type == 'error' ? 'red' : 'green' }}
                className={styles.header_text}
              >
                {alert.text}
              </div>
            )}
            <form className={styles.form_container}>
              <label className={styles.labels} htmlFor='username'>
                Username
              </label>
              <br />
              <input
                maxLength={20}
                required
                className={`${styles.username} ${styles.input}`}
                name='username'
                value={user.username}
                onChange={(e) => handleChange(e)}
                type='text'
              />
              <p className={styles.username_rule}>
                Max. 20 characters are allowed!
              </p>

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
                className={styles.signup_btn}
                type='submit'
                value='signup'
                onClick={(e) => handleLogin(e)}
              />
            </form>
            <div className={styles.or}>OR</div>
            <button
              className={styles.signup_google}
              onClick={handleSocialLogin}
            >
              <Image
                className={styles.google_logo}
                width={15}
                height={15}
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png'
                alt='google'
              />
              CONTINUE WITH GOOGLE
            </button>

            <p className={styles.login_text}>
              Already have an account?{' '}
              <span className={styles.login_btn}>
                <Link href='/auth/login'>Log In!</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Signup;
