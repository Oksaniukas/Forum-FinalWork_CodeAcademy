import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import cookie from "js-cookie";

import logo from "../../assets/logo.png";
import styles from "./styles.module.css";
import Link from "next/link";
import Button from "../Button/Button";

type HeaderProps = {
  isUserLoggedIn: boolean;
};

const Header = ({ isUserLoggedIn }: HeaderProps) => {
  const router = useRouter();
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn);

  useEffect(() => {
    // Check if the JWT cookie exists to determine if the user is logged in
    const token = cookie.get(process.env.JWT_KEY as string);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    setButtonLoading(true);
    router.push("/login");
  };
  const signUp = () => {
    setButtonLoading(true);
    router.push("/signup");
  };

  const logOutUser = () => {
    // Remove JWT token and other relevant cookies
    cookie.remove(process.env.JWT_KEY as string);
    cookie.remove("user_id");
    setIsLoggedIn(false); // Update state to reflect the user is logged out
    router.push("/"); // Redirect to the home page
  };

  const askQuestion = () => {
    router.push("/postquestion");
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
          {!isLoggedIn && (
            <>
              <Button
                onClick={signUp}
                title="Sign Up"
                isLoading={isButtonLoading}
              />
              <Button
                onClick={login}
                title="Login"
                isLoading={isButtonLoading}
              />
            </>
          )}
          {isLoggedIn && (
            <>
              <Button
                onClick={logOutUser}
                title="Log Out"
                isLoading={isButtonLoading}
              />
            </>
          )}
        </div>
      </div>
      {isLoggedIn && (
        <div className={styles.navWrapper}>
          <div className={styles.nav}>
            <Link href={`/`} className={styles.navLink}>
              Home
            </Link>
            <Link href={`/questions`} className={styles.navLink}>
              All Questions
            </Link>
            <Link href={`/userquestions`} className={styles.navLink}>
              My Questions
            </Link>
          </div>
          <div className={styles.btn}>
            <Button
              onClick={askQuestion}
              title="Ask Question"
              isLoading={isButtonLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
