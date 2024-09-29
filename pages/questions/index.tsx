import { useState, useEffect } from "react";
import axios from "axios";
import { QuestType } from "@/types/questions";
import QuestionsWrapper from "@/components/QuestionsWrapper/QuestionsWrapper";
import PageTemplate from "@/components/PageTemplate/PageTemplate";

const Questions = () => {
  const [questions, setQuestions] = useState<QuestType[]>([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/questions`);
      console.log(response.data);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <PageTemplate>
      <QuestionsWrapper questions={questions} />
    </PageTemplate>
  );
};

export default Questions;
