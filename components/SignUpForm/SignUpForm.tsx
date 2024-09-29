import { useState } from "react";
// import axios from "axios";
import cookie from "js-cookie";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { signup } from "@/apiCalls/newuser";

const SignUpForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [isShowError, setShowError] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);

  const signUpUser = async () => {
    try {
      setButtonLoading(true);

      // const body = {
      //   email: email,
      //   password: password,
      // };

      const response = await signup({ name, email, password });
      if (response.status === 200) {
        cookie.set(process.env.JWT_KEY as string, response.data.token);
        cookie.set("user_id", response.data.userId);
        // router.push("/");
      }
         console.log(response);

      setButtonLoading(false);
    } catch (err) {
      console.log("err", err);
      // setShowError(true);
      setButtonLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        placeholder="name"
        type="text"
      />
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        placeholder="email"
        type="text"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        placeholder="password"
        type="password"
      />

      {/* {isShowError && <h5 className={styles.error}>Bad email or password</h5>} */}

      <Button onClick={signUpUser} title="Sign Up" isLoading={isButtonLoading} />
    </div>
  );
};

export default SignUpForm;
