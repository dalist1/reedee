import { motion } from "framer-motion";
import { updateLikeStatus, getCardObjects } from "@/lib/dbOperations";
import { useToast } from "./ui/use-toast";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";


type AnimatedLikeProps = {
  size: number;
  color: string;
  fileName?: string;
};

export default function AnimatedLike({ size, color, fileName }: AnimatedLikeProps) {

  const { toast } = useToast();

  const {data: isLiked} = useQuery({
    queryKey: ["likeStatus"],
    queryFn: async () => {
      const cardObjects = await getCardObjects();
      const cardObject = cardObjects.find((cardObject) => cardObject.name === fileName);
      return cardObject ? cardObject.liked : false;
    },
  });

  const { mutate: fetchLikes } = useMutation({
    mutationFn: async () => {
      const newIsLiked = !isLiked;
      await updateLikeStatus(fileName, newIsLiked);
      return newIsLiked;
    },
    onSuccess: () => {
      toast({ description: "Success!" });
    },
    onError: () => {
      toast({ description: "Failed." });
    },
  });
  

  return (
    <motion.div
      whileTap={{ scale: 3 }}
      transition={{ duration: 0.8 }}
      onClick={() => fetchLikes()}
    >
      <svg xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24">
        {!isLiked && (
          <path
            fill="none"
            clipRule="evenodd"
            strokeWidth="2.5"
            stroke={color}
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        )}
        {isLiked && (
          <path
            fill="#a855f7"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          />
        )}
      </svg>
    </motion.div>
  );
}