type LinkType = Record<"href" | "name", string>;

type Id = string | number;

type Column = {
  id: Id;
  title: string;
};

type Task = {
  id: Id;
  columnId: Id;
  content: string;
};
