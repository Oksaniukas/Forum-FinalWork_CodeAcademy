import { useState } from "react";
import cookie from "js-cookie";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import axios from "axios";

const PostQuestionForm = () => {
  const [questionText, setquestionText] = useState("");

  const router = useRouter();

  const jwt = cookie.get("forum_app_jwt");

  const addQuestion = async () => {
    try {
      const body = {
        questionText: questionText,
        userId: cookie.get("user_id"),
      };

      const headers = {
        authorization: jwt,
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/question`,
        body,
        {
          headers,
        }
      );

      if (response.status === 201) {
        router.push("/questions");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <input
        value={questionText}
        placeholder="Question Text"
        type="text"
        onChange={(e) => {
          setquestionText(e.target.value);
        }}
      />

      <Button
        isLoading={false}
        title="Post Question"
        onClick={() => {
          addQuestion();
        }}
      />
    </div>
  );
};

export default PostQuestionForm;
