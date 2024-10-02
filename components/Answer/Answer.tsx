import styles from "./styles.module.css";

type AnswerProps = {
  id: string;
  answerText: string;
  date: Date;
  questionId:string
};

const Answer = ({ answerText, date }: AnswerProps) => {
  const pleaseLogin = () => {
     alert("If you want to see more information, please login or sign up")
  }
  return (
    <div className={styles.main} onClick={() => pleaseLogin()}>
      <h3>{answerText}</h3>
      <p>{date.toLocaleDateString()}</p>
    </div>
  );
};

export default Answer;
