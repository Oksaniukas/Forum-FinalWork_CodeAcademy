import styles from "./styles.module.css";
import { QuestType } from "@/types/questions";
import Question from "../Question/Question";

type QuestionsWrapperProps = {
  questions: QuestType[];
};

const QuestionsWrapper = ({ questions }: QuestionsWrapperProps) => {
  return (
      <div className={styles.main}>
        {questions?.length > 0 ? ( // Conditional rendering to ensure questions is not undefined
          questions.map((question) => {
            return (
              <Question
                id={question.id}
                key={question.id}
                questionText={question.questionText}
                date={new Date(question.date)}
              />
            );
          })
        ) : (
          <p>No questions available</p> // Optional: Message if no questions are found
        )}
      </div>
    );
  };

export default QuestionsWrapper;