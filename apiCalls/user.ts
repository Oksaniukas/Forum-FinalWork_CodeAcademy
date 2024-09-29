import axios from "axios";
import cookie from "js-cookie";

type LoginProps = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginProps) => {
  const body = {
    email: email,
    password: password,
  };

  const response = await axios.post(`${process.env.SERVER_URL}/login`, body);
  return response;
};

export const validateUser = async () => {
  const jwt = cookie.get("forum_app_jwt");

  const headers = {
    authorization: jwt,
  };
  const response = await axios.get(`${process.env.SERVER_URL}/login/validate`, {
    headers,
  });
  return response;
};
