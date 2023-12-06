export type Option = {
    name: string;
    icon: React.ReactNode;
    index?: number;
    checked: boolean;
    component?: string;
    options?: Option[];
    handler: () => void;
}
  
export type SwitchChangeHandler = (mainIndex: number, index: number) => void;
  
export type OptionsListProps = {
    options: Option[];
    handleSwitchChange: SwitchChangeHandler;
    mainIndex: number;
};