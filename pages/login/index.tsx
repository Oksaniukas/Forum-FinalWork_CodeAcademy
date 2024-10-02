import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import LoginForm from "@/components/LoginForm/LoginForm";
import styles from "./styles.module.css";


const LoginPage = () => {
  return (
    <div className={styles.main}>
     <Header isUserLoggedIn={false} />
     <h1 style={{textAlign: "center", marginTop: "4rem"}} >Login to INPP forum</h1>
     <LoginForm />
     <Footer />
    </div>
  );
};

export default LoginPage;
