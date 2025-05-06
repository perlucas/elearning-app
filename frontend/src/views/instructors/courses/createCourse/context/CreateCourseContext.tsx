import React, { createContext, ReactNode, useState } from 'react';

export interface Item {
    id: string;
    title: string;
}

type Props = {
    children: ReactNode;
};

type ChangeItemNameFn = (item: Item, inputValue: string) => void;

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

type VoidFn = () => void;
type VoidStringFn = (t: string) => void;

type ContextType = {
    courseTitle: string;
    setCourseTitle: Setter<string>;

    modules: Item[];
    setModules: Setter<Item[]>;
    handleAddModule: VoidFn;
    editingModuleId: string;
    setEditingModuleId: Setter<string>;
    deletingModuleId: string;
    setDeletingModuleId: Setter<string>;
    changeItemName: ChangeItemNameFn;
    handleTrashButton: VoidStringFn;
    handleDeleteButton: VoidStringFn;
    handleOnBlurTitle: VoidStringFn;
};

export const CreateCourseContext = createContext<ContextType | undefined>(undefined);

const CreateCourseContextBoundary = ({ children }: Props) => {
    const [courseTitle, setCourseTitle] = useState('');

    const handleOnBlurTitle = (value: string) => {
        setCourseTitle(value !== '' ? value : 'Untitled');
    };

    const [modules, setModules] = useState<Item[]>([
        { id: '1', title: 'REST principles 01' },
        { id: '2', title: 'REST principles 02' },
        { id: '3', title: 'REST principles 03' },
    ]);

    //Provisional function
    const idGenerator = () => {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    };

    const handleAddModule = () => {
        const id = idGenerator();
        setModules((prev) => [...prev, { id, title: 'Untitled' }]);
        setEditingModuleId(id);
    };

    //Change Item name

    const [editingModuleId, setEditingModuleId] = useState('');

    const changeItemName: ChangeItemNameFn = (item, inputValue) => {
        if (inputValue === '') {
            inputValue = 'Untitled';
        }
        const updatedItem = { ...item, title: inputValue };
        setModules((prev) =>
            prev.some((i) => i.id === item.id)
                ? prev.map((i) => (i.id === item.id ? updatedItem : i))
                : [...prev, updatedItem],
        );
        setEditingModuleId('');
    };

    //Delete module

    const [deletingModuleId, setDeletingModuleId] = useState('');

    const handleTrashButton = (id: string) => {
        setDeletingModuleId(id);
    };

    const handleDeleteButton = (id: string) => {
        setModules((prev) => prev.filter((m) => m.id !== id));
        setDeletingModuleId('');
    };

    const data: ContextType = {
        modules,
        setModules,
        handleAddModule,
        editingModuleId,
        setEditingModuleId,
        changeItemName,
        deletingModuleId,
        setDeletingModuleId,
        handleTrashButton,
        handleDeleteButton,
        courseTitle,
        setCourseTitle,
        handleOnBlurTitle,
    };

    return <CreateCourseContext.Provider value={data}>{children}</CreateCourseContext.Provider>;
};

export default CreateCourseContextBoundary;
