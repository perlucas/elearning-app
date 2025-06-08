import React from 'react';

export type Lecture = {
    id: string;
    title: string;
};

export type Module = {
    id: string;
    title: string;
    lectures: Lecture[];
};

type Toggle = React.Dispatch<React.SetStateAction<boolean>>;

export type ModuleItemProps = {
    module: Module;
    index: number;
    onUpdateItem: <T extends Module | Lecture>(
        updatedItem: T,
        setItems: React.Dispatch<React.SetStateAction<T[]>>,
    ) => void;
    onDeleteItem: <T extends Module | Lecture>(id: string, setItems: React.Dispatch<React.SetStateAction<T[]>>) => void;
    idGenerator: () => string;
    setModules: React.Dispatch<React.SetStateAction<Module[]>>;
    isNewModule?: boolean;
};

export type ItemTitleProps<T extends Module | Lecture> = {
    item: T;
    index: number;
    isEditing: boolean;
    toggleEditMode: Toggle;
    onUpdateItem: (item: T) => void;
};

export type ItemActionButtonsProps<T extends Module | Lecture> = {
    item: T;
    children?: React.ReactNode;
    isDeleting: boolean;
    toggleDeleteMode: Toggle;
    onDeleteItem: (itemId: string) => void;
};
