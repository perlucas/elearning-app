import React, { createContext, ReactNode, useState } from 'react';

export interface Item {
    id: string;
    title: string;
}

type Props = {
    children: ReactNode;
};

type ChangeItemNameFn = (item: Item, inputValue: string) => void;

type ContextType = {
    modules: Item[];
    setModules: React.Dispatch<React.SetStateAction<Item[]>>;
    handleAddModule: () => void;
    editingModuleId: string;
    setEditingModuleId: React.Dispatch<React.SetStateAction<string>>;
    deletingModuleId: string;
    setDeletingModuleId: React.Dispatch<React.SetStateAction<string>>;
    changeItemName: ChangeItemNameFn;
    handleTrashButton: (id: string) => void;
    handleDeleteButton: (id: string) => void;
};

export const CreateCourseContext = createContext<ContextType | undefined>(undefined);

const CreateCourseContextBoundary = ({ children }: Props) => {
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
    };

    return <CreateCourseContext.Provider value={data}>{children}</CreateCourseContext.Provider>;
};

export default CreateCourseContextBoundary;
