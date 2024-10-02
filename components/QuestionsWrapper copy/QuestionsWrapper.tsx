import styles from "./styles.module.css";
import { QuestType } from "@/types/questions";
import { AnswerType } from "@/types/answers";
import Question from "../Question/Question";
import Answer from "../Answer/Answer";

type QuestionsWrapperProps = {
  questions: QuestType[];
  answers: AnswerType[];
};

const QuestionsWrapper = ({ questions, answers }: QuestionsWrapperProps) => {
  return (
      <div className={styles.main}>
        {questions?.length > 0 ? ( // Conditional rendering to ensure questions is not undefined
          questions.map((question) => {
            console.log("quest id", question.id)
            const relatedAnswers = answers.filter(
              (answer) =>{
                console.log("Answer Question ID:", answer.questionId);
                return answer.questionId.toString() === question.id.toString()
              } 
            );
            return (
              <div key={question.id}>
                {/* Render Question */}
                <Question
                  id={question.id}
                  questionText={question.questionText}
                  date={new Date(question.date)}
                />
  
                {/* Render Answers associated with the current question */}
                {relatedAnswers.length > 0 ? (
                  relatedAnswers.map((answer) => (
                    <Answer
                      key={answer.id}
                      id={answer.id}
                      answerText={answer.answerText}
                      date={new Date(answer.date)}
                      questionId={question.id}
                    />
                  ))
                ) : (
                  <p>No answers for this question.</p>
                )}
              </div>
            );
          })
        ) : (
          <p>No questions available</p>
        )}
      </div>
    );
  };

export default QuestionsWrapper;
