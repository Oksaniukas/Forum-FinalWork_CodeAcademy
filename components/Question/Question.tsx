import styles from "./styles.module.css";

type QuestionProps = {
  id: string;
  questionText: string;
  date: Date;
};

const Question = ({ questionText, date }: QuestionProps) => {
  return (
    <div className={styles.main}>
      <h3>{questionText}</h3>
      <p>{date.toLocaleDateString()}</p>
    </div>
  );
};

export default Question;
