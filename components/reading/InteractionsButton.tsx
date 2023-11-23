import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Interactions = {
 Icon: () => React.ReactNode | React.ReactElement;
 tooltipText: string;
 onClick?: () => void;
}


export default function Button({ Icon, tooltipText, onClick }: Interactions) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="bottom-2 my-1 bg-slate-950 p-4 rounded-full hover:bg-opacity-90"
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
