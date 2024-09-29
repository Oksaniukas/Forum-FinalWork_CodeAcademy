import axios from "axios";
import cookie from "js-cookie";

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

// export const validateUser = async () => {
//   const jwt = cookie.get("forum_app_jwt");

//   const headers = {
//     authorization: jwt,
//   };
//   const response = await axios.get(`${process.env.SERVER_URL}/login/validate`, {
//     headers,
//   });
//   return response;
// };
