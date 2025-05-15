import React, { createContext, ReactNode, useState } from 'react';
import { Module } from '../../types';

type Props = {
    children: ReactNode;
};

type updateModuleFn = (updatedModule: Module) => void;

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

type VoidStringFn = (t: string) => void;

type ContextType = {
    courseTitle: string;
    setCourseTitle: Setter<string>;

    modules: Module[];
    setModules: Setter<Module[]>;
    addModule: () => Module;
    updateModule: updateModuleFn;
    handleDeleteButton: (id: string) => void;
    handleOnBlurTitle: VoidStringFn;
};

export const CreateCourseContext = createContext<ContextType | undefined>(undefined);

const CreateCourseContextBoundary = ({ children }: Props) => {
    const [courseTitle, setCourseTitle] = useState('');

    const handleOnBlurTitle = (value: string) => {
        setCourseTitle(value !== '' ? value : 'Untitled');
    };

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

    const handleDeleteButton = (id: string) => {
        setModules((prev) => prev.filter((m) => m.id !== id));
    };

    const data: ContextType = {
        modules,
        setModules,
        addModule,
        updateModule,
        handleDeleteButton,
        courseTitle,
        setCourseTitle,
        handleOnBlurTitle,
    };

    return <CreateCourseContext.Provider value={data}>{children}</CreateCourseContext.Provider>;
};

export default CreateCourseContextBoundary;
