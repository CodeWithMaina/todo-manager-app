export interface TODO {
    isChecked: boolean;
    todo: string;
}

export interface TodoComponentProps {
    todo: TODO;
    onToggle: () => void;
}