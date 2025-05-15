export type Module = {
    id: string;
    title: string;
};

type Toggle = (moduleId: string, editMode: boolean) => void;

export type ModuleItemProps = {
    module: Module;
    index: number;
    editMode: boolean;
    onToggleEditMode: Toggle;
    onUpdateModule: (updateModule: Module) => void;
    deleteMode: boolean;
    onToggleDeleteMode: Toggle;
    onDelete: (id: string) => void;
    dropDownMode: boolean;
    onToggleDropDownMode: Toggle;
};

export type ModeMap = Record<string, boolean>;
