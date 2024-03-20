import { sendGetRequest } from "@/apis";

export const getApiTodos = () => {
  return sendGetRequest<Todo[]>(
    `https://api.jsonsilo.com/public/a77296bb-26fc-4edf-86f9-93fa22ce7f9a`,
  );
};
