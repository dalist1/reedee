import { getCardObjects } from "@/lib/dbOperations";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useFetchCards(category: string) {
    const { data } = useSuspenseQuery({
        queryKey: ["userFiles", category],
        queryFn: async ({ queryKey }) => {
            const data = await getCardObjects();
            const category = queryKey[1];
            if (category === "Liked") {
                return data.filter((cardObject) => cardObject.liked);
            }
            return data;
        },
        notifyOnChangeProps: ['data']
    });

    return data;
}