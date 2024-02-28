import { nanoid } from "nanoid";

export const MOCKS = [...Array(10)].map((_, i) => {
  return {
    id: nanoid(),
    name: `Something task ${i}`,
  };
});
