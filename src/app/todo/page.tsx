import { getApiTodos } from "@/apis/todo";
import Skeleton from "@/components/_common/Skeleton";
import dynamic from "next/dynamic";

const TodoArea = dynamic(() => import("@/components/todo/TodoArea"), {
  loading: () => <Skeleton variant={"cardList"} />,
  ssr: false,
});

const TodoPage = async () => {
  const staticData = await getApiTodos();

  return (
    <section className="flex flex-col">
      <div className="space-y-2">
        <p className="">드래그해서 할 일을 자유롭게 옮겨보세요!</p>
      </div>
      <div className="mt-8">
        <TodoArea staticData={staticData} />
      </div>
    </section>
  );
};

export default TodoPage;
