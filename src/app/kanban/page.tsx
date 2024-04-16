import Skeleton from "@/components/_common/Skeleton";
import dynamic from "next/dynamic";

const KanbanDndArea = dynamic(() => import("@/components/kanban/KanbanDndArea"), {
  loading: () => <Skeleton variant={"kanbanCard"} />,
  ssr: false,
});

const items = null;

const KanbanPage = () => {
  return (
    <section className="flex flex-col">
      <div className=" mb-4 space-y-2">
        <p>
          칸반은 일본어 발음으로 우리가 흔히 아는 <b>간판(看板)</b>의 일본식 발음이에요.
        </p>
        <p>
          도요타의 생산 방식에서 유래됐으며, 업무의 흐름을 유기적, 시각적으로 표현하는 프로젝트 관리
          방식이에요.
        </p>
      </div>
      <div className="mt-6">
        <KanbanDndArea />
      </div>
    </section>
  );
};

export default KanbanPage;
