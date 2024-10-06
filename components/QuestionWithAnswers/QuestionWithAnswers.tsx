import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { AnswerType } from "@/types/answers";
import { QuestType } from "@/types/questions";

import axios from "axios";
import styles from "./styles.module.css";
import Button from "../Button/Button";

import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";

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
}: // answers,
// userId,
QuestionWithAnswersProps) => {
  const router = useRouter();
  const jwt = cookie.get("forum_app_jwt");

  const [answerCount, setAnswerCount] = useState<number>(0);
  const [newAnswer, setNewAnswer] = useState(""); // state to store the new answer
  const [answerList, setAnswerList] = useState<AnswerType[]>([]); // state to store answers
  const [isQuestionOwner, setIsQuestionOwner] = useState(false);

  // const [likeCount, setLikeCount] = useState(0);
  // const [dislikeCount, setDislikeCount] = useState(0);
  // const [hasLiked, setHasLiked] = useState(false);
  // const [hasDisliked, setHasDisliked] = useState(false);
  const [userLikes, setUserLikes] = useState<{ [answerId: string]: boolean }>({});
  const [userDislikes, setUserDislikes] = useState<{ [answerId: string]: boolean }>({});

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
        const isOwner = userQuestions.some(
          (question: QuestType) => question.id === id
        );

        setIsQuestionOwner(isOwner); // Set the state if the user is the owner of this question
      } catch (error) {
        console.error("Error fetching user's questions:", error);
      }
    };

    fetchUserQuestions();
  }, [id, jwt]);

  useEffect(() => {
    // Fetch initial answers for this question
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(
          `${process.env.SERVER_URL}/question/${id}/answers`
        );
        const answers: AnswerType[] = response.data || [];
        setAnswerList(answers);
        setAnswerCount(answers.length);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchAnswers();
  }, [id]); // Run this effect when the question ID changes

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
  
      // Add the new answer to the backend
      await axios.post(
        `${process.env.SERVER_URL}/question/${id}/answers`,
        { answerText: newAnswer }, // the new answer to send
        { headers }
      );
  
      // After adding the answer, fetch the updated list of answers from the server
      const response = await axios.get(
        `${process.env.SERVER_URL}/question/${id}/answers`
      );
  
      const answers: AnswerType[] = response.data || [];
      setAnswerList(answers); // Update the answer list to reflect the current state
      setAnswerCount(answers.length); // Update the answer count
      setNewAnswer(""); // Clear the input field after submission
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleLike = async (answerId: string) => {
    if (userLikes[answerId]) {
      // Undo the like if already liked
      await removeLike(answerId);
      return;
    }

    // Prevent liking if the user has disliked
    if (userDislikes[answerId]) {
      console.log("You can't like an answer you disliked.");
      return;
    }

    try {
      const headers = {
        authorization: jwt,
      };

      await axios.post(
        `${process.env.SERVER_URL}/answer/${answerId}/like`,
        {},
        { headers }
      );

      setAnswerList((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId
            ? { ...answer, gainedLikesNumber: answer.gainedLikesNumber + 1 }
            : answer
        )
      );

      setUserLikes((prevLikes) => ({ ...prevLikes, [answerId]: true }));
    } catch (error) {
      console.error("Error liking answer:", error);
    }
  };

  const handleDislike = async (answerId: string) => {
    if (userDislikes[answerId]) {
      // Undo the dislike if already disliked
      await removeDislike(answerId);
      return;
    }

    // Prevent disliking if the user has liked
    if (userLikes[answerId]) {
      console.log("You can't dislike an answer you liked.");
      return;
    }

    try {
      const headers = {
        authorization: jwt,
      };

      await axios.post(
        `${process.env.SERVER_URL}/answer/${answerId}/dislike`,
        {},
        { headers }
      );

      setAnswerList((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId
            ? { ...answer, gainedDislikesNumber: answer.gainedDislikesNumber + 1 }
            : answer
        )
      );

      setUserDislikes((prevDislikes) => ({ ...prevDislikes, [answerId]: true }));
    } catch (error) {
      console.error("Error disliking answer:", error);
    }
  };

  const removeLike = async (answerId: string) => {
    try {
      const headers = {
        authorization: jwt,
      };

      await axios.post(
        `${process.env.SERVER_URL}/answer/${answerId}/unlike`,
        {},
        { headers }
      );

      setAnswerList((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId
            ? { ...answer, gainedLikesNumber: answer.gainedLikesNumber - 1 }
            : answer
        )
      );

      setUserLikes((prevLikes) => ({ ...prevLikes, [answerId]: false }));
    } catch (error) {
      console.error("Error unliking answer:", error);
    }
  };

  const removeDislike = async (answerId: string) => {
    try {
      const headers = {
        authorization: jwt,
      };

      await axios.post(
        `${process.env.SERVER_URL}/answer/${answerId}/undislike`,
        {},
        { headers }
      );

      setAnswerList((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId
            ? { ...answer, gainedDislikesNumber: answer.gainedDislikesNumber - 1 }
            : answer
        )
      );

      setUserDislikes((prevDislikes) => ({ ...prevDislikes, [answerId]: false }));
    } catch (error) {
      console.error("Error undisliking answer:", error);
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
          {answerList.length > 0 ? ( // Check if there are answers to display
            answerList.map((answer) => (
              <div className={styles.answerDescr} key={`${answer.id}`}>
                <h4>{answer.answerText}</h4>
                <p>{new Date(answer.date).toLocaleDateString()}</p>
                <div className={styles.iconWrapper}>
                  <div className={styles.icon} style={{ cursor: "pointer" }}>
                    {answer.gainedLikesNumber}
                    <img
                      className={styles.like}
                      src={like.src}
                      alt="like"
                      onClick={() => handleLike(answer.id)}
                    />
                  </div>
                  <div className={styles.icon} style={{ cursor: "pointer" }}>
                    <img
                      className={styles.like}
                      src={dislike.src}
                      alt="dislike"
                      onClick={() => handleDislike(answer.id)}
                    />
                    {answer.gainedDislikesNumber}
                  </div>
                </div>
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
