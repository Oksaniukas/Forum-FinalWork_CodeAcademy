import { useRouter } from "next/router";
import { useState } from "react";
import logo from "../../assets/logo.png";
import styles from "./styles.module.css";
import Link from "next/link";
import Button from "../Button/Button";

const Header = () => {
  const router = useRouter();
  const [isButtonLoading, setButtonLoading] = useState(false);

  const login = () => {
    setButtonLoading(true);
    router.push("/login");
  };
  const signUp = () => {
    setButtonLoading(true);
    router.push("/signup");
  };
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
          <Button
            onClick={signUp}
            title="Sign Up"
            isLoading={isButtonLoading}
          />
          <Button onClick={login} title="Login" isLoading={isButtonLoading} />
        </div>
      </div>

      <div className={styles.navWrapper}>
        <div className={styles.nav}>
          <Link href={`/`} className={styles.navLink}>
            Home
          </Link>
          <Link href={`/questions`} className={styles.navLink}>
            See All Questions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
