type LinkType = Record<"href" | "name", string>;

type Todo = {
  id: string;
  title: string;
  content: string;
  is_finished: boolean;
  avatar_url: string;
  date: string;
};

// deprecated
type TodoType = {
  id: string;
  title: string;
  content: string;
};
