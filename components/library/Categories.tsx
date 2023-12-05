import { Tabs } from "@/components/ui/tabs"

export default function Categories({ category, setCategory }) {

  return (
    <div className="px-4 py-8">
      <Tabs setCategory={setCategory} />
    </div >
  );
}