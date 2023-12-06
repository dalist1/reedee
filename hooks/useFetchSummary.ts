import { MockAPI } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
  
export function useFetchSummary() {
const { data } = useSuspenseQuery({
    queryKey: ['summary'],
    queryFn: () => MockAPI(),
});

return { data };
}