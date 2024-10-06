import QuestionAnswersWrapper from "@/components/QuestionAnswersWrapper/QuestionAnswersWrapper";
import { QuestType } from "@/types/questions";
import { AnswerType } from "@/types/answers";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import cookie from "js-cookie";

const QuestionWithAnswersPage = () => {
  const [question, setQuestion] = useState<QuestType | null>(null)
  const [answer, setAnswer] = useState<AnswerType[]>([]);

  const router = useRouter();
  const jwt = cookie.get("forum_app_jwt");

  const fetchQuestion = async () => {
    try {
      const headers = {
        authorization: jwt,
      };
      const response = await axios.get(
        `${process.env.SERVER_URL}/question/${router.query.id}`,
        { headers }
      );
      const fetchedQuestion = response.data.question;  console.log("Fetched Question:", fetchedQuestion); 
      setQuestion(fetchedQuestion);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const fetchQuestionAnswers = async () => {
    try {
      const headers = {
        authorization: jwt,
      };

      const response = await axios.get(
        `${process.env.SERVER_URL}/question/${router.query.id}/answers`,
        { headers }
      );
      const fetchedAnswers = response.data;
      setAnswer(fetchedAnswers);
    } catch (error) {
      console.error("Error fetching question answers:", error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchQuestion();
      fetchQuestionAnswers();
    }
  }, [router.query.id]);

  return (
    <PageTemplate>
      <QuestionAnswersWrapper question={question} answer={answer} />
    </PageTemplate>
  );
};

export default QuestionWithAnswersPage;