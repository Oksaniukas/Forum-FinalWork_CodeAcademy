import logo from "../../assets/logo.png";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.main}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            <img src={logo.src} alt="logo" />
          </div>
          <h3>Ignalina nuclear power plant</h3>
        </div>

        <div className={styles.btnWrapper}>
          <button className={styles.btn}>Sign Up</button>
          <button className={styles.btn}>Login</button>
        </div>
      </div>

      <div className={styles.navWrapper}>
        <div className={styles.nav}>
          <h4>Home</h4>
          <h4>See All Questions</h4>
        </div>
      </div>
    </div>
  );
};

export default Header;
