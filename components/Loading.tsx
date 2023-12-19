type LoadingProp = {
  name?: string;
  color?: string;
}

export default function Loading({ name, color }: LoadingProp) {
  return (
    <span>
      <div className="z-50 flex items-center justify-center space-x-1">
        {name ? `Cooking your ${name}&#160;&#160;&#160` : ""}
        <div className={`w-1 h-1 bg-sky-400 rounded-full animate-bounce`}></div>
        <div className={`w-1 h-1 bg-sky-400 rounded-full animate-bounce delay-75`}></div>
        <div className={`w-1 h-1 bg-sky-400 rounded-full animate-bounce delay-150`}></div>
      </div>
    </span>
  );
}
