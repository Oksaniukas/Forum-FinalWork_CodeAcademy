import LoginForm from "@/components/LoginForm/LoginForm";
import styles from "./styles.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";


const LoginPage = () => {
  return (
    <div className={styles.main}>
     <PageTemplate>
     <h1 style={{textAlign: "center", marginTop: "4rem"}} >Login to INPP forum</h1>
     <LoginForm />
     </PageTemplate>
    </div>
  );
};

export default LoginPage;
