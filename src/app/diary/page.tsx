import { Header } from "@/components/layout/header";
import { DiaryList } from "@/components/diary/diary-list";

export default function DiaryPage() {
  return (
    <>
      <Header title="Diário de Aplicação" />
      <DiaryList />
    </>
  );
}
