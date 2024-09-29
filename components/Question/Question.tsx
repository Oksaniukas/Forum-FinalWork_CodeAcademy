import styles from "./styles.module.css";

type QuestionProps = {
  id: string;
  questionText: string;
  date: Date;
};

const Question = ({ questionText, date }: QuestionProps) => {
  const pleaseLogin = () => {
     alert("If you want to see more information, please login ir sign up")
  }
  return (
    <div className={styles.main} onClick={() => pleaseLogin()}>
      <h3>{questionText}</h3>
      <p>{date.toLocaleDateString()}</p>
    </div>
  );
};

export default Question;
