import axios from "axios";

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export const signup = async ({ name, email, password }: SignUpProps) => {
  const body = {
    name: name,
    email: email,
    password: password,
  };

  const response = await axios.post(`${process.env.SERVER_URL}/users`, body);
  return response;
};

