import { useState } from "react";
import cookie from "js-cookie";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { signup } from "@/apiCalls/newUser";
import axios, { AxiosError } from "axios";

const SignUpForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signUpUser = async () => {
    if (!name || !email || !password) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    // Validate password length and strength
    const passwordRegex = /^(?=.*[0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 6 characters long and contain at least one number."
      );
      return;
    }
    try {
      setButtonLoading(true);

      const response = await signup({ name, email, password });
      if (response.status === 200) {
        cookie.set(process.env.JWT_KEY as string, response.data.token);
        cookie.set("user_id", response.data.userId);
        router.push("/login");
      }
      console.log(response);

      setButtonLoading(false);
    } catch (err: unknown) {
      setButtonLoading(false);
      console.error("Error signing up:", err);

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>;
        // Backend error handling (e.g., "User with this email was registered")
        if (axiosError.response && axiosError.response.data) {
          setErrorMessage(axiosError.response.data.message);
        } else {
          setErrorMessage("An error occurred during registration. Please try again.");
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
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
      />{" "}
      <p>
        *Password must be at least 6 characters long and contain at least one
        number
      </p>
      {/* Show error message if validation or backend error occurs */}
      {errorMessage && <h5 className={styles.error}>{errorMessage}</h5>}
      <Button
        onClick={signUpUser}
        title="Sign Up"
        isLoading={isButtonLoading}
      />
    </div>
  );
};

export default SignUpForm;
