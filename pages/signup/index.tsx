import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import SignUpForm from "@/components/SignUpForm/SignUpForm"
import styles from "./styles.module.css";


const SignupPage = () => {
  return (
    <div className={styles.main}>
     <Header isUserLoggedIn={false} />
     <h1 style={{textAlign: "center", marginTop: "4rem"}} >Sign Up to INPP forum</h1>
     <SignUpForm />
     <Footer />
    </div>
  );
};

export default SignupPage;
