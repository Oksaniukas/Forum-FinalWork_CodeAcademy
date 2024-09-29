import main from "../../assets/main.jpg";
import styles from "./styles.module.css";

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.imgWrapper}>
        <img src={main.src} alt="main" />
      </div>
      <div className={styles.descr}>
        <h3>Welcome to INPP FORUM</h3>
        <p>Welcome to the INPP FORUM, a community where people come together to discuss, share, and learn about decommissioning of the INPP. </p>
        <p>The mission of the enterprise is safe and timely implementation of a globally unprecedented project – decommissioning of the nuclear power plant, which operated two RBMK-type reactors, and handling radioactive waste to ensure that the future generations do not have to carry the unreasonable burden of radioactive waste management.</p>
        <h4>What You Can Do Here:</h4>
        <ul>
          <li>Ask Questions: Have a question or need advice? Post it in the relevant category and get answers from the community.</li>
          <li>Share Your Knowledge: Contribute by answering questions, sharing tips, or posting useful resources.</li>
          <li>Join the Discussion: Browse topics, participate in ongoing conversations, and connect with others who share your interests.</li>
        </ul>
        <h3> Please, Sign up/Login to start asking questions!</h3>
      </div>
    </div>
  );
};

export default Main;
