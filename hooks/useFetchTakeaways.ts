import { MockAPI } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
  
export function useFetchTakeaways() {
const { data } = useSuspenseQuery({
    queryKey: ['takeaways'],
    queryFn: () => MockAPI(),
});

return { data };
}