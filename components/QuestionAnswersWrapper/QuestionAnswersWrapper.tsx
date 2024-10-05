import styles from "./styles.module.css";
import { QuestType } from "@/types/questions";
import { AnswerType } from "@/types/answers";
import QuestionWithAnswers from "../QuestionWithAnswers/QuestionWithAnswers";

type QuestionAnswersWrapperProps = {
  question: QuestType | null; 
  answer: AnswerType[];
};

const QuestionAnswersWrapper = ({
  question,
  answer,
}: QuestionAnswersWrapperProps) => {
  console.log("Question state:", question);  // Log question state for debugging
  return (
    <div className={styles.main}>
      {question &&  (
        <QuestionWithAnswers
        id={question.id}
        key={question.id}
        questionId={question.id}
        questionText={question.questionText}
        answers={answer} 
        date={new Date(question.date)}
        userId={question.userId}
          />
        
        )}
      </div>
    );
  };

export default QuestionAnswersWrapper;
