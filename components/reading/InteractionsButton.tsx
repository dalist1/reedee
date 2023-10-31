import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Button({ Icon, tooltipText, onClick }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="bottom-4 my-4 bg-slate-950 p-4 rounded-full hover:bg-opacity-90"
            onClick={onClick}>
            <span className="text-white cursor-pointer bg-slate-950 hover:bg-slate-900 rounded-full">
              <Icon />
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}