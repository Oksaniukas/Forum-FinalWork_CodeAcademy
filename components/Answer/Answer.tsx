import styles from "./styles.module.css";

type AnswerProps = {
  id: string;
  answerText: string;
  date: Date;
  questionId:string
};

const Answer = ({ answerText, date }: AnswerProps) => {
  
  return (
    <div className={styles.main} >
      
      <h3>{answerText}</h3>
      <p>{date.toLocaleDateString()}</p>
    </div>
  );
};

export default Answer;
