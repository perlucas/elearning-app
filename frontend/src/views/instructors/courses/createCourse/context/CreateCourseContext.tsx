import React, { createContext, ReactNode, useState } from 'react';

export interface Module {
    id: string;
    title: string;
}

type Props = {
    children: ReactNode;
};

type updateModuleFn = (updatedModule: Module) => void;

type ContextType = {
    modules: Module[];
    setModules: React.Dispatch<React.SetStateAction<Module[]>>;
    addModule: () => Module;
    updateModule: updateModuleFn;
    deletingModuleId: string;
    setDeletingModuleId: React.Dispatch<React.SetStateAction<string>>;
    handleTrashButton: (id: string) => void;
    handleDeleteButton: (id: string) => void;
};

export const CreateCourseContext = createContext<ContextType | undefined>(undefined);

const CreateCourseContextBoundary = ({ children }: Props) => {
    const [modules, setModules] = useState<Module[]>([
        { id: '1', title: 'REST principles 01' },
        { id: '2', title: 'REST principles 02' },
        { id: '3', title: 'REST principles 03' },
    ]);

    //Provisional function
    const idGenerator = () => {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    };

    const addModule = () => {
        const id = idGenerator();
        const newModule: Module = {
            id,
            title: 'Untitled',
        };
        setModules((prev) => [...prev, newModule]);
        return newModule;
    };

    const updateModule: updateModuleFn = (updatedModule) => {
        if (updatedModule.title === '') {
            updatedModule.title = 'Untitled';
        }
        setModules((prev) => {
            const updatedModules = [...prev];
            const index = updatedModules.findIndex((m) => m.id === updatedModule.id);
            if (index !== -1) {
                updatedModules.splice(index, 1, updatedModule);
            }
            return updatedModules;
        });
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
        addModule,
        updateModule,
        deletingModuleId,
        setDeletingModuleId,
        handleTrashButton,
        handleDeleteButton,
    };

    return <CreateCourseContext.Provider value={data}>{children}</CreateCourseContext.Provider>;
};

export default CreateCourseContextBoundary;
