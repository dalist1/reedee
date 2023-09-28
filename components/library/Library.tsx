import CallToAction from "@/components/library/UploadButton";
import Card from "@/components/library/Card"

export default function Library() {
  return (
    <div className="my-8 flex flex-col items-center sm:max-lg:items-center gap-y-8 max-w-6xl sm:max-lg:grid-cols-6 mx-auto h-full p-6">
      <CallToAction />
      <Card />
    </div>
  );
}