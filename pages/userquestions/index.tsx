import { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { QuestType } from "@/types/questions";
import QuestionsWrapper from "@/components/QuestionsWrapper/QuestionsWrapper"
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useRouter } from "next/router";

const UserQuestionsPage = () => {
  const [questions, setQuestions] = useState<QuestType[]>([]);
  const router = useRouter();

  const jwt = cookie.get("forum_app_jwt");

  // Function to fetch user questions
  const fetchUserQuestions = async () => {
    try {
      const headers = {
        authorization: jwt,
      };

      const response = await axios.get(
        `${process.env.SERVER_URL}/questions/user`,
        { headers }
      );
      console.log("Fetched questions:", response.data.questions); // Log fetched questions
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching user questions:", error);
    }
  };

  useEffect(() => {
    if (!jwt) {
      router.push("/login");
    }

    fetchUserQuestions();
  }, []);

  return (
    <PageTemplate>
      <QuestionsWrapper questions={questions} />
    </PageTemplate>
  );
};

export default UserQuestionsPage;
