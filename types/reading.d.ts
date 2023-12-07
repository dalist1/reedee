import { Dispatch, SetStateAction } from "react";

export type ReadingProps = {
    fileName: string;
    selectedCard: Object;
    setIsReadingVisible: Dispatch<SetStateAction<boolean>>;
};