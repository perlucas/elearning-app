import React, { createContext, ReactNode, useState } from 'react';

export interface Module {
    id: string;
    title: string;
}

type Props = {
    children: ReactNode;
};

type ContextType = {
    modules: Module[];
    setModules: React.Dispatch<React.SetStateAction<Module[]>>;
    handleAddModule: () => void;
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

    const handleAddModule = () => {
        const id = idGenerator();
        setModules([...modules, { id, title: 'Untitled' }]);
    };

    const data: ContextType = {
        modules,
        setModules,
        handleAddModule,
    };

    return <CreateCourseContext.Provider value={data}>{children}</CreateCourseContext.Provider>;
};

export default CreateCourseContextBoundary;
