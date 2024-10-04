import PageTemplate from "@/components/PageTemplate/PageTemplate";
import SignUpForm from "@/components/SignUpForm/SignUpForm";
import styles from "./styles.module.css";

const SignupPage = () => {
  return (
    <div className={styles.main}>
      <PageTemplate>
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
          Sign Up to INPP forum
        </h1>
        <SignUpForm />
      </PageTemplate>
    </div>
  );
};

export default SignupPage;
