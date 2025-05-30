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

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type ModeMap = Record<string, boolean>;

type Toggle = (moduleId: string, editMode: boolean) => void;

export type EditTarget = { id: string; type: 'module' } | { id: string; type: 'lecture' } | null;

export type ModuleItemProps = {
    module: Module;
    index: number;
    isEditing: boolean;
    toggleEditMode: Toggle;
    onUpdateItem: <T extends Module | Lecture>(updatedItem: T, setItems: Setter<T[]>) => void;
    isDeleting: boolean;
    toggleDeleteMode: Toggle;
    onDeleteItem: <T extends Module | Lecture>(id: string, setItems: Setter<T[]>) => void;
    isDropDownOpen: boolean;
    toggleDropDownMode: Toggle;
    idGenerator: () => string;
    editModeMap: ModeMap;
    deleteModeMap: ModeMap;
    setModules: Setter<Module[]>;
    setEditingViewItem: Setter<EditTarget>;
};
