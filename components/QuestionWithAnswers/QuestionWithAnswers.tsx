import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { AnswerType } from "@/types/answers";
import { QuestType } from "@/types/questions";

import axios from "axios";
import styles from "./styles.module.css";
import Button from "../Button/Button";

type QuestionWithAnswersProps = {
  id: string;
  questionId: string;
  questionText: string;
  answers: AnswerType[];
  date: Date;
  userId: string;
};

const QuestionWithAnswers = ({
  id,
  questionText,
  date,
  answers,
  userId,
}: QuestionWithAnswersProps) => {
  const router = useRouter();
  const jwt = cookie.get("forum_app_jwt");

  const [answerCount, setAnswerCount] = useState<number>(0);
  const [newAnswer, setNewAnswer] = useState(""); // state to store the new answer
  const [answerList, setAnswerList] = useState(answers); // state to store answers
  const [isQuestionOwner, setIsQuestionOwner] = useState(false);


    useEffect(() => {
    const fetchUserQuestions = async () => {
      try {
        const headers = {
          authorization: jwt, // Use the JWT for authentication
        };

        // Fetch the questions posted by the logged-in user
        const response = await axios.get(
          `${process.env.SERVER_URL}/questions/user`,
          { headers }
        );

        // Check if the current question ID matches any of the user's questions
        const userQuestions = response.data.questions;
        const isOwner = userQuestions.some((question: QuestType) => question.id === id);

        setIsQuestionOwner(isOwner); // Set the state if the user is the owner of this question
      } catch (error) {
        console.error("Error fetching user's questions:", error);
      }
    };

    fetchUserQuestions();
  }, [id, jwt]);



  useEffect(() => {
    if (answers) {
      setAnswerCount(answers.length);
    }
  }, [answers]);

  const deleteQuestion = async () => {
    try {
      const headers = {
        authorization: jwt,
      };

      const response = await axios.delete(
        `${process.env.SERVER_URL}/question/${router.query.id}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        router.push("/questions");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addAnswer = async () => {
    if (!newAnswer.trim()) {
      console.error("Answer cannot be empty");
      return; // Ensure the answer is not empty
    }

    try {
      const headers = {
        authorization: jwt,
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/question/${id}/answers`,
        { answerText: newAnswer }, // the new answer to send
        { headers }
      );

      const createdAnswer = response.data;
      // Update the UI by adding the new answer to the list
      setAnswerList((prevAnswers) => [...prevAnswers, createdAnswer]);
      setAnswerCount((prevCount) => prevCount + 1);
      setNewAnswer(""); // reset the input field after submission
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.questWrapper}>
        <div className={styles.questInfo}>
          <h4>{questionText}</h4>
          <p>{date.toLocaleDateString()}</p>
          <p className={styles.answerCount}>Answers : {answerCount}</p>
        </div>
        <div className={styles.btnWrapper}>
        {isQuestionOwner && (
            <Button
              onClick={deleteQuestion}
              isLoading={false}
              title="Delete Question"
            />
          )}
        </div>
      </div>
      <div className={styles.answerWrapper}>
        <div className={styles.answer}>
          <h4>ANSWERS:</h4>
          {/* New answer input */}
        <div className={styles.addAnswer}>
          <textarea
            placeholder="Write your answer here"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)} // update the state with input
            className={styles.answerInput}
          />
          <Button onClick={addAnswer} isLoading={false} title="Add Answer" />
        </div>
        </div>
        <div className={styles.answerInfo}>
        {answers.length > 0 ? ( // Check if there are answers to display
          answers.map((answer) => (
            <div className={styles.answerDescr} key={answer.id}>
              <h4>{answer.answerText}</h4>
              <p>{new Date(answer.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No answers available.</p> // Display a message if there are no answers
        )}
        </div>
        
      </div>
    </div>
  );
};

export default QuestionWithAnswers;
