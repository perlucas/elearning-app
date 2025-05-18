export type Lecture = {
    id: string;
    title: string;
};

export type Module = {
    id: string;
    title: string;
    lectures: Lecture[];
};

export type ModeMap = Record<string, boolean>;

type Toggle = (moduleId: string, editMode: boolean) => void;

export type ModuleItemProps = {
    module: Module;
    index: number;
    isEditing: boolean;
    toggleEditMode: Toggle;
    onUpdateItem: <T extends Module | Lecture>(
        updatedItem: T,
        setItems: React.Dispatch<React.SetStateAction<T[]>>,
    ) => void;
    isDeleting: boolean;
    toggleDeleteMode: Toggle;
    onDeleteItem: <T extends Module | Lecture>(id: string, setItems: React.Dispatch<React.SetStateAction<T[]>>) => void;
    isDropDownOpen: boolean;
    toggleDropDownMode: Toggle;
    idGenerator: () => string;
    editModeMap: ModeMap;
    deleteModeMap: ModeMap;
    setModules: React.Dispatch<React.SetStateAction<Module[]>>;
};
