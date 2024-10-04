import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

type QuestionProps = {
  id: string;
  questionText: string;
  date: Date;
  userId: string;
};

const Question = ({ id, questionText, date }: QuestionProps) => {
  const [answerCount, setAnswerCount] = useState<number>(0);
  const fetchAnswerCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.SERVER_URL}/question/${id}/answers`
      ); // Assuming this endpoint returns the answers
      setAnswerCount(response.data.length); // Update the state with the number of answers
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  // useEffect to fetch answers when component mounts
  useEffect(() => {
    fetchAnswerCount();
  }, [id]); // Fetch answers whenever questionId changes

  return (
    <div className={styles.main}>
      <h4>{questionText}</h4>
      <p>{date.toLocaleDateString()}</p>
      <p className={styles.answerCount}>Answers (count): {answerCount}</p>
    </div>
  );
};

export default Question;
