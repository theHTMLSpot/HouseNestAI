"use client";
export interface ButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
}

export interface InputProps {
    type: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    readOnly?: boolean;
}

export interface CardProps {
    title: string;
    description: string;
    imageUrl?: string;
    onClick?: () => void;
    className?: string;
}

export interface TitleProps {
    text: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export interface DropdownProps {
    options: string[];
    onSelect: (option: string) => void;
    className?: string;
}
