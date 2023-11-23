import { getCardObjects } from "@/lib/dbOperations";
import { useQuery } from "@tanstack/react-query";

export function useFetchCards(category) {
    const { data } = useQuery({
        queryKey: ["userFiles", category],
        queryFn: async ({ queryKey }) => {
            const data = await getCardObjects();
            const category = queryKey[1];
            if (category === "Liked") {
                return data.filter((cardObject) => cardObject.liked);
            }
            return data;
        },
        suspense: true,
        notifyOnChangeProps: ['data']
    });

    return data;
}