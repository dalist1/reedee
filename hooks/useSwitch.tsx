import React, { useReducer } from 'react';
import { useBionicStore } from '@/stores/useBionicStore';
import { useSummaryStore } from '@/stores/useSummaryStore';
import { useTakeawaysStore } from '@/stores/useTakeawaysStore';

type Option = {
    name: string;
    icon: React.ReactNode;
    index?: number;
    checked: boolean;
    options?: Option[];
    handler: () => void;
}

type State = {
    options: Option[];
}

type Action = {
    type: 'TOGGLE_CHECKED';
    index: number;
    subIndex?: number;
}

const toggleChecked = (options: Option[], index: number, subIndex?: number): Option[] => {
    return options.map((option, i) => {
        if (i === index) {
            if (subIndex !== undefined && option.options) {
                return {
                    ...option,
                    options: toggleChecked(option.options, subIndex),
                };
            } else {
                return { ...option, checked: !option.checked };
            }
        }
        return option;
    });
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'TOGGLE_CHECKED':
            const newOptions = toggleChecked(state.options, action.index, action.subIndex);
            return { options: newOptions };
        default:
            return state;
    }
};

export default function useSwitch(initialOptions: Option[]) {
    const { isBionicEnabled, toggleBionic } = useBionicStore();
    const { isSummaryEnabled, toggleSummary } = useSummaryStore();
    const { isTakeawaysEnabled, toggleTakeaways } = useTakeawaysStore();

    const initializeOption = (option) => {
        let checked = false;
        let handler = () => { };

        switch (option.name) {
            case 'Bionic Text':
                checked = isBionicEnabled;
                handler = toggleBionic;
                break;
            case 'Summary':
                checked = isSummaryEnabled;
                handler = toggleSummary;
                break;
            case 'Takeaways':
                checked = isTakeawaysEnabled;
                handler = toggleTakeaways;
                break;
            default:
                break;
        }

        return { ...option, checked, handler };
    };

    const initializeOptions = (options) => {
        return options.map(option => {
            if (option.options) {
                return { ...option, options: initializeOptions(option.options) };
            } else {
                return initializeOption(option);
            }
        });
    };

    const [state, dispatch] = useReducer(reducer, { options: initializeOptions(initialOptions) });

    const handleSwitchChange = (index: number, subIndex?: number) => {
        dispatch({ type: 'TOGGLE_CHECKED', index, subIndex });
    };

    return { options: state.options, handleSwitchChange };
}
