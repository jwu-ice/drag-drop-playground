import { getApiTodos } from "@/apis/todo";
import Skeleton from "@/components/_common/Skeleton";
import dynamic from "next/dynamic";
import { Suspense, lazy } from "react";

// const DnD = lazy(() => import("@/components/todo/DnD"));

const DnD = dynamic(() => import("@/components/todo/DnD"), {
  loading: () => <Skeleton variant={"cardList"} />,
});

const TodoPage = async () => {
  const staticData = await getApiTodos();

  return (
    <section className="flex flex-col">
      <div className="mb-4 space-y-2">
        <p className="">드래그해서 할 일을 자유롭게 옮겨보세요!</p>
      </div>
      {/* <Suspense fallback={<Skeleton variant="cardList" />}>
        <DnD staticData={staticData} />
      </Suspense> */}
      <DnD staticData={staticData} />
    </section>
  );
};

export default TodoPage;
