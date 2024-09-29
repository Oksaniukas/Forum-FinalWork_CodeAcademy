import logo from "../../assets/logo.png";
import styles from "./styles.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.main}>
        <Link href={`/`} className={styles.logoWrapper}>
          <div className={styles.logo}>
            <img src={logo.src} alt="logo" />
          </div>
          <h3>Ignalina nuclear power plant</h3>
        </Link>

        <div className={styles.btnWrapper}>
          <button className={styles.btn}>Sign Up</button>
          <button className={styles.btn}>Login</button>
        </div>
      </div>

      <div className={styles.navWrapper}>
        <div className={styles.nav}>
          <Link href={`/`} className={styles.navLink}>Home</Link>
          <Link href={`/questions`} className={styles.navLink} >See All Questions</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
