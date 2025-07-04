import React from 'react';

export type VideoFileData = {
    id: string;
    filename: string;
    url: string;
    previewUrl?: string;
    duration?: number;
};

export type TextData = {
    content: string;
};

export enum LectureType {
    TEXT = 'text',
    VIDEO = 'video',
}

export type Lecture = {
    id: string;
    title: string;
    type?: LectureType;
    content?: { video?: VideoFileData; text?: TextData };
};

export type Module = {
    id: string;
    title: string;
    lectures: Lecture[];
};

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
type Toggle = Setter<boolean>;

export type EditTarget = { id: string; type: 'module' | 'lecture' } | null;

export type ModuleItemProps = {
    module: Module;
    index: number;
    onUpdateItem: <T extends Module | Lecture>(updatedItem: T, setItems: Setter<T[]>) => void;
    onDeleteItem: <T extends Module | Lecture>(id: string, setItems: Setter<T[]>) => void;
    idGenerator: () => string;
    setModules: Setter<Module[]>;
    isNewModule?: boolean;
    setEditingViewItem: Setter<EditTarget>;
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
    onEditAction: (itemId: string) => void;
};

export type VideoLectureContentProps = {
    currentVideoFile: VideoFileData | undefined | null;
    isUploading: boolean;
    progress: number;
    openFilePicker: () => void;
    uploadError: Error | null;
};
