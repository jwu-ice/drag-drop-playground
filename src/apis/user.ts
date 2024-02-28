import { BASE_URL, COOKIE_NAME_JWT_TOKEN } from "@/constants/auth";
import { sendGetRequest } from ".";
import Cookies from "universal-cookie";
// import { cookies } from "next/headers";

export type User = {
  id: string;
  name: string;
  email: string;
  is_guest: boolean;
  created_at: string;
  updated_at: string;
};

export async function getUserByJwt(jwtToken: string): Promise<User> {
  const url = `${BASE_URL}/users/me`;
  return sendGetRequest<User>(url, jwtToken);
}

export async function getUser() {
  const cookieStore = new Cookies();
  const jwtToken = cookieStore.get(COOKIE_NAME_JWT_TOKEN);

  if (jwtToken) {
    try {
      const user = await getUserByJwt(jwtToken.value);
      return user;
    } catch (e) {
      return null;
    }
  }
  return null;
}
