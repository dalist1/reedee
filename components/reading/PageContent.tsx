export default function PageConent({ pageText }) {
  return (
    <div className="flex sm:flex-col items-start sm:max-lg:items-center max-w-6xl sm:max-lg:grid-cols-6 mx-auto h-full p-6">
      <div className="col-span-6 md:col-span-3 bg-gray-800 space-y-8 p-6 rounded-3xl">
        <span>{pageText.text}</span>
      </div>
    </div>
  );
}

