import { useState, useEffect } from "react";
import Link from "next/link";

import axios from "axios";
import styles from "./styles.module.css";

type QuestionProps = {
  id: string;
  questionText: string;
  date: Date;
  userId: string;
};

const Question = ({ id, questionText, date, }: QuestionProps) => {
  const [answerCount, setAnswerCount] = useState<number>(0);
  const fetchAnswerCount = async () => {
    if (!id) return; // Ensure id is defined before making the request
    try {
      const response = await axios.get(
        `${process.env.SERVER_URL}/question/${id}/answers`
      );
      setAnswerCount(response.data.length);
    } catch (error) {
      console.error("Error fetching answers:",error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAnswerCount();
    }
  }, [id]); // Ensure the useEffect runs only when id is available
  return (
    <Link href={`/question/${id}`} className={styles.main}>
      <h4>{questionText}</h4>
      <p>{date.toLocaleDateString()}</p>
      <p className={styles.answerCount}>Answers : {answerCount}</p>
    </Link>
  );
};

export default Question;
