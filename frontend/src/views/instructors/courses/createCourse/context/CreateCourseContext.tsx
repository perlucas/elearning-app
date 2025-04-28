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
    tempModules: Item[];
    setTempModules: React.Dispatch<React.SetStateAction<Item[]>>;
    changeItemName: ChangeItemNameFn;
};

export const CreateCourseContext = createContext<ContextType | undefined>(undefined);

const CreateCourseContextBoundary = ({ children }: Props) => {
    const [modules, setModules] = useState<Item[]>([
        { id: '1', title: 'REST principles 01' },
        { id: '2', title: 'REST principles 02' },
        { id: '3', title: 'REST principles 03' },
    ]);

    const [tempModules, setTempModules] = useState<Item[]>([]);

    //Provisional function
    const idGenerator = () => {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    };

    const handleAddModule = () => {
        const id = idGenerator();
        setModules([...modules, { id, title: 'Untitled' }]);
        setEditingModuleId(id);
    };

    //Change Item name

    const [editingModuleId, setEditingModuleId] = useState('');

    const changeItemName: ChangeItemNameFn = (item, inputValue) => {
        if (inputValue === '') {
            inputValue = 'Untitled';
        }
        const updatedItem = { ...item, title: inputValue };
        setTempModules((prev) =>
            prev.some((i) => i.id === item.id)
                ? prev.map((i) => (i.id === item.id ? updatedItem : i))
                : [...prev, updatedItem],
        );

        setEditingModuleId('');
    };

    const data: ContextType = {
        modules,
        setModules,
        handleAddModule,
        editingModuleId,
        setEditingModuleId,
        tempModules,
        setTempModules,
        changeItemName,
    };

    return <CreateCourseContext.Provider value={data}>{children}</CreateCourseContext.Provider>;
};

export default CreateCourseContextBoundary;
