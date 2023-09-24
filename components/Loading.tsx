export default function Loading() {
  return (
    <span>
      {" "}
      <div className="flex items-center justify-center space-x-1">
        <div className="w-1 h-1 bg-sky-400 rounded-full animate-bounce"></div>
        <div className="w-1 h-1 bg-sky-400 rounded-full animate-bounce delay-75"></div>
        <div className="w-1 h-1 bg-sky-400 rounded-full animate-bounce delay-150"></div>
      </div>
    </span>
  );
}
