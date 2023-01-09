import Image from 'next/image'
import Link from 'next/link'
import style from './../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <div className={style.img_container}>
          <Image
            src={'https://publictrainingcenters.com/img/login-img.png'}
            width='550'
            height='550'
          ></Image>
        </div>
        <div className={style.welcome}>
          <h1>Welcome to Gutenberg LLC.</h1>
          <h2>Worlds Best PR & Digital Marketing Agency! </h2>
          <Link href='/auth/login'>
            <button className={style.login_btn}>Login/SignUp</button>
          </Link>
        </div>
      </div>
    </>
  )
}
