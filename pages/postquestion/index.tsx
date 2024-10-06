import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PostQuestionForm from "@/components/PostQuestionForm/PostQuestionForm";
import styles from "./styles.module.css";

const PostQuestionPage = () => {
  return (
    <div className={styles.main}>
      <Header isUserLoggedIn={true} />
      <h3>Here you can type your question and describe the problem:</h3>
      <PostQuestionForm />
      <Footer />
    </div>
  );
};

export default PostQuestionPage;
